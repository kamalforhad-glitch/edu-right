import {
  listContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  countContent,
  getRecentContent,
  getContentStats,
} from "@/lib/db";
import type { ContentType } from "@/lib/types/db";

export type { ContentType };

// ─── Public serialization ─────────────────────────────────────────────
// The database and admin panel use snake_case field names, while the public
// page-clients read camelCase aliases (featuredImage, eventDate, …). To keep
// both working, public API responses include camelCase aliases ALONGSIDE the
// original snake_case keys — no existing consumer breaks, and previously
// invisible fields (images, dates, locations, links) render correctly.
// Only aliases actually consumed by a frontend are mapped, keeping the
// per-row payload overhead minimal (~0.4 KB on a fully-populated row).
// Internal-only columns (author_id, display_order, updated_at) stay
// snake_case-only; the nested `author` object is passed through untouched.
const CAMEL_CASE_ALIASES: Record<string, string> = {
  title_bn: "titleBn",
  description_bn: "descriptionBn",
  content_bn: "contentBn",
  featured_image: "featuredImage",
  event_date: "eventDate",
  event_location: "eventLocation",
  expected_attendees: "expectedAttendees",
  external_link: "externalLink",
  publish_date: "publishDate",
  is_published: "isPublished",
  is_featured: "isFeatured",
  created_at: "createdAt",
};

export function toPublicContent<T extends object>(item: T): T {
  const out: Record<string, unknown> = { ...(item as Record<string, unknown>) };
  for (const [snake, camel] of Object.entries(CAMEL_CASE_ALIASES)) {
    if (snake in out && !(camel in out)) {
      out[camel] = out[snake];
    }
  }
  return out as T;
}

export interface IContent {
  id: string;
  type: ContentType;
  title: string;
  title_bn?: string;
  slug: string;
  description: string;
  description_bn?: string;
  content: string;
  content_bn?: string;
  featured_image?: string;
  images?: string[];
  tags?: string[];
  category?: string;
  event_date?: string;
  event_end_date?: string;
  event_location?: string;
  event_location_bn?: string;
  expected_attendees?: number;
  external_link?: string;
  source?: string;
  publish_date?: string;
  status?: string;
  is_published: boolean;
  is_featured: boolean;
  author_id: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  author?: { name: string; email: string } | null;
}

export function generateSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now()
  );
}

export async function listContentItems(params: {
  type?: string;
  published?: string;
  featured?: string;
  page?: number;
  limit?: number;
  isAuthenticated?: boolean;
}) {
  return listContent(params);
}

export async function getContentItem(id: string) {
  return getContentById(id);
}

export async function createContentItem(data: {
  type: ContentType;
  title: string;
  title_bn?: string;
  slug?: string;
  description: string;
  description_bn?: string;
  content?: string;
  content_bn?: string;
  featured_image?: string;
  images?: string[];
  tags?: string[];
  category?: string;
  event_date?: string;
  event_end_date?: string;
  event_location?: string;
  event_location_bn?: string;
  expected_attendees?: number;
  external_link?: string;
  source?: string;
  publish_date?: string;
  status?: string;
  is_published?: boolean;
  is_featured?: boolean;
  author_id: string;
  display_order?: number;
}) {
  const slug = data.slug || generateSlug(data.title);
  return createContent({ ...data, slug });
}

export async function updateContentItem(
  id: string,
  updates: Record<string, unknown>,
) {
  return updateContent(id, updates);
}

export async function deleteContentItem(id: string) {
  return deleteContent(id);
}

export async function countContentItems(
  filters?: Record<string, unknown>,
): Promise<number> {
  return countContent(filters);
}

export async function getRecentContentItems(limit = 5) {
  return getRecentContent(limit);
}

export async function getContentStatsData() {
  return getContentStats();
}
