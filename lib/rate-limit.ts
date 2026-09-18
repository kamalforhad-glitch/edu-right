import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

/**
 * Configuration options for checkRateLimit.
 */
export interface RateLimitOptions {
  /**
   * Logical namespace or route category (e.g., 'login:ip', 'login:email', 'upload').
   */
  namespace?: string;
  /**
   * Distinct client or resource identity (e.g. user ID, email, or client IP).
   * If omitted, defaults to the client IP extracted from trusted headers.
   * This value is always hashed with SHA-256 before storage or lookup.
   */
  identifier?: string;
  /**
   * Maximum allowed requests in the time window.
   */
  max: number;
  /**
   * Time window in seconds.
   */
  windowSeconds: number;
}

/**
 * Result returned by checkRateLimit.
 */
export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
  retryAfterSeconds: number;
  response?: NextResponse;
}

/**
 * Generic Rate Limit Store interface for pluggable storage backends.
 */
export interface RateLimitStore {
  consume(
    key: string,
    max: number,
    windowMs: number,
  ): Promise<{ allowed: boolean; remaining: number; resetMs: number }>;
  reset(): Promise<void>;
}

/**
 * In-memory Bounded Sliding-Window Rate Limit Store.
 *
 * SERVERLESS COMPATIBILITY & CONSTRAINTS:
 * - Employs a bounded LRU cache with active TTL pruning to prevent unbounded
 *   memory growth and memory-exhaustion DoS in warm serverless containers.
 * - In serverless environments (Vercel) without external Redis, rate limiting
 *   operates on a per-warm-instance best-effort basis. It effectively mitigates
 *   rapid burst attacks and local brute-force attempts without pretending to
 *   provide globally synchronized distributed locks.
 * - When globally coordinated distributed rate limiting is needed, the store
 *   automatically upgrades to Upstash Redis REST if environment variables
 *   are provisioned.
 */
class BoundedSlidingWindowStore implements RateLimitStore {
  private readonly maxCapacity: number;
  private cache: Map<string, number[]>;

  constructor(maxCapacity = 10000) {
    this.maxCapacity = maxCapacity;
    this.cache = new Map();
  }

  async consume(
    key: string,
    max: number,
    windowMs: number,
  ): Promise<{ allowed: boolean; remaining: number; resetMs: number }> {
    const now = Date.now();
    const windowStart = now - windowMs;

    let timestamps = this.cache.get(key);

    if (timestamps) {
      // Re-insert to refresh LRU order
      this.cache.delete(key);
      // Prune expired timestamps
      timestamps = timestamps.filter((t) => t > windowStart);
    } else {
      // Evict oldest item if capacity is reached
      if (this.cache.size >= this.maxCapacity) {
        const oldestKey = this.cache.keys().next().value;
        if (oldestKey !== undefined) {
          this.cache.delete(oldestKey);
        }
      }
      timestamps = [];
    }

    if (timestamps.length >= max) {
      // Limit reached: calculate reset time from earliest timestamp
      const oldestInWindow = timestamps[0] ?? now;
      const resetMs = Math.max(0, oldestInWindow + windowMs - now);
      this.cache.set(key, timestamps);
      return {
        allowed: false,
        remaining: 0,
        resetMs,
      };
    }

    // Allowed: record current timestamp
    timestamps.push(now);
    this.cache.set(key, timestamps);

    return {
      allowed: true,
      remaining: Math.max(0, max - timestamps.length),
      resetMs: windowMs,
    };
  }

  async reset(): Promise<void> {
    this.cache.clear();
  }
}

/**
 * Upstash Redis REST Store (Optional Distributed Backend).
 *
 * Seamlessly leverages Upstash HTTP REST API if UPSTASH_REDIS_REST_URL and
 * UPSTASH_REDIS_REST_TOKEN are set in environment variables.
 * Uses atomic pipeline calls without requiring heavy external TCP packages.
 */
class UpstashRestStore implements RateLimitStore {
  private readonly url: string;
  private readonly token: string;

  constructor(url: string, token: string) {
    this.url = url.replace(/\/$/, "");
    this.token = token;
  }

