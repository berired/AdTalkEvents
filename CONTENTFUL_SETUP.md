# Contentful Setup Guide

This site pulls two kinds of content from Contentful: **Gallery photos + captions** (fully CMS-managed) and **Service page images only** (titles/descriptions stay hardcoded in the code; only the photos come from Contentful).

Nothing is fetched from Contentful in the visitor's browser. Two Node scripts (`scripts/fetch-gallery.mjs`, `scripts/fetch-service-images.mjs`) pull content at **build time**, download images into the repo, and write JSON manifests that the React pages import statically. This guide covers setting that up from scratch — content types, credentials, local scripts, and the GitHub automation that keeps the live site in sync.

---

## 1. Create the space

1. Sign up / log in at contentful.com and create a space (the free Community tier is enough — see field/record limits at the bottom of this doc).
2. Note your **Space ID**, found in Settings → General settings, or in the URL when viewing the space.

## 2. Create the content types

### Content type: `galleryImage` ("Gallery Image")

Used by the Gallery page. Content model → Add content type → set the API identifier to exactly `galleryImage`.

| Field name | API ID | Type | Required | Notes |
|---|---|---|---|---|
| Image | `image` | Media — one file | Yes | Restrict to image file types |
| Caption | `caption` | Short text | Yes | Shown as the visible caption **and** used as the image's `alt` text |

No `order` field needed — images display in the order they're published (sorted by Contentful's `sys.createdAt`).

### Content type: `serviceImageSet` ("Service Image Set")

Used by the Services pages — **images only**. API identifier: `serviceImageSet`.

| Field name | API ID | Type | Required | Notes |
|---|---|---|---|---|
| Title | `title` | Short text | Yes | Just a human-readable label for the Contentful UI |
| Key | `key` | Short text | Yes | Set **Appearance → Slug**, generated from `title`. This is how the code matches an entry to a specific spot on the site — see the exact required values below |
| Images | `images` | Media — many files | Yes | Up to 3 photos, in display order |

**Alt text isn't a field on this content type.** It comes from each image *asset's own* **Description** field in Contentful's Media Library (Contentful's standard place for alt text — set it once per photo and it's reused automatically anywhere that photo is used). When adding/editing an image in the Media Library, fill in **Description** with real alt text (e.g. "Brand ambassadors briefing staff before a mall activation in Quezon City"). If left blank, the site falls back to a generic generated alt (e.g. "Brand Ambassadors - Image 1").

#### Required `key` values

The `key` is the same identifier used in the page's URL. For a service, it's the segment right after `/services/`:

```
https://www.adtalk.com.ph/services/nationwide-manpower-deployment
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ← key
```

For a subcategory, it's the segment after `/subcategory/`:

```
https://www.adtalk.com.ph/services/nationwide-manpower-deployment/subcategory/promoter-sampler-push-girl-helper
                                                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ← key
```

These **must match exactly** — the code looks up images by these strings. Auto-generated slugs (lowercase + hyphenated title) match most of them, but two need to be typed in manually because the auto-slugify doesn't reproduce them:

| Key | Corresponds to | Auto-gen slug works? |
|---|---|---|
| `nationwide-manpower-deployment` | Nationwide Manpower Deployment (service) | Yes |
| `nationwide-training-capabilities` | Nationwide Training Capabilities (service) | Yes |
| `nationwide-sampling-selling-and-merchandising` | Nationwide Sampling, Selling & Merchandising (service) | **No — auto-gen drops the "&"; type it in manually** |
| `onground-brandactivity-deployment-posminstallation-and-management-for-generaltrade-and-keyaccounts` | On-Ground Brand Activity Deployment / POSM Installation (service) | **No — custom compressed slug; always type it in manually** |
| `sales-associates-merchandisers` | Sales Associates & Merchandisers (subcategory) | Yes |
| `brand-ambassadors` | Brand Ambassadors (subcategory) | Yes |
| `promoter-sampler-push-girl-helper` | Promoter \| Sampler \| Push Girl \| Helper (subcategory) | Yes |
| `interactive-installations` | Interactive Installations (subcategory) | Yes |
| `pop-up-shops` | Pop-Up Shops (subcategory) | Yes |
| `community-partnerships` | Community Partnerships (subcategory) | Yes |
| `gamified-engagement-campaigns` | Gamified Engagement Campaigns (subcategory) | Yes |

If an entry for a given key doesn't exist yet (or isn't published), the site automatically falls back to its original bundled image — nothing breaks while you're filling these in gradually.

