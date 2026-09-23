"use client";

import { useEffect, useState } from "react";
import { Search, RefreshCw, Eye, Mail } from "lucide-react";
import { adminFetch } from "@/lib/contexts/AdminAuthContext";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  purpose: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const PURPOSES = [
  "All",
  "General Inquiry",
  "Partnership",
  "Research Collaboration",
  "Media Request",
  "Join SEJ",
  "Report an Issue",
] as const;

const STATUSES = ["All", "new", "read", "archived"] as const;

function statusBadge(status: string) {
  if (status === "new") return "bg-amber-500/20 text-amber-400 border border-amber-500/20";
  if (status === "read") return "bg-blue-500/20 text-blue-400 border border-blue-500/20";
  if (status === "archived") return "bg-slate-500/20 text-slate-400 border border-slate-600/30";
  return "bg-slate-500/20 text-slate-400";
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [purposeFilter, setPurposeFilter] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{ total: number; pages: number } | null>(null);
  const [stats, setStats] = useState<{ total: number | null; newCount: number | null }>({
    total: null,
    newCount: null,
  });
  const limit = 10;

  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [detailSuccess, setDetailSuccess] = useState<string | null>(null);

  const fetchData = async (opts?: { pageOverride?: number }) => {
    const p = opts?.pageOverride ?? page;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", String(p));
      params.set("limit", String(limit));
      if (statusFilter !== "All") params.set("status", statusFilter);
      const res = await adminFetch(`/api/admin/contact-submissions?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load submissions");
      setSubmissions(data.submissions || []);
      setPagination(data.pagination || { total: data.submissions?.length || 0, pages: 1 });

      // fetch counts for header badges (total + new) — only if not already filtered to new?
      // Use separate lightweight calls
      try {
        const [totalRes, newRes] = await Promise.all([
          adminFetch(`/api/admin/contact-submissions?limit=1`).then((r) => (r.ok ? r.json() : null)),
          adminFetch(`/api/admin/contact-submissions?status=new&limit=1`).then((r) => (r.ok ? r.json() : null)),
        ]);
        setStats({
          total: totalRes?.pagination?.total ?? null,
          newCount: newRes?.pagination?.total ?? null,
        });
      } catch {
        // ignore stats errors
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter]);

  // reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const filtered = submissions.filter((s) => {
    if (purposeFilter !== "All" && s.purpose !== purposeFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.purpose.toLowerCase().includes(q) ||
      s.message.toLowerCase().includes(q)
    );
  });

  const openDetail = (item: ContactSubmission) => {
    setSelected(item);
    setDetailError(null);
    setDetailSuccess(null);
  };

  const updateStatus = async (newStatus: string) => {
    if (!selected) return;
    setStatusUpdating(true);
    setDetailError(null);
    setDetailSuccess(null);
    try {
      const res = await adminFetch(`/api/admin/contact-submissions/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update status");
      const updated = data.submission as ContactSubmission;
      setSelected(updated);
      // update list
      setSubmissions((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
      setDetailSuccess(`Status updated to ${newStatus}`);
      // refetch to update pagination totals
      fetchData();
    } catch (e) {
      setDetailError(e instanceof Error ? e.message : "Failed to update status");
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleRefresh = () => fetchData();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-teal-400" />
            Contact Messages
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage messages from the public contact form
          </p>
          {stats.total !== null && (
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/30">
                Total: {stats.total}
              </span>
              {stats.newCount !== null && stats.newCount > 0 && (
                <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/20">
                  New: {stats.newCount}
                </span>
              )}
            </div>
          )}
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-lg font-medium transition-colors text-sm border border-slate-700/50 disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
            placeholder="Search by name, email, purpose, message..."
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value)}
            className="px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 max-w-[180px]"
          >
            {PURPOSES.map((p) => (
              <option key={p} value={p}>
                {p === "All" ? "All Purposes" : p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-4 rounded-xl text-sm">
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-12 text-center">
          <Mail className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">
            {search || purposeFilter !== "All" || statusFilter !== "All"
              ? "No matching contact submissions found."
              : "No contact submissions yet."}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Name</th>
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Email</th>
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Purpose</th>
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Message</th>
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Submitted</th>
                    <th className="text-right text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <a href={`mailto:${item.email}`} className="text-teal-400 hover:text-teal-300 hover:underline">
                          {item.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 whitespace-nowrap">{item.purpose}</td>
                      <td className="px-6 py-4 text-sm text-slate-400 max-w-[260px] truncate" title={item.message}>
                        {item.message.slice(0, 80)}
                        {item.message.length > 80 ? "…" : ""}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => openDetail(item)}
                          className="p-2 text-slate-400 hover:text-teal-400 rounded-lg hover:bg-teal-500/10 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((item) => (
              <div key={item.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="text-sm font-medium text-white">{item.name}</div>
                    <a href={`mailto:${item.email}`} className="text-xs text-teal-400 hover:underline">
                      {item.email}
                    </a>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${statusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mb-1">{item.purpose} • {new Date(item.created_at).toLocaleDateString()}</div>
                <p className="text-sm text-slate-300 line-clamp-2 mb-3">{item.message}</p>
                <button
                  onClick={() => openDetail(item)}
                  className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> View Details
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-slate-400">
                Page {page} of {pagination.pages} • Total {pagination.total}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1.5 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-300 disabled:opacity-40 hover:bg-slate-700 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                  disabled={page >= pagination.pages}
                  className="px-3 py-1.5 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-300 disabled:opacity-40 hover:bg-slate-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-lg font-semibold text-white">Contact Message</h3>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white text-xl leading-none">×</button>
              </div>

              {detailError && (
                <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg text-sm">{detailError}</div>
              )}
              {detailSuccess && (
                <div className="mb-4 bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-2 rounded-lg text-sm">{detailSuccess}</div>
              )}

              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Name</div>
                    <div className="text-white font-medium">{selected.name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Email</div>
                    <a href={`mailto:${selected.email}`} className="text-teal-400 hover:underline break-all">
                      {selected.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Purpose</div>
                    <div className="text-white">{selected.purpose}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Status</div>
                    <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full font-medium ${statusBadge(selected.status)}`}>
                      {selected.status}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Submitted</div>
                  <div className="text-slate-300">{formatDate(selected.created_at)}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Message</div>
                  <div className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-3 text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[40vh] overflow-y-auto">
                    {selected.message}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Update Status</div>
                <div className="flex flex-wrap gap-2">
                  {(["new", "read", "archived"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(s)}
                      disabled={statusUpdating || selected.status === s}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        selected.status === s
                          ? "bg-slate-700 text-slate-400 border-slate-600 cursor-not-allowed"
                          : s === "new"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/20 hover:bg-amber-500/30"
                            : s === "read"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/20 hover:bg-blue-500/30"
                              : "bg-slate-500/20 text-slate-300 border-slate-600/30 hover:bg-slate-600/40"
                      } disabled:opacity-50`}
                    >
                      {statusUpdating ? "..." : `Mark as ${s.charAt(0).toUpperCase() + s.slice(1)}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