  async consume(
    key: string,
    max: number,
    windowMs: number,
  ): Promise<{ allowed: boolean; remaining: number; resetMs: number }> {
    const now = Date.now();
    const windowSeconds = Math.ceil(windowMs / 1000);
    const redisKey = `rl:${key}`;

    // Pipeline: ZREMRANGEBYSCORE, ZADD, ZCARD, EXPIRE
    const pipeline = [
      ["ZREMRANGEBYSCORE", redisKey, "0", (now - windowMs).toString()],
      ["ZADD", redisKey, now.toString(), `${now}-${Math.random()}`],
      ["ZCARD", redisKey],
      ["EXPIRE", redisKey, windowSeconds.toString()],
    ];

    const res = await fetch(`${this.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pipeline),
    });

    if (!res.ok) {
      throw new Error(`Upstash rate-limit failed with status ${res.status}`);
    }

    const results = (await res.json()) as Array<{ result: unknown }>;
    const count = Number(results[2]?.result ?? 1);

    if (count > max) {
      return {
        allowed: false,
        remaining: 0,
        resetMs: windowMs,
      };
    }

    return {
      allowed: true,
      remaining: Math.max(0, max - count),
      resetMs: windowMs,
    };
  }

  async reset(): Promise<void> {
    // No-op for global Upstash in production
  }
}

// ─── Store Initialization ──────────────────────────────────────────
const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const activeStore: RateLimitStore =
  upstashUrl && upstashToken
    ? new UpstashRestStore(upstashUrl, upstashToken)
    : new BoundedSlidingWindowStore(10000);

// ─── Helpers ───────────────────────────────────────────────────────

/**
 * Safely extract client IP from trusted deployment headers.
 * Never trusts arbitrary client headers (e.g. X-User-ID, X-Client-ID).
 * In Vercel, x-vercel-forwarded-for is populated by the edge proxy.
 */
export function getClientIp(request: NextRequest): string {
  const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
  if (vercelForwardedFor) {
    const ip = vercelForwardedFor.split(",")[0].trim();
    if (ip) return sanitizeIp(ip);
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0].trim();
    if (ip) return sanitizeIp(ip);
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    const ip = realIp.trim();
    if (ip) return sanitizeIp(ip);
  }

  return "127.0.0.1";
}

function sanitizeIp(ip: string): string {
  // Strip any non-standard IP characters
  return ip.replace(/[^a-fA-F0-9.:]/g, "").slice(0, 45);
}

/**
 * SHA-256 hash client/resource identifiers.
 * Prevents storing raw IPs, user IDs, or emails in memory or cache keys.
 */
export function hashIdentifier(input: string): string {
  return createHash("sha256").update(input.trim()).digest("hex").slice(0, 32);
}

/**
 * Standard HTTP 429 response helper.
 * Returns consistent JSON response, Retry-After header, and Cache-Control: no-store.
 * Does not expose internal counts, IP addresses, or server memory.
 */
export function rateLimitResponse(retryAfterSeconds: number): NextResponse {
  const safeSeconds = Math.max(1, Math.ceil(retryAfterSeconds));
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        "Retry-After": safeSeconds.toString(),
        "Cache-Control": "private, no-store",
      },
    },
  );
}

/**
 * Centralized Rate Limit Checker.
 *
 * Checks if a request is allowed based on the specified limit and time window.
 * Fail-safe: if any internal error occurs, fails open (allowed: true) to prevent
 * accidental outages of critical business flows.
 */
export async function checkRateLimit(
  request: NextRequest,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  const { max, windowSeconds, namespace = "api" } = options;
  const rawId = options.identifier ?? getClientIp(request);
  const hashedId = hashIdentifier(rawId);
  const key = `${namespace}:${hashedId}`;
  const windowMs = Math.max(1, windowSeconds) * 1000;

  try {
    const result = await activeStore.consume(key, max, windowMs);
    const retryAfterSeconds = result.allowed
      ? 0
      : Math.max(1, Math.ceil(result.resetMs / 1000));

    if (!result.allowed) {
      return {
        allowed: false,
        limit: max,
        remaining: 0,
        resetMs: result.resetMs,
        retryAfterSeconds,
        response: rateLimitResponse(retryAfterSeconds),
      };
    }

    return {
      allowed: true,
      limit: max,
      remaining: result.remaining,
      resetMs: result.resetMs,
      retryAfterSeconds: 0,
    };
  } catch (error) {
    // Fail-safe behavior: log warning and fail open
    console.error("Rate limit check failed (failing open):", error);
    return {
      allowed: true,
      limit: max,
      remaining: 1,
      resetMs: 0,
      retryAfterSeconds: 0,
    };
  }
}

/**
 * Testing utility to reset in-memory state.
 */
export async function resetRateLimitsForTesting(): Promise<void> {
  await activeStore.reset();
}

