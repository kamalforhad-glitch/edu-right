export async function uploadToImageBB(
  file: File,
): Promise<{ url: string; deleteUrl: string; thumb: string } | null> {
  const apiKey = process.env.IMAGEBB_API_KEY;
  if (!apiKey) {
    throw new Error("IMAGEBB_API_KEY is not configured");
  }

  try {
    const formData = new FormData();
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    formData.append("image", base64);
    formData.append("key", apiKey);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return {
        url: data.data.display_url,
        deleteUrl: data.data.delete_url,
        thumb: data.data.thumb?.url || data.data.display_url,
      };
    }

    console.error("ImageBB upload failed:", data);
    return null;
  } catch (error) {
    console.error("ImageBB upload error:", error);
    return null;
  }
}
