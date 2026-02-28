import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Content from "@/lib/models/Content";
import { getSession } from "@/lib/auth";

// GET: List content (public for published, all for admin)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const published = searchParams.get("published");
  const featured = searchParams.get("featured");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  await connectDB();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};

  if (type) query.type = type;

  // If "published" param is set, filter by it; otherwise check session
  if (published === "true") {
    query.isPublished = true;
  } else if (published === "false") {
    // Admin wants unpublished only
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    query.isPublished = false;
  } else {
    // If no published filter, check if admin - show all; else only published
    const session = await getSession();
    if (!session) {
      query.isPublished = true;
    }
  }

  if (featured === "true") query.isFeatured = true;

  const [contents, total] = await Promise.all([
    Content.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Content.countDocuments(query),
  ]);

  return NextResponse.json({
    contents,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

// POST: Create content (admin only)
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    await connectDB();

    const content = await Content.create({
      ...body,
      author: session.userId,
    });

    return NextResponse.json({ success: true, content }, { status: 201 });
  } catch (error) {
    console.error("Create content error:", error);
    return NextResponse.json(
      { error: "Failed to create content" },
      { status: 500 },
    );
  }
}
