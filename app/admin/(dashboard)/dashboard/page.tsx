"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Eye,
  EyeOff,
  Users,
  Newspaper,
  Calendar,
  ImageIcon,
  FileSearch,
  Megaphone,
  Landmark,
  FolderKanban,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { adminFetch } from "@/lib/contexts/AdminAuthContext";

interface Stats {
  totalContent: number;
  publishedContent: number;
  draftContent: number;
  totalUsers: number;
  contentByType: Record<string, number>;
}

interface RecentItem {
  _id: string;
  title: string;
  type: string;
  isPublished: boolean;
  createdAt: string;
  author?: { name: string };
}

const typeConfig: Record<
  string,
  { label: string; icon: React.ElementType; color: string; href: string }
> = {
  news: {
    label: "News",
    icon: Newspaper,
    color: "bg-blue-500/20 text-blue-400",
    href: "/admin/content/news",
  },
  event: {
    label: "Events",
    icon: Calendar,
    color: "bg-green-500/20 text-green-400",
    href: "/admin/content/events",
  },
  gallery: {
    label: "Gallery",
    icon: ImageIcon,
    color: "bg-purple-500/20 text-purple-400",
    href: "/admin/content/gallery",
  },
  research: {
    label: "Research",
    icon: FileSearch,
    color: "bg-amber-500/20 text-amber-400",
    href: "/admin/content/research",
  },
  advocacy: {
    label: "Advocacy",
    icon: Megaphone,
    color: "bg-rose-500/20 text-rose-400",
    href: "/admin/content/advocacy",
  },
  parliament: {
    label: "Parliament",
    icon: Landmark,
    color: "bg-cyan-500/20 text-cyan-400",
    href: "/admin/content/parliament",
  },
  project: {
    label: "Projects",
    icon: FolderKanban,
    color: "bg-indigo-500/20 text-indigo-400",
    href: "/admin/content/projects",
  },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentContent, setRecentContent] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await adminFetch("/api/admin/stats");
      const data = await res.json();
      setStats(data.stats);
      setRecentContent(data.recentContent || []);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Overview of your content and activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm">Total Content</span>
            <div className="w-9 h-9 bg-teal-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            {stats?.totalContent || 0}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm">Published</span>
            <div className="w-9 h-9 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            {stats?.publishedContent || 0}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm">Drafts</span>
            <div className="w-9 h-9 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            {stats?.draftContent || 0}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm">Admin Users</span>
            <div className="w-9 h-9 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            {stats?.totalUsers || 0}
          </div>
        </div>
      </div>

      {/* Content by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            Content by Type
          </h2>
          <div className="space-y-3">
            {Object.entries(typeConfig).map(([type, config]) => {
              const count = stats?.contentByType?.[type] || 0;
              const Icon = config.icon;
              return (
                <Link
                  key={type}
                  href={config.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-slate-300 text-sm">
                      {config.label}
                    </span>
                  </div>
                  <span className="text-white font-semibold">{count}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Content */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Content
          </h2>
          {recentContent.length === 0 ?
            <p className="text-slate-400 text-sm text-center py-8">
              No content yet. Start creating!
            </p>
          : <div className="space-y-3">
              {recentContent.map((item) => {
                const config = typeConfig[item.type];
                return (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${config?.color || "bg-slate-500/20 text-slate-400"}`}
                        >
                          {config?.label || item.type}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.isPublished ?
                          "bg-green-500/20 text-green-400"
                        : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                );
              })}
            </div>
          }
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(typeConfig).map(([type, config]) => {
            const Icon = config.icon;
            return (
              <Link
                key={type}
                href={`${config.href}/new`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 hover:border-teal-500/30 transition-all text-center"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-300">
                  Add {config.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
