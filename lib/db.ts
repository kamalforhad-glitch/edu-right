import { supabase } from "@/lib/supabase";
import type {
  DbUser,
  DbUserSafe,
  DbContentWithAuthor,
  ContentListResponse,
  ContentStatsResponse,
  UserRole,
  ContentType,
  DbContactSubmission,
  DbGetInvolvedSubmission,
  ContactPurpose,
  GetInvolvedTopicArea,
} from "@/lib/types/db";

// ─── User Operations ──────────────────────────────────────────────────────────

export async function findUserByEmailWithPassword(
  email: string,
): Promise<DbUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email.toLowerCase().trim())
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return data as DbUser;
}

export async function findUserByEmail(
  email: string,
): Promise<DbUserSafe | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, role, is_active, created_at, updated_at")
    .eq("email", email.toLowerCase().trim())
    .single();

  if (error || !data) return null;
  return data as DbUserSafe;
}

export async function countUsers(): Promise<number> {
  const { count, error } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count ?? 0;
}

export async function countActiveUsers(): Promise<number> {
  const { count, error } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  if (error) throw error;
  return count ?? 0;
}

export async function createUser(data: {
  name: string;
  email: string;
  password_hash: string;
  role?: UserRole;
  is_active?: boolean;
}): Promise<DbUserSafe> {
  const { data: user, error } = await supabase
    .from("users")
    .insert({
      name: data.name,
      email: data.email.toLowerCase().trim(),
      password_hash: data.password_hash,
      role: data.role ?? "admin",
      is_active: data.is_active ?? true,
    })
    .select("id, name, email, role, is_active, created_at, updated_at")
    .single();

  if (error) throw error;
  return user as DbUserSafe;
}

export async function getUsers(): Promise<DbUserSafe[]> {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, role, is_active, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as DbUserSafe[];
}

export async function getUserById(
  id: string,
): Promise<DbUserSafe | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, role, is_active, created_at, updated_at")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as DbUserSafe;
}

export async function updateUser(
  id: string,
  updates: Record<string, unknown>,
): Promise<DbUserSafe | null> {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select("id, name, email, role, is_active, created_at, updated_at")
    .maybeSingle();

  if (error) throw error;
  return data as DbUserSafe;
}

export async function getUserByIdWithPassword(
  id: string,
): Promise<DbUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as DbUser;
}

export async function updateUserPassword(
  id: string,
  password_hash: string,
): Promise<DbUserSafe | null> {
  const { data, error } = await supabase
    .from("users")
    .update({ password_hash })
    .eq("id", id)
    .eq("is_active", true)
    .select("id, name, email, role, is_active, created_at, updated_at")
    .maybeSingle();

  if (error) throw error;
  return data as DbUserSafe;
}

