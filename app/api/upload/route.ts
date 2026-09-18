import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadToSupabaseStorage } from "@/lib/storage";
import { checkRateLimit } from "@/lib/rate-limit";
import { privateJson } from "@/lib/validation";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_REQUEST_SIZE = MAX_FILE_SIZE + 64 * 1024;
const SUPPORTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

function matchesImageSignature(bytes: Uint8Array, type: string): boolean {
  if (type === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (type === "image/png") {
    return (
      bytes.length >= 8 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
    );
  }
  if (type === "image/gif") {
    return (
      bytes.length >= 6 &&
      (String.fromCharCode(...bytes.slice(0, 6)) === "GIF89a" ||
        String.fromCharCode(...bytes.slice(0, 6)) === "GIF87a")
    );
  }
  if (type === "image/webp") {
    return (
      bytes.length >= 12 &&
      String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"
    );
  }
  return false;
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  // Rate limit: 20 uploads per 10 minutes per authenticated user
  const rl = await checkRateLimit(request, {
    namespace: "upload:user",
    identifier: auth.session.userId,
    max: 20,
    windowSeconds: 600,
  });
  if (!rl.allowed) {
    return rl.response;
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_REQUEST_SIZE) {
    return privateJson(
      { error: "File too large. Maximum size is 10MB" },
      { status: 413 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return privateJson(
      { error: "Invalid form data or request format" },
      { status: 400 },
    );
  }

  const files = formData.getAll("image");
  const file = files[0];

  if (
    files.length !== 1 ||
    !file ||
    typeof file === "string" ||
    !(file instanceof Blob)
  ) {
    return privateJson(
      { error: "No image file provided" },
      { status: 400 },
    );
  }

  if (file.size === 0) {
    return privateJson({ error: "Uploaded file is empty" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return privateJson(
      { error: "File too large. Maximum size is 10MB" },
      { status: 413 },
    );
  }

  if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
    return privateJson(
      {
        error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed",
      },
      { status: 400 },
    );
  }

  let bytes: Uint8Array;
  try {
    bytes = new Uint8Array(await file.arrayBuffer());
  } catch {
    return privateJson(
      { error: "Unable to read uploaded file" },
      { status: 400 },
    );
  }
  if (!matchesImageSignature(bytes, file.type)) {
    return privateJson(
      { error: "Uploaded file content does not match its declared image type" },
      { status: 400 },
    );
  }

  try {
    const result = await uploadToSupabaseStorage(file);

    if (!result) {
      return privateJson(
        { error: "Failed to upload image" },
        { status: 500 },
      );
    }

    return privateJson({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return privateJson(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
