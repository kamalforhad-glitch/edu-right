-- =============================================
-- Edu-Right: MongoDB → Supabase PostgreSQL Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- =============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── updated_at trigger function ──────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── Users Table ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ─── Content Table ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('news', 'event', 'gallery', 'research', 'advocacy', 'parliament', 'project')),
  title TEXT NOT NULL,
  title_bn TEXT,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  description_bn TEXT,
  content TEXT DEFAULT '',
  content_bn TEXT,
  featured_image TEXT,
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  event_date TIMESTAMPTZ,
  event_end_date TIMESTAMPTZ,
  event_location TEXT,
  event_location_bn TEXT,
  expected_attendees INTEGER,
  external_link TEXT,
  source TEXT,
  publish_date TIMESTAMPTZ,
  status TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_content_updated_at
  BEFORE UPDATE ON content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ─── Indexes ──────────────────────────────────────────────────────────────────

-- Content listing: type + published + created_at (most common query)
CREATE INDEX IF NOT EXISTS idx_content_type_published_created
  ON content(type, is_published, created_at DESC);

-- Slug lookup (unique already enforced by UNIQUE constraint)
CREATE INDEX IF NOT EXISTS idx_content_slug
  ON content(slug);

-- Author lookups
CREATE INDEX IF NOT EXISTS idx_content_author
  ON content(author_id);

-- Featured content
CREATE INDEX IF NOT EXISTS idx_content_featured
  ON content(is_featured) WHERE is_featured = true;

-- User email lookup (unique already enforced by UNIQUE constraint)
CREATE INDEX IF NOT EXISTS idx_users_email
  ON users(email);
