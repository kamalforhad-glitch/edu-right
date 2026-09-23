"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";
import { ImageUpload, MultiImageUpload } from "./ImageUpload";
import type { ContentType } from "@/lib/types/db";
import { adminFetch } from "@/lib/contexts/AdminAuthContext";

interface ContentEditorProps {
  type: ContentType;
  contentId?: string;
  backHref: string;
  title: string;
}

interface FormState {
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  content: string;
  contentBn: string;
  featured_image: string;
  images: string[];
  tags: string[];
  category: string;
  event_date: string;
  event_end_date: string;
  event_location: string;
  event_location_bn: string;
  expected_attendees: string;
  external_link: string;
  source: string;
  publish_date: string;
  status: string;
  is_published: boolean;
  is_featured: boolean;
  order: string;
}

const initialForm: FormState = {
  title: "",
  titleBn: "",
  description: "",
  descriptionBn: "",
  content: "",
  contentBn: "",
  featured_image: "",
  images: [],
  tags: [],
  category: "",
  event_date: "",
  event_end_date: "",
  event_location: "",
  event_location_bn: "",
  expected_attendees: "",
  external_link: "",
  source: "",
  publish_date: "",
  status: "",
  is_published: false,
  is_featured: false,
  order: "0",
};

export function ContentEditor({
  type,
  contentId,
  backHref,
  title,
}: ContentEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(!!contentId);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const isEditing = !!contentId;

  useEffect(() => {
    if (contentId) {
      fetchContent();
    }
  }, [contentId]);

  const fetchContent = async () => {
    try {
      const res = await adminFetch(`/api/content/${contentId}`);
      const data = await res.json();
      if (data.content) {
        const c = data.content;
        setForm({
          title: c.title || "",
          titleBn: c.title_bn || "",
          description: c.description || "",
          descriptionBn: c.description_bn || "",
          content: c.content || "",
          contentBn: c.content_bn || "",
          featured_image: c.featured_image || "",
          images: c.images || [],
          tags: c.tags || [],
          category: c.category || "",
          event_date:
            c.event_date ? new Date(c.event_date).toISOString().slice(0, 16) : "",
          event_end_date:
            c.event_end_date ?
              new Date(c.event_end_date).toISOString().slice(0, 16)
            : "",
          event_location: c.event_location || "",
          event_location_bn: c.event_location_bn || "",
          expected_attendees: c.expected_attendees?.toString() || "",
          external_link: c.external_link || "",
          source: c.source || "",
          publish_date:
            c.publish_date ?
              new Date(c.publish_date).toISOString().slice(0, 10)
            : "",
          status: c.status || "",
          is_published: c.is_published || false,
          is_featured: c.is_featured || false,
          order: c.display_order?.toString() || "0",
        });
      }
    } catch (error) {
      console.error("Fetch content error:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (publish?: boolean) => {
    setLoading(true);
    setError("");

    try {
      // Build the payload
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        type,
        title: form.title,
        title_bn: form.titleBn || undefined,
        description: form.description,
        description_bn: form.descriptionBn || undefined,
        content: form.content,
        content_bn: form.contentBn || undefined,
        featured_image: form.featured_image || undefined,
        images: form.images.length > 0 ? form.images : undefined,
        tags: form.tags.length > 0 ? form.tags : undefined,
        category: form.category || undefined,
        is_published: publish !== undefined ? publish : form.is_published,
        is_featured: form.is_featured,
        display_order: parseInt(form.order) || 0,
      };

      // Type-specific fields
      if (type === "event") {
        if (form.event_date) payload.event_date = new Date(form.event_date);
        if (form.event_end_date)
          payload.event_end_date = new Date(form.event_end_date);
        payload.event_location = form.event_location || undefined;
        payload.event_location_bn = form.event_location_bn || undefined;
        payload.expected_attendees =
          form.expected_attendees ? parseInt(form.expected_attendees) : undefined;
        // CTA / registration / report link shown on the public event cards
        payload.external_link = form.external_link || undefined;
        // Manual status override (upcoming / ongoing / completed);
        // the public page derives past/upcoming from the date when unset
        payload.status = form.status || undefined;
      }

      if (type === "news") {
        payload.external_link = form.external_link || undefined;
        payload.source = form.source || undefined;
        if (form.publish_date) payload.publish_date = new Date(form.publish_date);
      }

      if (type === "project") {
        payload.status = form.status || undefined;
      }

      const url = isEditing ? `/api/content/${contentId}` : "/api/content";
      const method = isEditing ? "PATCH" : "POST";

      const res = await adminFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save");
        return;
      }

      router.push(backHref);
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm({ ...form, tags: [...form.tags, tag] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href={backHref}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Eye className="w-4 h-4" />
            {isEditing && form.is_published ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Title (English) *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                placeholder="Enter title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Title (বাংলা)
              </label>
              <input
                type="text"
                value={form.titleBn}
                onChange={(e) => setForm({ ...form, titleBn: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                placeholder="শিরোনাম লিখুন"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Short Description (English) *
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                rows={3}
                placeholder="Brief description"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Short Description (বাংলা)
              </label>
              <textarea
                value={form.descriptionBn}
                onChange={(e) =>
                  setForm({ ...form, descriptionBn: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                rows={3}
                placeholder="সংক্ষিপ্ত বিবরণ"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Full Content (English)
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm font-mono"
                rows={8}
                placeholder="Full article/content text..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Full Content (বাংলা)
              </label>
              <textarea
                value={form.contentBn}
                onChange={(e) =>
                  setForm({ ...form, contentBn: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm font-mono"
                rows={8}
                placeholder="পূর্ণ বিষয়বস্তু..."
              />
            </div>
          </div>
        </div>

        {/* Type-specific fields */}
        {type === "event" && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Event Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={form.event_date}
                  onChange={(e) =>
                    setForm({ ...form, event_date: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Event End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={form.event_end_date}
                  onChange={(e) =>
                    setForm({ ...form, event_end_date: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Location (English)
                </label>
                <input
                  type="text"
                  value={form.event_location}
                  onChange={(e) =>
                    setForm({ ...form, event_location: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                  placeholder="Dhaka, Bangladesh"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Location (বাংলা)
                </label>
                <input
                  type="text"
                  value={form.event_location_bn}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      event_location_bn: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                  placeholder="ঢাকা, বাংলাদেশ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Expected Attendees
                </label>
                <input
                  type="number"
                  value={form.expected_attendees}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      expected_attendees: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50  rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                >
                  <option value="">Auto (from event date)</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  CTA / Registration Link
                </label>
                <input
                  type="url"
                  value={form.external_link}
                  onChange={(e) =>
                    setForm({ ...form, external_link: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                  placeholder="https://... (registration form or event report)"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Shown as the card CTA button (“Register / Read Report”). When
                  empty, cards link to the site instead.
                </p>
              </div>
            </div>
          </div>
        )}

        {type === "news" && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              News Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  External Link
                </label>
                <input
                  type="url"
                  value={form.external_link}
                  onChange={(e) =>
                    setForm({ ...form, external_link: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Source
                </label>
                <input
                  type="text"
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                  placeholder="New Age BD"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={form.publish_date}
                  onChange={(e) =>
                    setForm({ ...form, publish_date: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {type === "project" && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Project Details
            </h2>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
              >
                <option value="">Select status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        )}

        {/* Media */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Media
          </h2>

          <ImageUpload
            value={form.featured_image}
            onChange={(url) => setForm({ ...form, featured_image: url })}
          />

          {type === "gallery" && (
            <MultiImageUpload
              values={form.images}
              onChange={(urls) => setForm({ ...form, images: urls })}
            />
          )}

          {type === "event" && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Gallery Images
              </label>
              <MultiImageUpload
                values={form.images}
                onChange={(urls) => setForm({ ...form, images: urls })}
              />
              <p className="mt-1 text-xs text-slate-500">
                Optional extra photos. The featured image above is the card
                visual; when it is empty a branded fallback header appears
                automatically.
              </p>
            </div>
          )}
        </div>

        {/* Tags & Category */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Organization
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                placeholder="Category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Tags
            </label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-teal-500/20 text-teal-400 px-2.5 py-1 rounded-full text-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) =>
                  setForm({ ...form, is_featured: e.target.checked })
                }
                className="w-4 h-4 rounded border-slate-600 bg-slate-900/50 text-teal-600 focus:ring-teal-500/50"
              />
              <span className="text-sm text-slate-300">Mark as Featured</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
