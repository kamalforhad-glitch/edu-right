"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Star,
  StarOff,
} from "lucide-react";
import type { ContentType } from "@/lib/types/db";
import { adminFetch } from "@/lib/contexts/AdminAuthContext";

interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  author?: { name: string; email: string } | null;
  featured_image?: string;
}

interface ContentListProps {
  type: ContentType;
  title: string;
  description: string;
}

export function ContentList({ type, title, description }: ContentListProps) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, [type]);

  const fetchContent = async () => {
    try {
      const res = await adminFetch(`/api/content?type=${type}&limit=100`);
      const data = await res.json();
      setItems(data.contents || []);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (id: string, isPublished: boolean) => {
    try {
      await adminFetch(`/api/content/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      fetchContent();
    } catch (error) {
      console.error("Toggle publish error:", error);
    }
  };

  const toggleFeatured = async (id: string, isFeatured: boolean) => {
    try {
      await adminFetch(`/api/content/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !isFeatured }),
      });
      fetchContent();
    } catch (error) {
      console.error("Toggle featured error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminFetch(`/api/content/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchContent();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-slate-400 text-sm mt-1">{description}</p>
        </div>
        <Link
          href={`/admin/content/${
            type === "news" ? "news"
            : type === "event" ? "events"
            : type === "gallery" ? "gallery"
            : type === "research" ? "research"
            : type === "advocacy" ? "advocacy"
            : type === "parliament" ? "parliament"
            : "projects"
          }/new`}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add New
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
            placeholder="Search content..."
          />
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">
                  Title
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">
                  Author
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">
                  Updated
                </th>
                <th className="text-right text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-700/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.featured_image && (
                        <img
                          src={item.featured_image}
                          alt=""
                          className="w-10 h-10 rounded object-cover"
                        />
                      )}
                      <span className="text-sm font-medium text-white">
                        {item.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          item.is_published ?
                            "bg-green-500/20 text-green-400"
                          : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {item.is_published ? "Published" : "Draft"}
                      </span>
                      {item.is_featured && (
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {item.author?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {new Date(item.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() =>
                          toggleFeatured(item.id, item.is_featured)
                        }
                        className="p-2 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-amber-500/10 transition-colors"
                        title={item.is_featured ? "Unfeature" : "Feature"}
                      >
                        {item.is_featured ?
                          <StarOff className="w-4 h-4" />
                        : <Star className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() =>
                          togglePublish(item.id, item.is_published)
                        }
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors"
                        title={item.is_published ? "Unpublish" : "Publish"}
                      >
                        {item.is_published ?
                          <EyeOff className="w-4 h-4" />
                        : <Eye className="w-4 h-4" />}
                      </button>
                      <Link
                        href={`/admin/content/${
                          type === "news" ? "news"
                          : type === "event" ? "events"
                          : type === "gallery" ? "gallery"
                          : type === "research" ? "research"
                          : type === "advocacy" ? "advocacy"
                          : type === "parliament" ? "parliament"
                          : "projects"
                        }/${item.id}`}
                        className="p-2 text-slate-400 hover:text-teal-400 rounded-lg hover:bg-teal-500/10 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-sm">
              {search ? "No matching content found." : "No content yet."}
            </p>
            {!search && (
              <Link
                href={`/admin/content/${
                  type === "news" ? "news"
                  : type === "event" ? "events"
                  : type === "gallery" ? "gallery"
                  : type === "research" ? "research"
                  : type === "advocacy" ? "advocacy"
                  : type === "parliament" ? "parliament"
                  : "projects"
                }/new`}
                className="inline-flex items-center gap-2 mt-3 text-teal-400 hover:text-teal-300 text-sm"
              >
                <Plus className="w-4 h-4" />
                Create your first entry
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-2">
              Delete Content?
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
