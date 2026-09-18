import { NextRequest } from "next/server";
import {
  getAllUsers,
  findExistingUserByEmail,
  createNewUser,
} from "@/lib/models/User";
import { requireAdmin, requireSuperadmin } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  isUniqueViolation,
  isValidationError,
  parseJsonObject,
  validateUserCreateInput,
  privateJson,
  validationResponse,
} from "@/lib/validation";

// GET: List all users (admin only)
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const users = await getAllUsers();
    return privateJson({ users });
  } catch (error) {
    console.error("List users error:", error);
    return privateJson(
      { error: "Failed to list users" },
      { status: 500 },
    );
  }
}

// POST: Create new user (superadmin only)
export async function POST(request: NextRequest) {
  const auth = await requireSuperadmin(request);
  if (!auth.ok) return auth.response;

  // Rate limit: 30 requests per 10 minutes per authenticated superadmin
  const rl = await checkRateLimit(request, {
    namespace: "admin_users:user",
    identifier: auth.session.userId,
    max: 30,
    windowSeconds: 600,
  });
  if (!rl.allowed) {
    return rl.response;
  }

  try {
    const body = await parseJsonObject(request);
    const { name, email, password, role: requestedRole } =
      validateUserCreateInput(body);

    // Check if user already exists
    const existingUser = await findExistingUserByEmail(email);
    if (existingUser) {
      return privateJson(
        { error: "User with this email already exists" },
        { status: 409 },
      );
    }

    const user = await createNewUser({
      name,
      email,
      password,
      role: requestedRole,
    });

    return privateJson(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          is_active: user.is_active,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    if (isUniqueViolation(error)) {
      return privateJson(
        { error: "User with this email already exists" },
        { status: 409 },
      );
    }
    console.error("Create user error:", error);
    return privateJson(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
