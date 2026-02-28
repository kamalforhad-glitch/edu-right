import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Content from "@/lib/models/Content";
import { getSession } from "@/lib/auth";

// GET: Get single content by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();

    const content = await Content.findById(id)
      .populate("author", "name email")
      .lean();

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // If not published, only admin can view
    if (!content.isPublished) {
      const session = await getSession();
      if (!session) {
        return NextResponse.json(
          { error: "Content not found" },
          { status: 404 },
        );
      }
    }

    return NextResponse.json({ content });
  } catch (error) {
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
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const updates = await request.json();

    await connectDB();

    const content = await Content.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("author", "name email");

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("Update content error:", error);
    return NextResponse.json(
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
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();

    const content = await Content.findByIdAndDelete(id);
    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete content error:", error);
    return NextResponse.json(
      { error: "Failed to delete content" },
      { status: 500 },
    );
  }
}
