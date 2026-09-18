import { NextRequest } from "next/server";
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  userHasContent,
} from "@/lib/models/User";
import { requireSuperadmin } from "@/lib/auth";
import { sanitizeUserUpdate } from "@/lib/types/db";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  isUniqueViolation,
  isValidationError,
  parseJsonObject,
  privateJson,
  requireUuid,
  validateUserUpdateInput,
  validationResponse,
} from "@/lib/validation";

// Returns true when `id` is the ONLY active superadmin in the system.
async function isLastActiveSuperadmin(id: string): Promise<boolean> {
  const users = await getAllUsers();
  const activeSuperadmins = users.filter(
    (u) => u.role === "superadmin" && u.is_active,
  );
  return (
    activeSuperadmins.length === 1 && activeSuperadmins[0].id === id
  );
}

// PATCH: Update user (superadmin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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
    const { id } = await params;
    requireUuid(id, "user ID");
    const body = await parseJsonObject(request);
    const validated = validateUserUpdateInput(body);
    const sanitized = sanitizeUserUpdate(validated);

    // Only a verified superadmin reaches here, so role/is_active changes are
    // permitted — but they must be validated.
    if (
      "role" in sanitized &&
      sanitized.role !== "admin" &&
      sanitized.role !== "superadmin"
    ) {
      return privateJson(
        { error: "Invalid role. Must be 'admin' or 'superadmin'" },
        { status: 400 },
      );
    }

    // ── Self-lockout protection ────────────────────────────────
    // Do not allow the last active superadmin to be demoted or deactivated.
    const demoting =
      "role" in sanitized && sanitized.role !== "superadmin";
    const deactivating =
      "is_active" in sanitized && sanitized.is_active === false;

    if (demoting || deactivating) {
      const target = await getUserById(id);
      if (!target) {
        return privateJson(
          { error: "User not found" },
          { status: 404 },
        );
      }
      if (
        target.role === "superadmin" &&
        target.is_active &&
        (await isLastActiveSuperadmin(id))
      ) {
        return privateJson(
          {
            error:
              "Cannot demote or deactivate the last active superadmin",
          },
          { status: 409 },
        );
      }
    }

    const user = await updateUserById(id, sanitized);

    if (!user) {
      return privateJson({ error: "User not found" }, { status: 404 });
    }

    return privateJson({ success: true, user });
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
    console.error("Update user error:", error);
    return privateJson(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

// DELETE: Delete user (superadmin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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
    const { id } = await params;
    requireUuid(id, "user ID");

    // Prevent self-deletion
    if (auth.session.userId === id) {
      return privateJson(
        { error: "You cannot delete your own account" },
        { status: 400 },
      );
    }

    // ── Self-lockout protection ────────────────────────────────
    // Do not allow the last active superadmin to be deleted.
    if (await isLastActiveSuperadmin(id)) {
      return privateJson(
        { error: "Cannot delete the last active superadmin" },
        { status: 409 },
      );
    }

    // Check if user has content
    const hasContent = await userHasContent(id);
    if (hasContent) {
      return privateJson(
        {
          error:
            "Cannot delete user with existing content. Reassign or delete their content first.",
        },
        { status: 409 },
      );
    }

    const deleted = await deleteUserById(id);
    if (!deleted) {
      return privateJson({ error: "User not found" }, { status: 404 });
    }
    return privateJson({ success: true });
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    console.error("Delete user error:", error);
    return privateJson(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
