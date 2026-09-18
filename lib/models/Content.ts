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
