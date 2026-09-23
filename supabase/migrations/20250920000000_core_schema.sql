-- =============================================
-- SEJ Edu-Right: Core schema (users + content)
-- DOCUMENTATION / REPRODUCIBILITY migration.
--
-- The production database already contains these tables (created during
-- initial setup). This file records the exact structure the application
-- code expects (see lib/types/db.ts, lib/db.ts, lib/models/*) so that a
-- fresh environment can recreate them. Every statement is idempotent
-- (IF NOT EXISTS / DO blocks) and modifies NO existing data.
--
-- Apply with: supabase db push  (safe to run against production)
-- =============================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Reuse the shared updated_at trigger (created in earlier migrations).
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── Users ───────────────────────────────────────────────────────────
-- Admin accounts. Passwords are bcrypt hashes (cost 12); the app NEVER
-- stores plaintext. Roles: 'admin' | 'superadmin'.

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email TEXT NOT NULL UNIQUE CHECK (char_length(email) BETWEEN 5 AND 254),
  password_hash TEXT NOT NULL CHECK (char_length(password_hash) BETWEEN 1 AND 255),
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at DESC);

DROP TRIGGER IF EXISTS set_users_updated_at ON users;
CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Service-role-only access: all reads/writes go through the Next.js API
-- (which enforces JWT auth + bcrypt + rate limits). No anon policies.
DROP POLICY IF EXISTS "Service role full access users" ON users;
CREATE POLICY "Service role full access users"
ON users FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

GRANT ALL ON TABLE users TO service_role;

-- ─── Content ─────────────────────────────────────────────────────────
-- All CMS items (news, event, gallery, research, advocacy, parliament,
-- project). Bilingual fields (*_bn) are nullable; the frontend falls back
-- to English when Bangla is absent. Length limits mirror lib/validation.ts.

CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('news', 'event', 'gallery', 'research', 'advocacy', 'parliament', 'project')),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 300),
  title_bn TEXT CHECK (title_bn IS NULL OR char_length(title_bn) BETWEEN 1 AND 300),
  slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 1 AND 5000),
  description_bn TEXT CHECK (description_bn IS NULL OR char_length(description_bn) BETWEEN 1 AND 5000),
  content TEXT NOT NULL DEFAULT '' CHECK (char_length(content) <= 100000),
  content_bn TEXT CHECK (content_bn IS NULL OR char_length(content_bn) <= 100000),
  featured_image TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  category TEXT CHECK (category IS NULL OR char_length(category) BETWEEN 1 AND 100),
  event_date DATE,
  event_end_date DATE,
  event_location TEXT CHECK (event_location IS NULL OR char_length(event_location) BETWEEN 1 AND 300),
  event_location_bn TEXT CHECK (event_location_bn IS NULL OR char_length(event_location_bn) BETWEEN 1 AND 300),
  expected_attendees INTEGER CHECK (expected_attendees IS NULL OR (expected_attendees >= 0 AND expected_attendees <= 1000000000)),
  external_link TEXT,
  source TEXT,
  publish_date DATE,
  status TEXT CHECK (status IS NULL OR status IN ('upcoming', 'ongoing', 'completed')),
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  author_id UUID NOT NULL REFERENCES users (id),
  display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for the app's hot query paths (see lib/db.ts listContent):
-- filter by type + is_published + is_featured, order by created_at DESC.
CREATE INDEX IF NOT EXISTS idx_content_type ON content (type);
CREATE INDEX IF NOT EXISTS idx_content_published ON content (is_published);
CREATE INDEX IF NOT EXISTS idx_content_featured ON content (is_featured);
CREATE INDEX IF NOT EXISTS idx_content_created_at ON content (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_type_published_created
  ON content (type, is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_slug ON content (slug);

DROP TRIGGER IF EXISTS set_content_updated_at ON content;
CREATE TRIGGER set_content_updated_at
  BEFORE UPDATE ON content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Service-role-only access: public reads go through GET /api/content,
-- which forces is_published = true for unauthenticated callers.
DROP POLICY IF EXISTS "Service role full access content" ON content;
CREATE POLICY "Service role full access content"
ON content FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

GRANT ALL ON TABLE content TO service_role;

-- ─── Storage: content-images bucket ──────────────────────────────────
-- Managed via Dashboard → Storage. Required configuration:
--   Bucket: content-images, PUBLIC (read), 10 MB file limit,
--   allowed MIME: image/jpeg, image/png, image/gif, image/webp.
-- The API additionally verifies magic bytes server-side.
--
-- Required storage policies (Storage → Policies → content-images):
--   1. Public read:  CREATE POLICY "Public read content-images"
--      ON storage.objects FOR SELECT USING (bucket_id = 'content-images');
--   2. NO public INSERT/UPDATE/DELETE policies — uploads go through
--      POST /api/upload (requireAdmin + rate limit) using the service key.
-- Catalogued here for auditability; apply in the Dashboard if missing.

-- Verify with:
--   SELECT tablename FROM pg_tables WHERE schemaname = 'public'
--     AND tablename IN ('users', 'content', 'contact_submissions', 'get_involved_submissions');