## 3. Add and publish entries

- **Gallery:** add as many `Gallery Image` entries as you want, each with one photo + a caption. Publish each one.
- **Service images:** add up to 11 `Service Image Set` entries (one per key above), each with 1–3 photos. Publish each one. You don't have to fill in all 11 at once — unfilled ones just keep showing the original image.

## 4. Get API credentials

Settings → API keys → Add API key.
- Copy the **Space ID**.
- Copy the **Content Delivery API - access token** (read-only). Do **not** use the Content Management API token — the fetch scripts only need read access.

## 5. Local environment setup

In the project root:

```bash
cp .env.example .env
```

Fill in `.env`:

```
CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_ACCESS_TOKEN=your-content-delivery-api-token
CONTENTFUL_ENVIRONMENT=       # optional, defaults to "master"
```

`.env` is gitignored — it never gets committed.

## 6. Fetch content locally

```bash
npm run fetch-gallery          # → src/assets/gallery-cms/, src/data/gallery-manifest.json
npm run fetch-service-images   # → src/assets/service-images-cms/, src/data/service-images-manifest.json
```

Both scripts download images into the repo and write a manifest; re-running them updates/removes files to match what's currently published in Contentful (stale files get deleted automatically).

## 7. Verify, build, and deploy

```bash
npm run dev      # check /gallery and /services locally
npm run build     # production build
```

Re-capture `prerendered/gallery/index.html` and `prerendered/services/index.html` (the static HTML snapshots used as an SEO fallback for non-JS crawlers — see `scripts/copy-prerendered.mjs`), then commit everything:

```bash
git add src/assets/gallery-cms src/data/gallery-manifest.json \
        src/assets/service-images-cms src/data/service-images-manifest.json \
        prerendered/gallery/index.html prerendered/services/index.html
git commit -m "Sync content from Contentful"
git push
```

---

## 8. Automating it (GitHub Actions + Contentful webhook)

Instead of running the fetch scripts by hand every time you publish something, this repo has a GitHub Actions workflow (`.github/workflows/sync-contentful.yml`) that does it for you the moment you publish in Contentful:

**Contentful publish → webhook → GitHub Action fetches + commits + pushes → existing deploy workflow (`deploy-cpanel.yml`) builds and deploys automatically.**

To set this up on a new GitHub repo:

### 8a. Add repo secrets
GitHub repo → Settings → Secrets and variables → Actions → New repository secret:
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`

(Plus whatever your deploy workflow already needs — for the cPanel/FTPS deploy used here: `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`.)

### 8b. Create a GitHub Personal Access Token
GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token.
- Scope it to **this repository only**.
- Permissions: **Contents: Read and write**.
- This token will be pasted into Contentful's webhook settings, so treat it as a live credential (rotate it if it ever leaks).

### 8c. Add the Contentful webhook
Contentful → Settings → Webhooks → Add Webhook:
- **URL:** `https://api.github.com/repos/<owner>/<repo>/dispatches`
- **Method:** POST
- **Headers:**
  - `Authorization: Bearer <the PAT from 8b>`
  - `Accept: application/vnd.github+json`
- **Content type:** `application/json`
- **Custom payload:**
  ```json
  { "event_type": "contentful-publish" }
  ```
- **Triggers:** Entry → Publish, Unpublish, Delete (optionally filtered to just the `galleryImage` and `serviceImageSet` content types, so unrelated content changes don't trigger a rebuild)

Once this is wired up, publishing/unpublishing/deleting an entry in Contentful redeploys the live site within a few minutes, with no manual git commands required.

**Known limitation:** the prerendered SEO snapshots (`prerendered/gallery/index.html`, `prerendered/services/index.html`) are still captured manually and are *not* regenerated by this automation — they'll gradually drift from the live content over time. This only affects non-JS crawlers (the actual site, for real visitors, is always fresh); re-capturing them automatically would require running a headless browser in CI, which isn't set up yet.

---

## Reference: Contentful free tier limits

For context, the Community (free) plan allows:
- 25,000 records per space (each published entry + each asset counts as one record — with ~13 gallery photos and 11 service image sets, you're nowhere near this)
- 2 environments, 2 locales, 5 users
- ~500,000 API calls/month across the Delivery/Preview/Images APIs — not really relevant here since the live site never calls Contentful directly, only the fetch scripts do (run manually or a few times a day via the webhook)
