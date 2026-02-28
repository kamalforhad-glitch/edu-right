"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { adminFetch } from "@/lib/contexts/AdminAuthContext";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = "Featured Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await adminFetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label}
      </label>

      {value ?
        <div className="relative group rounded-lg overflow-hidden border border-slate-600/50">
          <Image
            src={value}
            alt="Upload preview"
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      : <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full h-40 border-2 border-dashed border-slate-600/50 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-teal-500/30 hover:bg-slate-800/30 transition-colors text-slate-400 disabled:opacity-50"
        >
          {uploading ?
            <>
              <div className="w-6 h-6 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
              <span className="text-sm">Uploading...</span>
            </>
          : <>
              <ImageIcon className="w-8 h-8" />
              <span className="text-sm">Click to upload image</span>
              <span className="text-xs text-slate-500">
                JPEG, PNG, GIF, WebP (max 10MB)
              </span>
            </>
          }
        </button>
      }

      {/* URL input as fallback */}
      <div className="mt-2">
        <input
          type="url"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-xs"
          placeholder="Or paste image URL directly"
        />
      </div>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}

interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

export function MultiImageUpload({
  values,
  onChange,
  label = "Gallery Images",
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        const res = await adminFetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        return res.ok ? data.url : null;
      });

      const urls = (await Promise.all(uploadPromises)).filter(Boolean);
      onChange([...values, ...urls]);
    } catch {
      console.error("Upload error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label}
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
        {values.map((url, i) => (
          <div
            key={i}
            className="relative group rounded-lg overflow-hidden border border-slate-600/50"
          >
            <Image
              src={url}
              alt={`Gallery ${i + 1}`}
              width={200}
              height={150}
              className="w-full h-28 object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="h-28 border-2 border-dashed border-slate-600/50 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-teal-500/30 text-slate-400 text-sm disabled:opacity-50"
        >
          {uploading ?
            <div className="w-5 h-5 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
          : <>
              <Upload className="w-5 h-5" />
              <span className="text-xs">Add Images</span>
            </>
          }
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
