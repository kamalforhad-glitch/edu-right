# VERCEL BUILD FIX REPORT

**Task:** diagnose and resolve the reported Vercel production build failure
(`Can't resolve '@vercel/turbopack-next/internal/font/google/font'` /
`next/font/google queries have exactly one entry`), and document the separate
Vercel deployment block ("commit author lacks contributing access").

**Scope guardrails honored:** no `git push` / `git commit` / deploy, no git
history, author, email or repo-visibility changes, no Next.js or dependency
version changes, no environment / routing / domain changes, `FAVICON_FIX_REPORT.md`
and all favicon + metadata work left untouched.

---

## 1. Verdict (short)

| Question | Answer |
|---|---|
| Does current source still trigger the Google Fonts / Turbopack error? | **No.** `next/font/google` was removed in commit `36d4071` (already pushed); a fresh-clone `npm ci` + `npm run build` succeeds locally (exit 0). |
| Is a source change required to fix the reported build error? | **No** for the font error itself — the fix is already on `origin/main`. |
| What is required on Vercel? | **Clear the build cache and redeploy `main`** (stale `.next/cache` from a pre-fix build and/or a failed attempt of an older commit is the only mechanism left that reproduces the exact error). |
| Why are new deployments blocked? | Separate identity/permission issue: *"The Deployment was blocked because the commit author does not have contributing access to the project on Vercel."* — fixed in the Vercel dashboard/account (section 8). |
| Code changed in this task | **2 lines in `app/globals.css`** — not for the build error; it restores Bengali body typography that was silently broken (section 6). |

---

## 2. Reported error → root cause

### 2.1 What the error actually is

`@vercel/turbopack-next/internal/font/google/font` is an **internal Turbopack
module that only exists while `next/font/google` is in use**. Turbopack rewrites
every Google Font request into
`url(@vercel/turbopack-next/internal/font/google/font?<query>)`. Two symptoms
appear together when the *CSS side* (from build cache or an older build) still
references that module while the *query registry* (built from current source)
contains no Google-font query:

* `Can't resolve '@vercel/turbopack-next/internal/font/google/font'`
* `next/font/google queries have exactly one entry` (internal assertion)

### 2.2 Evidence that current source cannot produce it

| Check | Result |
|---|---|
| `git grep -n 'next/font/google' <current files>` | only **comments**: `app/layout.tsx:35` ("pixel-identical to next/font/google") and `app/globals.css:9` |
| `git grep 'next/font/google' f9fd600 -- '*.ts' '*.tsx' '*.css'` | same two comments only |
| `git grep 'next/font/google' 36d4071^ -- '*.ts' '*.tsx'` | **`app/layout.tsx:3`: `import { Geist, Geist_Mono, Noto_Sans_Bengali, Noto_Serif_Bengali, Source_Serif_4 } from "next/font/google";`** ← the code that produced the error |
| `git grep '@vercel/turbopack-next'` (project source) | no matches |
| Font stack today | `app/layout.tsx` uses `next/font/local` only (`geistSans`, `geistMono` from `app/fonts/*.woff2`); `app/globals.css:17-61` self-hosts Noto Sans Bengali / Noto Serif Bengali / Source Serif 4 from `public/fonts/*.woff2` (all 5 files present) |
| Node/npm versions | `next` locked at **16.3.6** in both `package.json` (`^16.3.6`) and `package-lock.json` (resolved `16.3.6`); local `node_modules/next` = 16.3.6 — no version drift |

### 2.3 Git / remote facts

```
HEAD        = f9fd600  Fix SEJ website favicon and metadata
origin/main = f9fd600  (identical, 0 unpushed commits)
history     = f9fd600 → 27edb9d → 36d4071 (font fix) → 6f8c830 → …
remote      = https://github.com/kamalforhad-glitch/edu-right.git  (default branch: main)
```
* `36d4071` "Fix self-hosted Bengali fonts for Vercel Turbopack" is an **ancestor of `origin/main`** (verified with `git merge-base --is-ancestor`).
* Only one remote branch exists (`origin/main`).
* Repository visibility: **public** (GitHub API `repos/kamalforhad-glitch/edu-right` → `visibility=public`).
* Commit authors on all recent commits: `Lotus Tanvir <itanvirul446@gmail.com>`; local `git config user.email` matches.

### 2.4 What the live site proves about Vercel's build state

`https://www.sejbd.org/` (fetched during this task):

