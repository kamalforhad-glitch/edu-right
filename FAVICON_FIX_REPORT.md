# Favicon Fix Report — Society for Educational Justice (sejbd.org)

Date of audit: 2026-10-04
Framework detected: **Next.js 16.3.6 (App Router, Turbopack)** — from `package.json` (`next: ^16.3.6`), `app/` directory, `app/layout.tsx` Metadata API.
Repository: `edu-right` (working tree, not committed — no commit/push was performed).

---

## 1. Root cause

Three independent problems were making Google Search show the old circular logo:

1. **`app/favicon.ico` still contained the OLD circular badge logo.**
   The file (15 406 bytes) holds three 32-bit BMP frames (16×16, 32×32, 48×48) of the previous
   green circular seal ("SOCIETY FOR EDUCATIONAL JUSTICE" ring + flag centre). Verified by decoding the
   frames and by SHA-256 comparison against the file currently served in production.
2. **`app/layout.tsx` declared the horizontal *full* logo as the favicon**: metadata
   `icons: { icon: "/sej_logo.jpeg", shortcut: "/sej_logo.jpeg", apple: "/sej_logo.jpeg" }`.
   `/sej_logo.jpeg` is the 1600×722 horizontal lockup containing the words
   "Society for Educational Justice" — a JPEG with white background, wrong aspect ratio, illegible at
   16 px, and JPEG favicons are poorly supported. It also gave iOS a stretched logo as touch icon.
3. **Conflicting declarations.** Production HTML emitted four icon tags with two *different* targets:
   ```
   <link rel="shortcut icon" href="/sej_logo.jpeg"/>
   <link rel="icon" href="/favicon.ico?favicon.0fktufg3shbf9.ico" sizes="48x48" type="image/x-icon"/>
   <link rel="icon" href="/sej_logo.jpeg"/>
   <link rel="apple-touch-icon" href="/sej_logo.jpeg"/>
   ```
   Browsers and Google's favicon crawler resolve this nondeterministically; Google evidently picked the
   `/favicon.ico` (48×48) → the old circular seal appeared in search results.

Not a cause (checked and OK): robots rules (`app/robots.ts` allows `/`), canonical host
(`https://sejbd.org/` → 308 → `https://www.sejbd.org/`), cache headers
(`public, max-age=0, must-revalidate` — no caching barrier for crawlers), sitemap (`/sitemap.xml` 200).

---

## 2. Files inspected and changed

Inspected (unchanged unless listed below):

| Path | Purpose |
|---|---|
| `package.json` | framework/version identification |
| `app/favicon.ico` | old favicon (App Router file convention → `/favicon.ico`) |
| `app/layout.tsx` | `metadata.icons`, openGraph, twitter, JSON-LD |
| `app/robots.ts`, `app/sitemap.ts` | crawlability |
| `app/opengraph-image.tsx` | social image (not favicon-related, untouched) |
| `public/` | static assets; no favicon there |
| `components/Navbar.tsx`, `components/Footer.tsx` | header/footer logo — **unchanged** |
| `next.config.ts` | headers/redirects — **unchanged** |
| `https://www.sejbd.org/` (live HTML), `/favicon.ico`, `/robots.txt` | production baseline |

**New source artwork:** `D:\downloads\ChatGPT Image Oct 4, 2026, 12_25_42 AM.png`
(1254×1254, RGBA, transparent background, symbol only — no text, no circular badge).

Changed / created:

| File | Change |
|---|---|
| `app/favicon.ico` | **replaced** — rebuilt from the new symbol (16/32/48, 15 086 bytes) |
| `app/icon.png` | **new** — 512×512 PNG, transparent (App Router `<link rel="icon">`) |
| `app/apple-icon.png` | **new** — 180×180 PNG, transparent (App Router `<link rel="apple-touch-icon">`) |
| `app/layout.tsx` | removed the stale `icons: {…}` metadata block (3 lines) + one comment line |

