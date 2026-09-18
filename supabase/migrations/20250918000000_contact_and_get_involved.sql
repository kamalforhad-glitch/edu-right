-- =============================================
-- Edu-Right: Contact & Get Involved submissions
-- Run in Supabase SQL Editor (Dashboard → SQL Editor)
-- Also applied locally via `supabase db push` / `supabase db reset`
-- =============================================

-- Enable pgcrypto if not already enabled (for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Ensure updated_at trigger function exists (idempotent with schema.sql)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── Contact Submissions ───────────────────────────────────────────────────
-- Public contact form (/contact) fields:
--   name, email, purpose (select), message
-- Service-role only access (RLS enabled, no anon policies)

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254),
  purpose TEXT NOT NULL CHECK (purpose IN (
    'General Inquiry',
    'Partnership',
    'Research Collaboration',
    'Media Request',
    'Join ERP',
    'Report an Issue'
  )),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 5000),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS set_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER set_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email
  ON contact_submissions(email);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status
  ON contact_submissions(status);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_purpose
  ON contact_submissions(purpose);

-- RLS: enable and restrict to service_role (bypasses RLS). No anon/authenticated policies.
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Ensure no permissive policies leak data (idempotent drops)
DROP POLICY IF EXISTS "Allow anon insert contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anon select contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated select contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Service role full access contact_submissions" ON contact_submissions;
-- Optional explicit service_role policy (service_role bypasses RLS anyway, but documents intent)
CREATE POLICY "Service role full access contact_submissions"
ON contact_submissions FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Grant table privileges to service_role (required even though it bypasses RLS; without GRANT, 42501 permission denied)
GRANT ALL ON TABLE contact_submissions TO service_role;

-- ─── Get Involved Submissions ──────────────────────────────────────────────
-- Share Your Voice form (/get-involved) fields:
--   name, email, topic_area (select), message
-- Service-role only access (RLS enabled, no anon policies)

CREATE TABLE IF NOT EXISTS get_involved_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254),
  topic_area TEXT NOT NULL CHECK (topic_area IN (
    'Access & Equity',
    'Quality & Learning',
    'Budget & Financing',
    'Teacher Development',
    'Digital Learning',
    'Other'
  )),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 10000),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS set_get_involved_submissions_updated_at ON get_involved_submissions;
CREATE TRIGGER set_get_involved_submissions_updated_at
  BEFORE UPDATE ON get_involved_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_get_involved_submissions_created_at
  ON get_involved_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_get_involved_submissions_email
  ON get_involved_submissions(email);

CREATE INDEX IF NOT EXISTS idx_get_involved_submissions_status
  ON get_involved_submissions(status);

CREATE INDEX IF NOT EXISTS idx_get_involved_submissions_topic_area
  ON get_involved_submissions(topic_area);

ALTER TABLE get_involved_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anon insert get_involved_submissions" ON get_involved_submissions;
DROP POLICY IF EXISTS "Allow anon select get_involved_submissions" ON get_involved_submissions;
DROP POLICY IF EXISTS "Allow authenticated select get_involved_submissions" ON get_involved_submissions;
DROP POLICY IF EXISTS "Service role full access get_involved_submissions" ON get_involved_submissions;
CREATE POLICY "Service role full access get_involved_submissions"
ON get_involved_submissions FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Grant table privileges to service_role (required even though it bypasses RLS)
GRANT ALL ON TABLE get_involved_submissions TO service_role;

-- ─── Verification (optional) ───────────────────────────────────────────────
-- SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename IN ('contact_submissions','get_involved_submissions');
-- SELECT polname, polcmd FROM pg_policies WHERE tablename IN ('contact_submissions','get_involved_submissions');
