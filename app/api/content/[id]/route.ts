import { NextRequest, NextResponse } from "next/server";
import {
  getContentItem,
  updateContentItem,
  deleteContentItem,
  toPublicContent,
} from "@/lib/models/Content";
import { getSessionFromRequest } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  isUniqueViolation,
  isValidationError,
  parseJsonObject,
  privateJson,
  requireUuid,
  validateContentInput,
  validationResponse,
} from "@/lib/validation";

// GET: Get single content by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    requireUuid(id);
    const content = await getContentItem(id);

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // If not published, only admin can view
    if (!content.is_published) {
      const session = await getSessionFromRequest(request);
      if (!session) {
        return NextResponse.json(
          { error: "Content not found" },
          { status: 404 },
        );
      }
    }

    return content.is_published
      ? NextResponse.json({ content: toPublicContent(content) })
      : privateJson({ content });
  } catch (error) {
    if (isValidationError(error)) {
      return NextResponse.json(validationResponse(error), { status: 400 });
    }
    console.error("Get content error:", error);
    return NextResponse.json(
      { error: "Failed to get content" },
      { status: 500 },
    );
  }
}

// PATCH: Update content (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return privateJson({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit: 60 content writes per minute per authenticated user
  const rl = await checkRateLimit(request, {
    namespace: "content_write:user",
    identifier: session.userId,
    max: 60,
    windowSeconds: 60,
  });
  if (!rl.allowed) {
    return rl.response;
  }

  try {
    const { id } = await params;
    requireUuid(id);
    const body = await parseJsonObject(request);
    const sanitized = validateContentInput(body, { partial: true });

    const content = await updateContentItem(id, sanitized);

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return privateJson({ success: true, content });
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    if (isUniqueViolation(error)) {
      return privateJson({ error: "A content item with this slug already exists" }, { status: 409 });
    }
    console.error("Update content error:", error);
    return privateJson(
      { error: "Failed to update content" },
      { status: 500 },
    );
  }
}

// DELETE: Delete content (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return privateJson({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit: 60 content writes per minute per authenticated user
  const rl = await checkRateLimit(request, {
    namespace: "content_write:user",
    identifier: session.userId,
    max: 60,
    windowSeconds: 60,
  });
  if (!rl.allowed) {
    return rl.response;
  }

  try {
    const { id } = await params;
    requireUuid(id);
    const deleted = await deleteContentItem(id);
    if (!deleted) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    console.error("Delete content error:", error);
    return privateJson(
      { error: "Failed to delete content" },
      { status: 500 },
    );
  }
}
