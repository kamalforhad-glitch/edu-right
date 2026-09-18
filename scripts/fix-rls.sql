-- =============================================
-- Fix RLS policies for migration
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- =============================================

-- Disable RLS on users table (or add policies for service role)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Disable RLS on content table
ALTER TABLE public.content DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('users', 'content');