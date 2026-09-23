"use client";

import { useEffect, useState, useRef } from "react";
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
  id: string;
  title: string;
  type: string;
  isPublished: boolean;
  createdAt: string;
  author?: { name: string };
}

const typeConfig: Record<
  string,
  { label: string; icon: React.ElementType; color: string; href: string; gradient: string }
> = {
  news: {
    label: "News",
    icon: Newspaper,
    color: "bg-blue-500/20 text-blue-400",
    href: "/admin/content/news",
    gradient: "from-blue-500 to-blue-600",
  },
  event: {
    label: "Events",
    icon: Calendar,
    color: "bg-green-500/20 text-green-400",
    href: "/admin/content/events",
    gradient: "from-green-500 to-green-600",
  },
  gallery: {
    label: "Gallery",
    icon: ImageIcon,
    color: "bg-purple-500/20 text-purple-400",
    href: "/admin/content/gallery",
    gradient: "from-purple-500 to-purple-600",
  },
  research: {
    label: "Research",
    icon: FileSearch,
    color: "bg-amber-500/20 text-amber-400",
    href: "/admin/content/research",
    gradient: "from-amber-500 to-amber-600",
  },
  advocacy: {
    label: "Advocacy",
    icon: Megaphone,
    color: "bg-rose-500/20 text-rose-400",
    href: "/admin/content/advocacy",
    gradient: "from-rose-500 to-rose-600",
  },
  parliament: {
    label: "Parliament",
    icon: Landmark,
    color: "bg-cyan-500/20 text-cyan-400",
    href: "/admin/content/parliament",
    gradient: "from-cyan-500 to-cyan-600",
  },
  project: {
    label: "Projects",
    icon: FolderKanban,
    color: "bg-indigo-500/20 text-indigo-400",
    href: "/admin/content/projects",
    gradient: "from-indigo-500 to-indigo-600",
  },
};

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;
    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const duration = 800;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  return <>{count}</>;
}

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

  const statCards = [
    {
      label: "Total Content",
      value: stats?.totalContent || 0,
      icon: FileText,
      iconColor: "text-teal-400",
      iconBg: "bg-teal-500/20",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      label: "Published",
      value: stats?.publishedContent || 0,
      icon: Eye,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/20",
      gradient: "from-green-500 to-green-600",
    },
    {
      label: "Drafts",
      value: stats?.draftContent || 0,
      icon: EyeOff,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/20",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      label: "Admin Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/20",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

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
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`}
              />
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm">{card.label}</span>
                <div
                  className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
              </div>
              <div className="text-4xl font-bold text-white">
                <AnimatedCounter target={card.value} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Content by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-lg">
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
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color}`}
                    >
                      <Icon className="w-5 h-5" />
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
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Content
          </h2>
          {recentContent.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 text-base font-medium">
                No content yet
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Start creating to see your content here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentContent.map((item) => {
                const config = typeConfig[item.type];
                return (
                  <div
                    key={item.id}
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
                        item.isPublished
                          ? "bg-green-500/20 text-green-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(typeConfig).map(([type, config]) => {
            const Icon = config.icon;
            return (
              <Link
                key={type}
                href={`${config.href}/new`}
                className="flex flex-col items-center gap-2 p-5 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 hover:border-teal-500/30 transition-all text-center shadow-md hover:shadow-xl"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${config.color}`}
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