Nothing else was modified. `git status` shows only those four paths.

---

## 3. Old vs new favicon references

**Before (production HTML today):**
```
<link rel="shortcut icon" href="/sej_logo.jpeg"/>
<link rel="icon" href="/favicon.ico?favicon.0fktufg3shbf9.ico" sizes="48x48" type="image/x-icon"/>
<link rel="icon" href="/sej_logo.jpeg"/>
<link rel="apple-touch-icon" href="/sej_logo.jpeg"/>
```

**After (local production build):**
```
<link rel="icon" href="/favicon.ico?favicon.3b9gaj_q61n45.ico" sizes="48x48" type="image/x-icon"/>
<link rel="icon" href="/icon.png?icon.2s2alp6kek5tn.png" sizes="512x512" type="image/png"/>
<link rel="apple-touch-icon" href="/apple-icon.png?apple-icon.2tz7kugnt9v-b.png" sizes="180x180" type="image/png"/>
```

- No `sej_logo.jpeg` icon/shortcut/apple references remain anywhere in `<head>`.
- The only remaining `sej_logo.jpeg` `<link>` is a **preloaded header image** (the site logo) — intended.
- All three icons now point at the **same** new symbol artwork → no conflicting declarations.
- Stable public URLs: `/favicon.ico`, `/icon.png`, `/apple-icon.png`.
- Header and footer logos (`src="/sej_logo.jpeg"` in `Navbar.tsx` / `Footer.tsx`) untouched.
- Title, description, openGraph, twitter, canonical, JSON-LD untouched (only the favicon-related
  `icons` block was removed).

---

## 4. New favicon dimensions and formats

Source cleanup performed before conversion (not blind conversion):

- Confirmed the supplied PNG already has an **alpha channel with a transparent background**
  (≈1.15 M of 1.57 M pixels fully transparent) and **no opaque near-black pixels** → no black
  background was forced to transparency; no damage to the artwork.
- Connected-component analysis at `alpha ≥ 48`: exactly **5 components**, all ≥ 35 000 px,
  **0 specks/noise blobs** → no despeckling needed; artwork left pixel-identical.
- Tight content bounding box `x 139–1131, y 116–1141` (993×1026) re-centred on a square canvas
  with size-appropriate padding (90 % fill at 16/32 px, 85 % at 48 px, 80 % at 180 px, 78 % at 512 px)
  so the mark stays legible when small.

| Asset | Size | Format | Notes |
|---|---|---|---|
| `app/favicon.ico` | 16×16, 32×32, 48×48 | ICO, 32-bit BMP frames with alpha, AND-mask | same frame layout/format as the file it replaces |
| `app/icon.png` | 512×512 | PNG-32 (RGBA), transparent | multiple of 48 → Google-friendly |
| `app/apple-icon.png` | 180×180 | PNG-32 (RGBA), transparent | iOS touch icon |

No text, no circular badge, no shadow, no decorative frame added. Original uploaded artwork and
`public/sej_logo.jpeg` left unchanged.

---

## 5. Local verification results — ALL PASSED

| Check | Result |
|---|---|
| `npx tsc --noEmit` | pass, no output |
| `npx eslint app/layout.tsx` | pass, no output |
| `npm run build` | pass — routes include `○ /icon.png`, `○ /apple-icon.png`, `/robots.txt`, `/sitemap.xml` |
| Referenced files exist | `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` present |
| Formats/dimensions | ICO entries `16x16 32bpp, 32x32 32bpp, 48x48 32bpp`; `icon.png` 512×512 `Format32bppArgb`; `apple-icon.png` 180×180 `Format32bppArgb` |
| Asset integrity | SHA-256 of files on disk **equals** bytes served by `next start` (favicon + icon.png match) |
| Production server smoke test (`npx next start -p 3100`) | `/` 200, `/favicon.ico` 200 `image/x-icon`, `/icon.png` 200 `image/png`, `/apple-icon.png` 200 `image/png`, `/robots.txt` 200, `/sej_logo.jpeg` 200 |
| Headless-browser check on `http://localhost:3100/` | 3 icon links resolved, HTTP 200, signatures `00 00 01 00` (ICO) and `89 50 4E 47` (PNG); **0 console errors, 0 failed requests** |
| Conflicting favicon declarations | none (grep over repo found no other favicon/icon references) |
| Visual check of rendered frames | 16/32/48/512 px all show the centred blue-green SEJ symbol, transparent background, no text |
| Header/footer logo regression | `git diff components/Navbar.tsx components/Footer.tsx` → empty (untouched) |

