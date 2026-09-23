"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  ImageIcon,
  FileSearch,
  Megaphone,
  Landmark,
  FolderKanban,
  Users,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronDown,
  Mail,
  HeartHandshake,
  KeyRound,
} from "lucide-react";
import {
  AdminAuthProvider,
  useAdminAuth,
  adminFetch,
} from "@/lib/contexts/AdminAuthContext";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Content",
    icon: ChevronDown,
    children: [
      {
        label: "News & Publications",
        href: "/admin/content/news",
        icon: Newspaper,
      },
      { label: "Events", href: "/admin/content/events", icon: Calendar },
      { label: "Gallery", href: "/admin/content/gallery", icon: ImageIcon },
      {
        label: "Research & Policy",
        href: "/admin/content/research",
        icon: FileSearch,
      },
      {
        label: "Advocacy",
        href: "/admin/content/advocacy",
        icon: Megaphone,
      },
      {
        label: "Parliament Platform",
        href: "/admin/content/parliament",
        icon: Landmark,
      },
      {
        label: "Projects",
        href: "/admin/content/projects",
        icon: FolderKanban,
      },
    ],
  },
  {
    label: "Submissions",
    icon: ChevronDown,
    children: [
      {
        label: "Contact Messages",
        href: "/admin/contact-submissions",
        icon: Mail,
      },
      {
        label: "Get Involved",
        href: "/admin/get-involved-submissions",
        icon: HeartHandshake,
      },
    ],
  },
  {
    label: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Change Password",
    href: "/admin/change-password",
    icon: KeyRound,
  },
];

function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Content",
  ]);
  const [contactNew, setContactNew] = useState<number | null>(null);
  const [getInvolvedNew, setGetInvolvedNew] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchCounts = async () => {
      try {
        const [cRes, gRes] = await Promise.all([
          adminFetch("/api/admin/contact-submissions?status=new&limit=1").then(
            (r) => (r.ok ? r.json() : null),
          ),
          adminFetch(
            "/api/admin/get-involved-submissions?status=new&limit=1",
          ).then((r) => (r.ok ? r.json() : null)),
        ]);
        if (!cancelled) {
          if (cRes?.pagination?.total !== undefined)
            setContactNew(cRes.pagination.total);
          if (gRes?.pagination?.total !== undefined)
            setGetInvolvedNew(gRes.pagination.total);
        }
      } catch {
        // silent — badge stays hidden, do not expose errors
      }
    };
    // Only fetch when authenticated (user exists) to avoid 401 noise
    if (user) fetchCounts();
    return () => {
      cancelled = true;
    };
  }, [pathname, user]);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-slate-900 border-r border-slate-700/50 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700/50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <Link href="/admin/dashboard" className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-base">SEJ Admin</div>
              <div className="text-xs text-slate-400">Content Manager</div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto h-[calc(100%-140px)]">
          {sidebarItems.map((item, idx) => {
            const items = [];

            if (idx === 1) {
              items.push(
                <div
                  key="divider-top"
                  className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-2"
                />,
              );
            }

            if (item.children) {
              const isExpanded = expandedSections.includes(item.label);
              const isChildActive = item.children.some(
                (child) => pathname === child.href,
              );

              items.push(
                <div key={item.label}>
                  <button
                    onClick={() => toggleSection(item.label)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isChildActive
                        ? "text-teal-400"
                        : "text-slate-300 hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="ml-2 space-y-1 mt-1">
                      {item.children.map((child) => {
                        const Icon = child.icon;
                        const isActive = pathname === child.href;
                        let badge: number | null = null;
                        if (child.href === "/admin/contact-submissions")
                          badge = contactNew;
                        if (child.href === "/admin/get-involved-submissions")
                          badge = getInvolvedNew;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                              isActive
                                ? "border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-semibold"
                                : "text-slate-400 hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="flex-1">{child.label}</span>
                            {badge !== null && badge > 0 && (
                              <span className="text-xs bg-teal-600 text-white px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center">
                                {badge > 99 ? "99+" : badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>,
              );
            } else {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              items.push(
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400"
                      : "text-slate-300 hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>,
              );
            }

            return items;
          })}
        </nav>

        {/* User info and logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-700/50 bg-slate-900">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-teal-500/20">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {user?.name || "Admin"}
              </div>
              <div className="text-xs text-slate-400 truncate">
                {user?.email}
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
          <Link
            href="/admin/change-password"
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            <KeyRound className="w-4 h-4" />
            Change Password
          </Link>
        </div>
      </aside>
    </>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="lg:ml-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-sm">
          <div className="flex items-center justify-between px-4 h-20">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white p-3 rounded-xl hover:bg-slate-800/50 transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="lg:hidden"></div>
            <Link
              href="/"
              target="_blank"
              className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
            >
              View Site →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 md:p-8 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
