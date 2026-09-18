import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";

const BUCKET = "content-images";

function extensionFromMime(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/gif":
      return "gif";
    case "image/webp":
      return "webp";
    default:
      return "bin";
  }
}

/**
 * Upload an image file to Supabase Storage.
 * - Bucket: content-images (public)
 * - Path: content/<uuid>.<ext> — no client-controlled name or path
 * - Returns public URL on success, null on failure
 * - Never exposes secrets or bucket internals to caller
 */
export async function uploadToSupabaseStorage(
  file: Blob,
): Promise<{ url: string } | null> {
  const mime = file.type;
  const ext = extensionFromMime(mime);
  const filename = `${randomUUID()}.${ext}`;
  const path = `content/${filename}`;

  let buffer: ArrayBuffer;
  try {
    buffer = await file.arrayBuffer();
  } catch {
    return null;
  }

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: mime,
      upsert: false,
    });

  if (error) {
    console.error("Supabase Storage upload failed:", error.message);
    return null;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  if (!data?.publicUrl || typeof data.publicUrl !== "string") {
    console.error("Failed to generate public URL for", path);
    return null;
  }

  // Validate URL is http/https
  try {
    const url = new URL(data.publicUrl);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  } catch {
    return null;
  }

  return { url: data.publicUrl };
}