| Observation | Meaning |
|---|---|
| Font files referenced as `/_next/static/immutable/media/geist_latin_400-s.p.*.woff2` … (7 files) | deployment **already includes `36d4071`** (`next/font/local`) |
| `fonts.googleapis.com` / `fonts.gstatic.com` occurrences: **0** | the deployed build is **not** using Google Fonts |
| Icon links: `shortcut icon /sej_logo.jpeg`, `icon /favicon.ico?favicon.0fktufg3shbf9.ico`, `icon /sej_logo.jpeg`, `apple-touch-icon /sej_logo.jpeg` | deployment is **before** `f9fd600` (old favicon) |

→ The last **successful** Vercel build is `27edb9d` (post-font-fix,
pre-favicon-fix). So either (a) the reported font error came from build attempts
of commits **older than `36d4071`**, or (b) an attempt of a newer commit replayed
**stale `.next/cache`** from a pre-fix build (which still references the removed
Google-font module → exactly both reported symptoms).

### 2.5 Root cause statement

**Root cause:** the error belongs to Google-Font code that was removed from this
repository by commit `36d4071` and is now only replayed by Vercel-side state —
a stale build cache (`.next/cache`) restored from a pre-fix build, and/or a build
attempted from a pre-fix commit. Current `origin/main` builds cleanly from a
pristine install (section 3), so **no source change is needed for this error.**

---

## 3. Build verification (all commands actually run)

### 3.1 In the project (working tree, after the change in section 5)

| Command | Result |
|---|---|
| `npx tsc --noEmit` | **exit 0** |
| `npm run lint` | **exit 0** — 0 errors, 3 **pre-existing** warnings in `components/admin/ContentEditor.tsx:86`, `components/admin/ContentList.tsx:44,177` (unchanged by this task) |
| `npm run build` | **exit 0** (route table emitted incl. `/favicon.ico`, `/icon.png`, `/apple-icon.png`) |

### 3.2 Clean-room Vercel simulation (fresh install, outside the repo)

Procedure (closest available equivalent of a Vercel build):

1. Copy of the repo **excluding** `node_modules`, `.next`, `.git`, `.kilo`, `out` → 214 files.
2. `npm ci --no-audit --no-fund` → `added 380 packages in 24s`, **exit 0**.
3. `npm run build` → **exit 0**.
4. After syncing the section-5 CSS fix into the clean room: `npm run build` again → **exit 0**.
5. Built CSS scan: `--font-inter` occurrences in `/.next/static/**/*.css` = **0**; the Bengali rule is emitted valid:
   `:lang(bn),[lang=bn] body{font-family:var(--font-noto-bengali),var(--font-geist-sans),Arial,Helvetica,sans-serif;…}`

**Clean-room conclusion:** a fresh clone + fresh dependency install + production
build succeeds with the final tree → the reported failure is not reproducible
from source, confirming the Vercel-side diagnosis.

---

## 4. Font-rendering verification (headless browser)

### Before the CSS fix (clean-room build, `next start` on port 3101)

* Bengali `<p>` computed `font-family` = `geistSans, "geistSans Fallback", Arial, Helvetica, sans-serif`
  → **not** Noto Sans Bengali.
* Pixel comparison of the same paragraph (SHA-1 of element screenshot):
  * current rendering `aa3cde043d11ceb3`
  * forced `"Noto Sans Bengali"` `e26399fcf01eed99` → **different ⇒ body Bengali text was not using the webfont**
* `document.fonts`: `Noto Sans Bengali`, `Noto Serif Bengali` (×2 subsets), `Source Serif 4` all `loaded`
* Network: `/fonts/source-serif-4-latin.woff2`, `/fonts/noto-serif-bengali-bengali.woff2`,
  `/fonts/noto-serif-bengali-latin.woff2` → **200** (headings were using Noto Serif Bengali correctly)
* `fonts.gstatic.com` / `fonts.googleapis.com` requests: **0**
* `http://localhost:3101/fonts/noto-sans-bengali-bengali.woff2` → **200, 107720 B, `font/woff2`**
* Console errors: **0**; failed requests: **0**

### After the CSS fix (project build, `next start` on port 3102)

