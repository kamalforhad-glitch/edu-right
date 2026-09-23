import { NextRequest } from "next/server";
import { requireAdmin, createToken } from "@/lib/auth";
import {
  findUserByIdWithPassword,
  comparePassword,
  changeUserPassword,
} from "@/lib/models/User";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  isValidationError,
  parseJsonObject,
  privateJson,
  validateChangePasswordInput,
  validationResponse,
} from "@/lib/validation";

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  // Rate limit: 10 attempts per 15 minutes per client IP (burst protection).
  const ipLimit = await checkRateLimit(request, {
    namespace: "change-password:ip",
    max: 10,
    windowSeconds: 900,
  });
  if (!ipLimit.allowed) {
    return ipLimit.response;
  }

  // Rate limit: 5 attempts per 15 minutes per authenticated admin
  // (brute-force protection on the current-password check).
  const userLimit = await checkRateLimit(request, {
    namespace: "change-password:user",
    identifier: auth.session.userId,
    max: 5,
    windowSeconds: 900,
  });
  if (!userLimit.allowed) {
    return userLimit.response;
  }

  try {
    const body = await parseJsonObject(request);
    const { currentPassword, newPassword } =
      validateChangePasswordInput(body);

    const user = await findUserByIdWithPassword(auth.session.userId);
    if (!user || !user.is_active) {
      return privateJson({ error: "Unauthorized" }, { status: 401 });
    }

    const isCurrentValid = await comparePassword(
      currentPassword,
      user.password_hash,
    );
    if (!isCurrentValid) {
      return privateJson(
        { error: "Current password is incorrect" },
        { status: 400 },
      );
    }

    const updated = await changeUserPassword(user.id, newPassword);
    if (!updated) {
      return privateJson(
        { error: "Failed to update password" },
        { status: 500 },
      );
    }

    // Securely refresh the session: re-issue a JWT from fresh DB state so
    // the admin stays logged in without re-authenticating. The token
    // carries no password material — only id/email/role/name.
    const token = await createToken({
      userId: updated.id,
      email: updated.email,
      role: updated.role,
      name: updated.name,
    });

    return privateJson({
      success: true,
      message: "Password changed successfully",
      token,
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
      },
    });
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    console.error("Change password error:", error);
    return privateJson(
      { error: "Failed to change password" },
      { status: 500 },
    );
  }
}
