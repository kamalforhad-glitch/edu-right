import { NextRequest } from "next/server";
import { getUserCount, createNewUser } from "@/lib/models/User";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  ValidationError,
  isUniqueViolation,
  isValidationError,
  normalizeEmail,
  parseJsonObject,
  privateJson,
  validateName,
  validatePassword,
  validationResponse,
} from "@/lib/validation";

// POST: Create initial admin if no users exist
export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 requests per 15 minutes per IP
    const rl = await checkRateLimit(request, {
      namespace: "setup:post",
      max: 5,
      windowSeconds: 900,
    });
    if (!rl.allowed) {
      return rl.response;
    }

    const body = await parseJsonObject(request);
    if ("role" in body) {
      throw new ValidationError("Role is not supported during setup");
    }
    const name = validateName(body.name);
    const email = normalizeEmail(body.email);
    const password = validatePassword(body.password);

    const userCount = await getUserCount();
    if (userCount > 0) {
      return privateJson(
        { error: "Setup already completed. Admin users exist." },
        { status: 403 },
      );
    }

    const user = await createNewUser({
      name,
      email,
      password,
      role: "superadmin",
      is_active: true,
    });

    return privateJson(
      {
        success: true,
        message: "Initial admin created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 201,
        headers: { "Cache-Control": "private, no-store" },
      },
    );
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    if (isUniqueViolation(error)) {
      return privateJson(
        { error: "Setup already completed or user already exists" },
        { status: 409 },
      );
    }
    console.error("Setup error:", error);
    return privateJson(
      { error: "Failed to create admin" },
      { status: 500 },
    );
  }
}

// GET: Check if setup is needed
export async function GET(request: NextRequest) {
  try {
    const rl = await checkRateLimit(request, {
      namespace: "setup:get",
      max: 60,
      windowSeconds: 60,
    });
    if (!rl.allowed) {
      return rl.response;
    }

    const userCount = await getUserCount();
    return privateJson({
      setupRequired: userCount === 0,
    });
  } catch (error) {
    console.error("Setup check error:", error);
    return privateJson(
      { error: "Failed to check setup status" },
      { status: 500 },
    );
  }
}