| Check | Result |
|---|---|
| Bengali `<p>` computed `font-family` | `"Noto Sans Bengali", "Noto Sans", Arial, sans-serif, geistSans, "geistSans Fallback"…` ✅ |
| Pixel equality: baseline vs forced `"Noto Sans Bengali"` | **identical** (`dc6451d2fc4cf8ef` == `dc6451d2fc4cf8ef`) ✅ |
| English mode (`localStorage.language = en`) | `geistSans, "geistSans Fallback", Arial, Helvetica, sans-serif` — **unchanged** ✅ |
| `<html lang>` switches | `bn` ⇄ `en` handled by the app as before |
| Loaded font families | `geistSans`, `geistSans Fallback`, `Noto Sans Bengali`, `Noto Serif Bengali`, `Source Serif 4` ✅ |
| External font hosts requested | **none** (0 × `gstatic`/`googleapis`) ✅ |
| Console errors / failed requests | **0 / 0** ✅ |

Bengali font **files were not removed, renamed or re-encoded** — only a CSS
declaration was corrected; `public/fonts/*` and `app/fonts/*` are byte-identical.

---

## 5. Files changed in this task

Exactly one file, two lines (removal of a dangling CSS variable):

```diff
--- a/app/globals.css
+++ b/app/globals.css
@@ body
-  font-family: var(--font-inter), var(--font-geist-sans), Arial, Helvetica, sans-serif;
+  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
@@ :lang(bn), [lang="bn"] body
-  font-family: var(--font-noto-bengali), var(--font-inter), var(--font-geist-sans), Arial, Helvetica, sans-serif;
+  font-family: var(--font-noto-bengali), var(--font-geist-sans), Arial, Helvetica, sans-serif;
```

`git status --short` → ` M app/globals.css` (nothing else; no new/deleted files,
`FAVICON_FIX_REPORT.md` untouched).

### Why this change (found while verifying fonts for this report)

* `--font-inter` is **referenced twice and never defined anywhere** in the repo
  (`app/globals.css:82` and `:89` — confirmed by full-repo grep).
* Per the CSS spec, a `var()` referencing an undefined custom property makes the
  **whole declaration invalid at computed-value time** → the property becomes
  `unset` → `inherit`.
* Commit history: `5035fc3` introduced a *valid* Bengali rule
  (`var(--font-noto-bengali), var(--font-geist-sans), …`); commit `07ac294`
  ("Fix hydration errors…") injected `var(--font-inter)` into both rules and
  silently broke them.
* Because `<body>` carries an inline `style={{ fontFamily: "var(--font-geist-sans), …" }}`
  (`app/layout.tsx:190`) and inline styles beat all stylesheet rules, everything
  fell back to Geist + the **system** Bengali font, never the self-hosted Noto.
* This was **pre-existing** (present on `origin/main`), reproduced with evidence
  in section 4, and is exactly the class of problem the guardrail
  "do NOT remove Bengali font support" protects against — so it was repaired
  rather than only reported (user-approved in-session).

---

## 6. Favicon / design / metadata preservation

| Check | Result |
|---|---|
| Icon `<link>` tags served by the built app | `icon /favicon.ico?… (48x48)`, `icon /icon.png?… (512x512)`, `apple-touch-icon /apple-icon.png?… (180x180)` — exactly the three intended tags |
| Stale `sej_logo.jpeg` icon links in built HTML | **none** |
| Assets | `app/favicon.ico` (15086 B, 16/32/48), `app/icon.png` (124493 B, 512×512 RGBA), `app/apple-icon.png` (22292 B, 180×180 RGBA) untouched |
| `app/layout.tsx` metadata | untouched in this task (stale `icons` block removal from the favicon task remains) |
| `FAVICON_FIX_REPORT.md` | untouched |
| Design / layout / components | untouched — only `app/globals.css` edited |

---

## 7. Vercel-side actions required (account owner must perform)

These are dashboard steps; I have no access to your Vercel account or build logs,
so the wording may differ slightly.

1. **Confirm which commit Vercel tried to build.** Project → *Deployments* → open
   the failed deployment → note commit SHA and error text.
   * If SHA predates `36d4071` → nothing to fix in code; redeploy `main` (step 4).
   * If SHA is `f9fd600`/`27edb9d` → stale cache (step 3).
2. **Confirm the project's production branch** is `main` (Project → Settings →
   Git → Production Branch) and the GitHub connection is healthy.
3. **Clear the build cache and redeploy:** open the deployment (or use the
   command palette `⌘.` / `Ctrl.`) → **⋯ → Clear Build Cache and Redeploy**.
   This drops `.next/cache` — the only remaining carrier of the removed
   Google-font module.
4. **Redeploy `main`** (Deployments → *⋯ → Redeploy* on `f9fd600`, or push any
   commit once section 8 is fixed). This is also what ships the favicon fix —
   production is still running `27edb9d`, so `sejbd.org` still shows the old
   favicon until a successful deployment lands.
