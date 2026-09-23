import { NextRequest } from "next/server";
import { getContentStatsData, toPublicContent } from "@/lib/models/Content";
import { requireAdmin } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { privateJson } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  // Rate limit: 60 requests per minute per authenticated admin
  const rl = await checkRateLimit(request, {
    namespace: "admin_stats:user",
    identifier: auth.session.userId,
    max: 60,
    windowSeconds: 60,
  });
  if (!rl.allowed) return rl.response;

  try {
    const result = await getContentStatsData();
    // CamelCase aliases for the dashboard's recent-content list
    // (which reads isPublished / createdAt).
    return privateJson({
      ...result,
      recentContent: result.recentContent.map(toPublicContent),
    });
  } catch (error) {
    console.error("Stats error:", error);
    return privateJson(
      { error: "Failed to get stats" },
      { status: 500 },
    );
  }
}
