-- =============================================
-- Fix: Grant table privileges to service_role
-- Existing tables created via 20250918000000 were missing GRANT,
-- causing 42501 permission denied even for service_role (bypasses RLS but still needs GRANT)
-- Run this in Supabase SQL Editor if tables already exist.
-- Idempotent.
-- =============================================

GRANT ALL ON TABLE contact_submissions TO service_role;
GRANT ALL ON TABLE get_involved_submissions TO service_role;

-- Optional verification:
-- SELECT grantee, privilege_type FROM information_schema.role_table_grants
-- WHERE table_name IN ('contact_submissions','get_involved_submissions') AND grantee='service_role';
