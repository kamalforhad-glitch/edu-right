# SEJ Edu-Right — Backup & Storage Runbook

## 1. Database backups (Supabase Postgres)

| Item | Status / Action |
|---|---|
| Provider backups | Supabase automatically backs up project databases daily (retention depends on plan). **Verify in Dashboard → Database → Backups** that the latest backup is green before launch. |
| Point-in-time recovery (PITR) | Available on Pro+ plans. Confirm PITR is enabled for production; note the recovery window. |
| Schema in code | `supabase/migrations/` is the source of truth: `20250918…` (submissions), `20250919…` (grants fix), `20250920…` (core `users` + `content` schema, idempotent). A fresh project recreates structure with `supabase db push`. |
| Pre-deploy snapshot | Before any migration, take a manual backup (Dashboard → Database → Backups → Take backup) and record its timestamp below. |
| Recovery drill | Quarterly: restore the latest backup to a **staging** project and run `npm run build` + smoke test. |

Manual backup log:

| Date | Taken by | Backup ref | Restored to staging? |
|---|---|---|---|
| _YYYY-MM-DD_ | _name_ | _ref_ | _yes/no_ |

## 2. Media storage (`content-images` bucket)

| Item | Required setting |
|---|---|
| Bucket | `content-images`, **Public** (read) |
| File limit | 10 MB (must match `MAX_FILE_SIZE` in `app/api/upload/route.ts`) |
| Allowed MIME | `image/jpeg`, `image/png`, `image/gif`, `image/webp` (also magic-byte verified server-side) |
| Policies | Public `SELECT` on `bucket_id = 'content-images'`; **no** public `INSERT`/`UPDATE`/`DELETE`. Writes go only through `POST /api/upload`, which requires admin JWT (`requireAdmin`), per-user rate limiting, and service-role key server-side. |
| Filenames | Server-generated `content/<uuid>.<ext>` — no client-controlled paths (no traversal / overwrite). |
| Backup | Storage objects are included in Supabase project backups. For extra safety, mirror the bucket monthly (`supabase storage` CLI or dashboard download) and keep one offline copy. |

Verify with:

```sql
-- RLS is on and only service-role policies exist
select tablename, rowsecurity from pg_tables
where schemaname = 'public'
  and tablename in ('users', 'content', 'contact_submissions', 'get_involved_submissions');
```

## 3. Admin recovery process

1. If all admins are locked out: run `npx tsx scripts/seed-admin.ts` with `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and a **strong** `DEFAULT_ADMIN_PASSWORD` (≥10 chars, upper + lower + number — enforced by the script).
2. The script refuses to overwrite an existing admin; to rotate a compromised account, delete it in the dashboard first, then re-seed.
3. First-login flow: `/api/auth/setup` self-disables (403) once any user exists; instrumentation auto-seed skips weak passwords with a logged warning.
4. After recovery: rotate `JWT_SECRET` (invalidates all sessions) and review `/admin/users`.

## 4. Error handling coverage

| Layer | Behavior |
|---|---|
| 404 | `app/not-found.tsx` — bilingual, branded, home + back buttons. |
| Route crash | `app/error.tsx` — bilingual, retry (`reset()`) + home; logs message to console only, never renders internals. |
| Root layout crash | `app/global-error.tsx` — self-contained, bilingual, no providers/imports. |
| API failure | All routes return `{ error }` JSON with safe messages + `Cache-Control: private, no-store`; frontend shows empty states / inline alerts, never stack traces. |
