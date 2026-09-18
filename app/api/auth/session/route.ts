import { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { privateJson } from "@/lib/validation";

export async function GET(request: NextRequest) {
  // Rate limit: 60 requests per minute per client IP
  const rl = await checkRateLimit(request, {
    namespace: "session:get",
    max: 60,
    windowSeconds: 60,
  });
  if (!rl.allowed) {
    return rl.response;
  }

  const session = await getSessionFromRequest(request);

  if (!session) {
    return privateJson(
      { authenticated: false },
      { status: 401 },
    );
  }

  return privateJson(
    {
      authenticated: true,
      user: {
        userId: session.userId,
        email: session.email,
        role: session.role,
        name: session.name,
      },
    },
  );
}
