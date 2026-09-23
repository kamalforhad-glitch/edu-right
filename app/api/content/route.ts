import { NextRequest, NextResponse } from "next/server";
import {
  listContentItems,
  createContentItem,
  toPublicContent,
} from "@/lib/models/Content";
import { getSessionFromRequest } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  CONTENT_TYPES,
  isUniqueViolation,
  isValidationError,
  parseJsonObject,
  parseOptionalBooleanQuery,
  parsePagination,
  privateJson,
  validateContentInput,
  validationResponse,
} from "@/lib/validation";

// GET: List content (public for published, all for admin)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawType = searchParams.get("type") ?? undefined;
  const rawPublished = searchParams.get("published") ?? undefined;

  let isAuthenticated = false;

  if (rawPublished === "false" || (!rawPublished && !rawType)) {
    const session = await getSessionFromRequest(request);
    if (rawPublished === "false" && !session) {
      return privateJson({ error: "Unauthorized" }, { status: 401 });
    }
    isAuthenticated = !!session;
  }

  try {
    const type = rawType;
    if (type && !CONTENT_TYPES.includes(type as (typeof CONTENT_TYPES)[number])) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    const published = parseOptionalBooleanQuery(searchParams, "published");
    const featured = parseOptionalBooleanQuery(searchParams, "featured");
    const { page, limit } = parsePagination(searchParams);
    const data = await listContentItems({
      type,
      published,
      featured,
      page,
      limit,
      isAuthenticated,
    });
    // Include camelCase aliases alongside snake_case so public page-clients
    // (which read featuredImage, eventDate, …) render CMS images and dates.
    const result = { ...data, contents: data.contents.map(toPublicContent) };
    // Private when authenticated (may contain drafts); public cacheable otherwise
    return isAuthenticated
      ? privateJson(result)
      : NextResponse.json(result);
  } catch (error) {
    if (isValidationError(error)) {
      return NextResponse.json(validationResponse(error), { status: 400 });
    }
    console.error("List content error:", error);
    return NextResponse.json(
      { error: "Failed to list content" },
      { status: 500 },
    );
  }
}

// POST: Create content (admin only)
export async function POST(request: NextRequest) {
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
    const body = await parseJsonObject(request);
    const sanitized = validateContentInput(body);

    const content = await createContentItem({
      ...(sanitized as Parameters<typeof createContentItem>[0]),
      author_id: session.userId,
    });

    return privateJson({ success: true, content }, { status: 201 });
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    if (isUniqueViolation(error)) {
      return privateJson({ error: "A content item with this slug already exists" }, { status: 409 });
    }
    console.error("Create content error:", error);
    return privateJson(
      { error: "Failed to create content" },
      { status: 500 },
    );
  }
}