Not run: unit tests (project has no test script in `package.json`).

---

## 6. Production verification — **PENDING deployment**

The changes are in the working tree only; **nothing has been deployed** (and nothing was committed
or pushed). Baseline of `https://www.sejbd.org` measured **before** deployment:

| URL | Status | Content-Type | Length | Notes |
|---|---|---|---|---|
| `https://www.sejbd.org/` | 200 | `text/html; charset=utf-8` | 139 894 | still declares the 4 old icon tags (see §3) |
| `https://www.sejbd.org/favicon.ico` | 200 | `image/vnd.microsoft.icon` | 15 406 | **SHA-256 `B5CE0E4C…9C31D5` = byte-identical to the OLD favicon in git HEAD** |
| `https://sejbd.org/` | 308 → `https://www.sejbd.org/` | `text/plain` | — | canonical host redirect works |
| `https://www.sejbd.org/robots.txt` | 200 | `text/plain` | 101 | allows `/`, disallows `/api/`, `/admin/` |
| Cache headers | `public, max-age=0, must-revalidate` | — | — | no cache barrier for Googlebot |
| ETag on `/` | `"06b4076ff31e8f19a23b9184f6900d8c"` | — | — | record for post-deploy comparison |

Expected after deployment (local build already proves these outputs):

- `https://www.sejbd.org/` → HTML with the three new icon tags of §3.
- `https://www.sejbd.org/favicon.ico` → 200, ICO, **new** SHA-256 `6E0ADE3A…41762204`, 15 086 bytes, entries 16/32/48, body = new symbol.
- `https://www.sejbd.org/icon.png` → 200, `image/png`, 512×512.
- `https://www.sejbd.org/apple-icon.png` → 200, `image/png`, 180×180.
- `https://sejbd.org/` → still 308 to `https://www.sejbd.org/`.

Re-run after deploy (PowerShell, binary-safe):

```powershell
# 1. head tags
(Invoke-WebRequest https://www.sejbd.org/ -UseBasicParsing).Content `
  -split "`n" | Select-String 'rel="icon"|apple-touch-icon'
# 2. favicon status + identity
$r = Invoke-WebRequest https://www.sejbd.org/favicon.ico -UseBasicParsing
"$($r.StatusCode) $($r.Headers['Content-Type']) $($r.RawContentStream.Length)"
# 3. confirm it is the NEW file (compare with local hash)
(Get-FileHash app\favicon.ico -Algorithm SHA256).Hash
# 4. host redirect + robots
Invoke-WebRequest https://sejbd.org/ -MaximumRedirection 0 -UseBasicParsing   # expect 308
Invoke-WebRequest https://www.sejbd.org/robots.txt -UseBasicParsing            # expect 200
```

Deployment itself: **not performed.** The repo contains no `vercel.json`, no `.github/workflows`,
no `.vercel/` directory, so the deploy mechanism (git-integrated platform vs. CLI) could not be
determined from the repository and was not assumed. Deploy however the project is normally released,
then re-run the checks above. No deployment settings were invented or changed.

---

## 7. Deployment and Google Search Console instructions

### After deploying

1. Hard-refresh the site and confirm the three new `<link>` tags in view-source.
2. Open `https://www.sejbd.org/favicon.ico` directly and confirm the new blue/green symbol.
3. Optionally confirm `/icon.png` and `/apple-icon.png` return 200 with `image/png`.

