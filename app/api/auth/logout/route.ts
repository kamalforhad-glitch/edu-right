import { privateJson } from "@/lib/validation";

export async function POST() {
  return privateJson({ success: true });
}
