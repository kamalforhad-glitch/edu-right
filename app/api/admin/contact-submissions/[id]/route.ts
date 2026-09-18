import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  isValidationError,
  parseJsonObject,
  privateJson,
  requireUuid,
  validateSubmissionStatus,
  validationResponse,
} from "@/lib/validation";
import {
  getContactSubmissionById,
  updateContactSubmissionStatus,
} from "@/lib/models/ContactSubmission";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const { id } = await params;
  try {
    requireUuid(id, "id");
  } catch (e) {
    if (isValidationError(e)) return privateJson(validationResponse(e), { status: 400 });
    throw e;
  }

  try {
    const submission = await getContactSubmissionById(id);
    if (!submission) return privateJson({ error: "Not found" }, { status: 404 });
    return privateJson({ submission });
  } catch (error) {
    console.error("Get contact submission error:", error);
    return privateJson({ error: "Failed to fetch submission" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const rl = await checkRateLimit(request, {
    namespace: "admin_contact_patch:user",
    identifier: auth.session.userId,
    max: 60,
    windowSeconds: 60,
  });
  if (!rl.allowed) return rl.response;

  const { id } = await params;
  try {
    requireUuid(id, "id");
    const body = await parseJsonObject(request);
    if (!("status" in body) || Object.keys(body).length !== 1) {
      throw new Error("Invalid body");
    }
    const status = validateSubmissionStatus(body.status);

    const updated = await updateContactSubmissionStatus(id, status);
    if (!updated) return privateJson({ error: "Not found" }, { status: 404 });
    return privateJson({ success: true, submission: updated });
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    // Generic invalid body
    if (error instanceof Error && error.message === "Invalid body") {
      return privateJson({ error: "Invalid request" }, { status: 400 });
    }
    console.error("Update contact submission error:", error);
    return privateJson({ error: "Failed to update submission" }, { status: 500 });
  }
}