### Google Search Console (manual steps)

1. Open https://search.google.com/search-console → select the verified **`sejbd.org`** property
   (Domain property, or the `https://www.sejbd.org` URL-prefix property).
2. Left menu → **URL Inspection** → enter the canonical homepage `https://www.sejbd.org/` → **Enter**.
3. Read the inspection result: it must report **"URL is on Google"** / available for indexing.
   Googlebot must be able to fetch the page — check the **Coverage / Page availability** section.
4. If the page is not indexed or you want a refresh: press **REQUEST INDEXING** → *Test live URL*
   first, then submit. (Unavailable if your property has hit the daily request limit — retry later.)
5. To let Google re-read the favicon, also run URL Inspection on
   `https://www.sejbd.org/favicon.ico` — a "URL can be fetched" result proves the crawler reaches it.
   (Optional: **Legacy tools → Change of address / Crawl stats** under Settings → Crawl statistics
   shows whether `/favicon.ico` was fetched.)
6. Verify Googlebot can fetch both: **Settings → Crawl stats** or the live-URL test, and confirm
   `robots.txt` does not block `/` (it does not — verified in §6).

**Important expectation management:** Google decides *when* the search-results favicon refreshes.
A successful deployment + re-crawl does **not** guarantee an immediate change; Google caches favicons
and re-evaluates them on its own schedule (hours to weeks). Google's own guidance also notes that
favicons shown in search results are drawn from the site's declared icons, and may be withheld if
the icon is deemed low quality (must be a multiple of 48×48 preferred, and must not violate their
rules). **I cannot and do not claim Google Search has updated — that must be observed after deploy.**

---

## 8. Remaining risks / blockers

1. **Deployment not done** → production still serves the old favicon (byte-verified). All
   production verification in §6 is therefore *pending*.
2. **Google refresh timing is out of our control** — even after deploy, the SERP favicon may take
   time; verification must be repeated later.
3. **16×16 legibility:** the SEJ symbol is made of separated blocks, so at 16 px it is inherently
   soft (padding was reduced to 90 % fill to maximise size). If sharper small-size rendering is
   wanted later, a simplified variant of the mark would be required — not created here to avoid
   altering brand artwork.
4. **Pre-existing, out-of-scope bug found (not fixed):** `app/globals.css:286` overrides
   `.bg-linear-to-br` with `linear-gradient(to bottom right, var(--tw-gradient-stops))`, which is
   invalid for the installed Tailwind version's stop format, so Tailwind gradient utilities compute
   to `background-image: none` across the site. It does not affect favicons; left untouched per the
   "no unrelated changes" rule.
5. **Caching after deploy:** production sends `max-age=0, must-revalidate`, but browsers may still
   hold an old favicon in the favicon cache; users may need a hard refresh / new session.

---

## Commands executed

```text
npx tsc --noEmit                     → pass
npx eslint app/layout.tsx            → pass
npm run build                        → pass (Next.js 16.3.6 production build)
npx next start -p 3100               → served for verification, then stopped
node <browser-automation> http://localhost:3100/ --script favicon-check.mjs
                                     → 3 icons 200, 0 console errors, 0 failed requests
git status --short                   → M app/favicon.ico, M app/layout.tsx,
                                       ?? app/icon.png, ?? app/apple-icon.png
SHA-256 comparisons                  → local file == bytes served locally;
                                       production /favicon.ico == OLD git file
```

## Deliverable summary

- **Files changed:** `app/favicon.ico` (replaced), `app/layout.tsx` (stale icon metadata removed).
- **Files added:** `app/icon.png` (512×512), `app/apple-icon.png` (180×180).
- **Tests/build:** typecheck ✔, lint ✔, production build ✔, runtime smoke test ✔, headless-browser ✔.
- **Deployment: REQUIRED — not performed.** Production verification and the Google Search Console
  steps remain pending until the change is deployed. No commits or pushes were made.
