import { NextRequest, NextResponse } from "next/server";
import {
  findActiveUserByEmailWithPassword,
  comparePassword,
} from "@/lib/models/User";
import { createToken } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  isValidationError,
  normalizeEmail,
  parseJsonObject,
  privateJson,
  validatePassword,
  validationResponse,
} from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 attempts per 15 minutes per IP
    const ipLimit = await checkRateLimit(request, {
      namespace: "login:ip",
      max: 10,
      windowSeconds: 900,
    });
    if (!ipLimit.allowed) {
      return ipLimit.response;
    }

    const body = await parseJsonObject(request);
    const email = normalizeEmail(body.email);
    const password = validatePassword(body.password);

    // Rate limit: 10 attempts per 15 minutes per normalized email
    // Mitigates distributed attacks targeting a single account
    const emailLimit = await checkRateLimit(request, {
      namespace: "login:email",
      identifier: email,
      max: 10,
      windowSeconds: 900,
    });
    if (!emailLimit.allowed) {
      return emailLimit.response;
    }

    const user = await findActiveUserByEmailWithPassword(email);
    if (!user) {
      return privateJson(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return privateJson(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        headers: { "Cache-Control": "private, no-store" },
      },
    );
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    console.error("Login error:", error);
    return privateJson(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
