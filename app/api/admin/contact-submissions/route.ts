import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  isValidationError,
  parsePagination,
  privateJson,
  validationResponse,
} from "@/lib/validation";
import { listContactSubmissions } from "@/lib/models/ContactSubmission";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const rl = await checkRateLimit(request, {
    namespace: "admin_contact_list:user",
    identifier: auth.session.userId,
    max: 60,
    windowSeconds: 60,
  });
  if (!rl.allowed) return rl.response;

  try {
    const { searchParams } = new URL(request.url);
    const { page, limit } = parsePagination(searchParams);
    const status = searchParams.get("status") ?? undefined;
    if (status && !["new", "read", "archived"].includes(status)) {
      return privateJson({ error: "Invalid status" }, { status: 400 });
    }

    const { submissions, total } = await listContactSubmissions({ page, limit, status });

    return privateJson({
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    console.error("List contact submissions error:", error);
    return privateJson({ error: "Failed to list submissions" }, { status: 500 });
  }
}