export async function deleteUser(id: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export async function userHasContent(userId: string): Promise<boolean> {
  const { count, error } = await supabase
    .from("content")
    .select("*", { count: "exact", head: true })
    .eq("author_id", userId);

  if (error) throw error;
  return (count ?? 0) > 0;
}

// ─── Content Operations ───────────────────────────────────────────────────────

function contentSelectWithAuthor() {
  return `
    id, type, title, title_bn, slug, description, description_bn,
    content, content_bn, featured_image, images, tags, category,
    event_date, event_end_date, event_location, event_location_bn,
    expected_attendees, external_link, source, publish_date, status,
    is_published, is_featured, author_id, display_order,
    created_at, updated_at,
    author:users!author_id(name, email)
  `;
}

function shapeContentWithAuthor(
  raw: Record<string, unknown>[],
): DbContentWithAuthor[] {
  return raw.map((row) => {
    const authorRaw = row.author;
    let author: { name: string; email: string } | null = null;
    if (
      authorRaw &&
      typeof authorRaw === "object" &&
      !Array.isArray(authorRaw)
    ) {
      const a = authorRaw as Record<string, unknown>;
      if (typeof a.name === "string" && typeof a.email === "string") {
        author = { name: a.name, email: a.email };
      }
    }
    const { author: _author, ...rest } = row;
    void _author;
    return { ...rest, author } as DbContentWithAuthor;
  });
}

export async function listContent(params: {
  type?: string;
  published?: string;
  featured?: string;
  page?: number;
  limit?: number;
  isAuthenticated?: boolean;
}): Promise<ContentListResponse> {
  const {
    type,
    published,
    featured,
    page = 1,
    limit = 20,
    isAuthenticated = false,
  } = params;
  const skip = (page - 1) * limit;

  let query = supabase.from("content").select(
    contentSelectWithAuthor(),
    { count: "exact" },
  );

  if (type) {
    query = query.eq("type", type);
  }

  if (published === "true") {
    query = query.eq("is_published", true);
  } else if (published === "false") {
    query = query.eq("is_published", false);
  } else if (!isAuthenticated) {
    query = query.eq("is_published", true);
  }

  if (featured === "true") {
    query = query.eq("is_featured", true);
  }

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(skip, skip + limit - 1);

  if (error) throw error;

  const contents = shapeContentWithAuthor((data ?? []) as unknown as Record<string, unknown>[]);
  const total = count ?? 0;

  return {
    contents,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getContentById(
  id: string,
): Promise<DbContentWithAuthor | null> {
  const { data, error } = await supabase
    .from("content")
    .select(contentSelectWithAuthor())
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return shapeContentWithAuthor([data as unknown as Record<string, unknown>])[0] ?? null;
}

export async function createContent(data: {
  type: ContentType;
  title: string;
  title_bn?: string;
  slug: string;
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
}): Promise<DbContentWithAuthor> {
  const { data: created, error } = await supabase
    .from("content")
    .insert(data)
    .select(contentSelectWithAuthor())
    .single();

  if (error) throw error;
  return shapeContentWithAuthor([created as unknown as Record<string, unknown>])[0];
}

export async function updateContent(
  id: string,
  updates: Record<string, unknown>,
): Promise<DbContentWithAuthor | null> {
  const { data, error } = await supabase
    .from("content")
    .update(updates)
    .eq("id", id)
    .select(contentSelectWithAuthor())
    .maybeSingle();

  if (error) throw error;
  return shapeContentWithAuthor([data as unknown as Record<string, unknown>])[0] ?? null;
}

export async function deleteContent(id: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("content")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export async function countContent(
  filters?: Record<string, unknown>,
): Promise<number> {
  let query = supabase
    .from("content")
    .select("*", { count: "exact", head: true });

  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }
  }

  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

export async function getRecentContent(
  limit = 5,
): Promise<DbContentWithAuthor[]> {
  const { data, error } = await supabase
    .from("content")
    .select(contentSelectWithAuthor())
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return shapeContentWithAuthor((data ?? []) as unknown as Record<string, unknown>[]);
}

export async function getContentByType(): Promise<
  { type: string; count: number }[]
> {
  const { data, error } = await supabase
    .from("content")
    .select("type");

  if (error) throw error;

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.type] = (counts[row.type] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getContentStats(): Promise<ContentStatsResponse> {
  const [totalContent, publishedContent, draftContent, totalUsers, typeCounts, recentContent] =
    await Promise.all([
      countContent(),
      countContent({ is_published: true }),
      countContent({ is_published: false }),
      countActiveUsers(),
      getContentByType(),
      getRecentContent(5),
    ]);

  const contentByType: Record<string, number> = {};
  for (const { type, count } of typeCounts) {
    contentByType[type] = count;
  }

  return {
    stats: {
      totalContent,
      publishedContent,
      draftContent,
      totalUsers,
      contentByType,
    },
    recentContent,
  };
}

// ─── Contact Submissions ────────────────────────────────────────────────────

export async function createContactSubmission(data: {
  name: string;
  email: string;
  purpose: ContactPurpose;
  message: string;
}): Promise<DbContactSubmission> {
  const { data: row, error } = await supabase
    .from("contact_submissions")
    .insert({
      name: data.name,
      email: data.email,
      purpose: data.purpose,
      message: data.message,
    })
    .select("id, name, email, purpose, message, status, created_at, updated_at")
    .single();

  if (error) throw error;
  return row as DbContactSubmission;
}

export async function listContactSubmissions(params: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<{ submissions: DbContactSubmission[]; total: number }> {
  const { page = 1, limit = 20, status } = params;
  const skip = (page - 1) * limit;
  let query = supabase
    .from("contact_submissions")
    .select("id, name, email, purpose, message, status, created_at, updated_at", {
      count: "exact",
    });

  if (status) query = query.eq("status", status);

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(skip, skip + limit - 1);

  if (error) throw error;
  return { submissions: (data ?? []) as DbContactSubmission[], total: count ?? 0 };
}

export async function getContactSubmissionById(id: string): Promise<DbContactSubmission | null> {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("id, name, email, purpose, message, status, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return data as DbContactSubmission;
}

export async function updateContactSubmissionStatus(
  id: string,
  status: string,
): Promise<DbContactSubmission | null> {
  const { data, error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id)
    .select("id, name, email, purpose, message, status, created_at, updated_at")
    .maybeSingle();
  if (error) throw error;
  return (data as DbContactSubmission) ?? null;
}

// ─── Get Involved Submissions ───────────────────────────────────────────────

export async function createGetInvolvedSubmission(data: {
  name: string;
  email: string;
  topic_area: GetInvolvedTopicArea;
  message: string;
}): Promise<DbGetInvolvedSubmission> {
  const { data: row, error } = await supabase
    .from("get_involved_submissions")
    .insert({
      name: data.name,
      email: data.email,
      topic_area: data.topic_area,
      message: data.message,
    })
    .select("id, name, email, topic_area, message, status, created_at, updated_at")
    .single();

  if (error) throw error;
  return row as DbGetInvolvedSubmission;
}

export async function listGetInvolvedSubmissions(params: {
  page?: number;
  limit?: number;
  status?: string;
  topic_area?: string;
}): Promise<{ submissions: DbGetInvolvedSubmission[]; total: number }> {
  const { page = 1, limit = 20, status, topic_area } = params;
  const skip = (page - 1) * limit;
  let query = supabase
    .from("get_involved_submissions")
    .select("id, name, email, topic_area, message, status, created_at, updated_at", {
      count: "exact",
    });

  if (status) query = query.eq("status", status);
  if (topic_area) query = query.eq("topic_area", topic_area);

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(skip, skip + limit - 1);

  if (error) throw error;
  return { submissions: (data ?? []) as DbGetInvolvedSubmission[], total: count ?? 0 };
}

export async function getGetInvolvedSubmissionById(
  id: string,
): Promise<DbGetInvolvedSubmission | null> {
  const { data, error } = await supabase
    .from("get_involved_submissions")
    .select("id, name, email, topic_area, message, status, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return data as DbGetInvolvedSubmission;
}

export async function updateGetInvolvedSubmissionStatus(
  id: string,
  status: string,
): Promise<DbGetInvolvedSubmission | null> {
  const { data, error } = await supabase
    .from("get_involved_submissions")
    .update({ status })
    .eq("id", id)
    .select("id, name, email, topic_area, message, status, created_at, updated_at")
    .maybeSingle();
  if (error) throw error;
  return (data as DbGetInvolvedSubmission) ?? null;
}
