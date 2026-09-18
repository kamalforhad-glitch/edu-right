-- =============================================
-- Supabase Storage: content-images bucket
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- Or via Supabase CLI: supabase db push
-- =============================================

-- Create bucket if not exists (public read, private write via service_role)
INSERT INTO storage.buckets (id, name, public)
VALUES ('content-images', 'content-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public read access to content-images objects
-- Drop existing policies to ensure idempotency
DROP POLICY IF EXISTS "Public read content-images" ON storage.objects;
DROP POLICY IF EXISTS "Service role full access content-images" ON storage.objects;

-- Public can read objects in content-images bucket
CREATE POLICY "Public read content-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'content-images');

-- Service role (and authenticated admins via service_role key) can insert/update/delete
-- Note: application uses service_role key server-side, so this covers admin uploads
CREATE POLICY "Service role full access content-images"
ON storage.objects FOR ALL
USING (bucket_id = 'content-images' AND auth.role() = 'service_role')
WITH CHECK (bucket_id = 'content-images' AND auth.role() = 'service_role');

-- Ensure RLS is enabled on storage.objects (default in Supabase)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