5. **Do not change the Next.js version or re-add Google Fonts** — `next` is
   pinned at 16.3.6 and builds cleanly; fonts are self-hosted on purpose
   (Turbopack-safe).

---

## 8. Separate blocker: "commit author lacks contributing access"

**Exact message (Vercel):** *"Deployment Blocked — The Deployment was blocked
because the commit author does not have contributing access to the project on
Vercel."* This is an **identity/permission check performed by the Git
integration before building** — it is independent of the font error.

Facts for this repo: author of every pushed commit is `Lotus Tanvir
<itanvirul446@gmail.com>` (local `git config user.email` matches); repository is
**public**; `git push` already succeeded (remote is in sync).

Ordered diagnostic steps (from Vercel docs/KB and confirmed community reports):

1. **Link (or re-link) GitHub:** <https://vercel.com/account/settings/authentication>
   → if GitHub is already connected, remove the connection and connect it again.
   This is the most common single fix (confirmed fix in Vercel Community thread
   "deployment blocked because commit author does not have contributing access").
2. **Check the emails on the Vercel account** (Account Settings → Emails): the
   commit author email `itanvirul446@gmail.com` must be present/verified there
   (or be reachable through the linked GitHub account). Vercel validates the
   commit author against linked git-provider identities.
3. **Plan / team rules:**
   * **Hobby team:** only the team **owner's** commits deploy, and Hobby does not
     support collaboration (error text ends with *"Hobby teams do not support
     collaboration. Please upgrade to Pro to add team members."*).
   * **Pro team:** the commit author must be a **member** of the team owning the
     project (Team Settings → Members).
4. **Manual approval:** if the team has "manual approval for new committers"
   enabled, a team **Owner** must approve the pending membership (Team Settings
   → collaboration/members settings) before the next push builds.
5. **Read the machine-readable reason:** open the commit on GitHub and look for
   the **Vercel Bot comment** (it contains the request/approval link), and check
   the project **Activity log** for the specific denial reason.
6. **Email on the commit itself:** if the error names a
   `…@users.noreply.github.com` address, set
   `git config --global user.email "<your real GitHub email>"` for **future**
   commits only. ⚠️ Rewriting/amending existing commit authors (history
   rewrite) was explicitly out of scope for this task and was **not** performed.
7. Once identity access is confirmed, trigger the redeploy from section 7.

---

## 9. Explicitly NOT done (guardrails)

* No `git commit`, `git push`, no deploy of any kind — the working tree contains
  the uncommitted `app/globals.css` change only.
* No changes to git config, commit authors, branch history, remote, or repo
  visibility.
* No Next.js / React / Tailwind / dependency version changes; no lockfile change.
* No `.env*`, `next.config.ts`, routing, header, CSP, or domain changes.
* Bengali font **files** and `next/font/local` Geist setup untouched.
* `FAVICON_FIX_REPORT.md`, favicon assets, and all metadata work untouched.

---

## 10. Known issues reported, deliberately not fixed (out of scope)

1. **`app/globals.css:286-296`** overrides Tailwind's `.bg-linear-to-br` /
   `.bg-linear-to-t` inside `@layer utilities` using `var(--tw-gradient-stops)`;
   with the installed Tailwind v4 this resolves invalidly, so affected gradient
   backgrounds can compute to no `background-image`. Pre-existing; unrelated to
   the build error; left untouched.
2. **Production still serves the pre-favicon build (`27edb9d`)** — the favicon
   fix and this CSS fix appear on `sejbd.org` only after a successful deployment
   (sections 7–8).
3. **3 pre-existing ESLint warnings** in `components/admin/*` (hook deps / `<img>`).
4. I could not verify anything inside your Vercel dashboard/build logs from this
   machine; sections 7–8 are evidence-based procedures, not confirmed log lines.

---

## 11. Reproduction commands used

```powershell
# source has no Google Fonts
git grep -n "next/font/google" -- "*.ts" "*.tsx" "*.css"      # → comments only
git grep -n "next/font/google" 36d4071^ -- "*.tsx"            # → pre-fix import

# build verification (project)
npx tsc --noEmit ; npm run lint ; npm run build               # → 0 / 0 err / 0

# clean-room Vercel simulation
robocopy <repo> <temp>\cleanroom /E /XD node_modules .next .git .kilo out
cd <temp>\cleanroom ; npm ci ; npm run build                  # → exit 0

# browser checks (headless)
node C:\Users\Mypc\.claude\skills\browser-automation\browser.mjs http://localhost:3102 --script <qa>
```
