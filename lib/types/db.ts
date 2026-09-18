export type UserRole = "admin" | "superadmin";
export type ContentType =
  | "news"
  | "event"
  | "gallery"
  | "research"
  | "advocacy"
  | "parliament"
  | "project";
export type ProjectStatus = "upcoming" | "ongoing" | "completed";

export interface DbUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbUserSafe {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbContent {
  id: string;
  type: ContentType;
  title: string;
  title_bn: string | null;
  slug: string;
  description: string;
  description_bn: string | null;
  content: string;
  content_bn: string | null;
  featured_image: string | null;
  images: string[];
  tags: string[];
  category: string | null;
  event_date: string | null;
  event_end_date: string | null;
  event_location: string | null;
  event_location_bn: string | null;
  expected_attendees: number | null;
  external_link: string | null;
  source: string | null;
  publish_date: string | null;
  status: string | null;
  is_published: boolean;
  is_featured: boolean;
  author_id: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbContentWithAuthor extends DbContent {
  author: { name: string; email: string } | null;
}

export interface ContentListResponse {
  contents: DbContentWithAuthor[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ContentStatsResponse {
  stats: {
    totalContent: number;
    publishedContent: number;
    draftContent: number;
    totalUsers: number;
    contentByType: Record<string, number>;
  };
  recentContent: DbContentWithAuthor[];
}

export const CONTENT_FIELDS = [
  "id",
  "type",
  "title",
  "title_bn",
  "slug",
  "description",
  "description_bn",
  "content",
  "content_bn",
  "featured_image",
  "images",
  "tags",
  "category",
  "event_date",
  "event_end_date",
  "event_location",
  "event_location_bn",
  "expected_attendees",
  "external_link",
  "source",
  "publish_date",
  "status",
  "is_published",
  "is_featured",
  "author_id",
  "display_order",
  "created_at",
  "updated_at",
] as const;

export const CONTENT_INSERT_FIELDS = [
  "type",
  "title",
  "title_bn",
  "slug",
  "description",
  "description_bn",
  "content",
  "content_bn",
  "featured_image",
  "images",
  "tags",
  "category",
  "event_date",
  "event_end_date",
  "event_location",
  "event_location_bn",
  "expected_attendees",
  "external_link",
  "source",
  "publish_date",
  "status",
  "is_published",
  "is_featured",
  "author_id",
  "display_order",
] as const;

export const USER_SAFE_FIELDS = [
  "id",
  "name",
  "email",
  "role",
  "is_active",
  "created_at",
  "updated_at",
] as const;

export function sanitizeContentInput(body: Record<string, unknown>) {
  const allowed = new Set(CONTENT_INSERT_FIELDS);
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(body)) {
    if (allowed.has(key as (typeof CONTENT_INSERT_FIELDS)[number])) {
      result[key] = body[key];
    }
  }
  return result;
}

export function sanitizeUserUpdate(body: Record<string, unknown>) {
  const allowed = new Set(["name", "email", "role", "is_active"]);
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(body)) {
    if (key === "password") continue;
    if (allowed.has(key)) {
      result[key] = body[key];
    }
  }
  return result;
}
