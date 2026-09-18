import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/lib/models/User";
import { isUuid, privateJson } from "@/lib/validation";

// JWT_SECRET is mandatory. There is no fallback/default secret — a missing
// secret must fail fast (same philosophy as lib/supabase.ts) rather than
// silently signing tokens with a publicly-known key.
const jwtSecretValue = process.env.JWT_SECRET;

if (!jwtSecretValue) {
  throw new Error("JWT_SECRET environment variable is required");
}

const JWT_SECRET = new TextEncoder().encode(jwtSecretValue);

const TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN ?? "8h";

const expiryMatch = /^(\d+)([smhd])$/.exec(TOKEN_EXPIRY);
const expirySeconds = expiryMatch
  ? Number(expiryMatch[1]) *
    ({ s: 1, m: 60, h: 3600, d: 86400 } as const)[expiryMatch[2] as "s" | "m" | "h" | "d"]
  : 0;

if (
  !expiryMatch ||
  !Number.isSafeInteger(expirySeconds) ||
  expirySeconds <= 0 ||
  expirySeconds > 7 * 86400
) {
  throw new Error("JWT_EXPIRES_IN must be a positive duration such as 8h or 30m");
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export type UserRole = "admin" | "superadmin";

export async function createToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(TOKEN_EXPIRY)
    .setIssuedAt()
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    if (
      typeof payload.userId !== "string" ||
      !isUuid(payload.userId) ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function getSessionFromRequest(
  request: NextRequest,
): Promise<JWTPayload | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !/^Bearer \S+$/.test(authHeader)) return null;

  const token = authHeader.slice(7);
  const tokenPayload = await verifyToken(token);
  if (!tokenPayload) return null;

  try {
    const user = await getUserById(tokenPayload.userId);
    if (!user || !user.is_active) return null;

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
  } catch {
    return null;
  }
}

// ─── Authorization Helpers ────────────────────
// Centralized server-side authorization. The role used here always comes from
// the verified JWT/session — never from a client-supplied body field.

export type AuthResult =
  | { ok: true; session: JWTPayload }
  | { ok: false; response: NextResponse };

function isRole(value: unknown): value is UserRole {
  return value === "admin" || value === "superadmin";
}

/**
 * Require any authenticated user. Returns 401 when unauthenticated.
 */
export async function requireAuthenticatedUser(
  request: NextRequest,
): Promise<AuthResult> {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return {
      ok: false,
      response: privateJson({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { ok: true, session };
}

/**
 * Require an authenticated admin (admin or superadmin).
 * 401 when unauthenticated, 403 when authenticated without sufficient role.
 */
export async function requireAdmin(
  request: NextRequest,
): Promise<AuthResult> {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return {
      ok: false,
      response: privateJson({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (!isRole(session.role)) {
    return {
      ok: false,
      response: privateJson({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { ok: true, session };
}

/**
 * Require an authenticated superadmin.
 * 401 when unauthenticated, 403 when authenticated without sufficient role.
 */
export async function requireSuperadmin(
  request: NextRequest,
): Promise<AuthResult> {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return {
      ok: false,
      response: privateJson({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (session.role !== "superadmin") {
    return {
      ok: false,
      response: privateJson({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { ok: true, session };
}
