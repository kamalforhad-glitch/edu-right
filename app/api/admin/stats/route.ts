import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Content from "@/lib/models/Content";
import { getSession } from "@/lib/auth";
import User from "@/lib/models/User";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const [
    totalContent,
    publishedContent,
    draftContent,
    totalUsers,
    contentByType,
    recentContent,
  ] = await Promise.all([
    Content.countDocuments(),
    Content.countDocuments({ isPublished: true }),
    Content.countDocuments({ isPublished: false }),
    User.countDocuments({ isActive: true }),
    Content.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Content.find()
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  return NextResponse.json({
    stats: {
      totalContent,
      publishedContent,
      draftContent,
      totalUsers,
      contentByType: contentByType.reduce(
        (acc, item) => ({ ...acc, [item._id]: item.count }),
        {},
      ),
    },
    recentContent,
  });
}
