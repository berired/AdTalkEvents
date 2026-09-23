# AdTalk Events Landing Page

## Project Description
This project is a freelance website for AdTalk Events, built to present the company’s services, event capabilities, and gallery in a clean and professional single-page experience.

## Tech Stack
- React
- Vite
- React Router DOM
- CSS
- ESLint
- Contentful (gallery content, service images)

## Gallery content (Contentful)
The Gallery page's images and captions are managed in Contentful instead of being hardcoded.

**Content type:** `galleryImage` ("Gallery Image")
- `image` — Media, one image asset, required
- `caption` — Short text, required (used as the visible caption and image alt text)

Images display in the order you upload/publish them in Contentful (sorted by creation date) — no manual ordering needed.

**Updating the gallery after editing content in Contentful:**
1. Copy `.env.example` to `.env` and fill in `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` (a Content Delivery API token, not the Management API token).
2. Run `npm run fetch-gallery`. This downloads the images into `src/assets/gallery-cms/` and writes `src/data/gallery-manifest.json`.
3. Re-run the build (`npm run build`) and re-capture `prerendered/gallery/index.html`, same as any other content change (see `scripts/copy-prerendered.mjs`).
4. Commit the updated files.

This runs at "build time" rather than in the browser, so the site stays fully static — no Contentful API calls happen for site visitors.

## Service images (Contentful)
Titles, descriptions, and subcategories on the Services pages stay hardcoded in `src/pages/Services.jsx`, `src/pages/ServiceDetailPage.jsx`, and `src/pages/SubcategoryDetailPage.jsx` — only the **images** are sourced from Contentful, via `src/lib/serviceImages.js`. If an entry isn't in Contentful (yet), the page falls back to the original bundled image automatically.

**Content type:** `serviceImageSet` ("Service Image Set")
- `title` — Short text, required (just a human-readable label in the Contentful UI)
- `key` — Short text, required, Appearance set to **Slug** (generated from `title`) — must match one of the fixed keys below exactly, since that's how the code matches an entry to its slot on the site
- `images` — Media, many files, required (up to 3, in display order)

**Keys (must match exactly — auto-generated slugs work for most, but two need manual overrides):**
- `nationwide-manpower-deployment`
- `nationwide-training-capabilities`
- `nationwide-sampling-selling-and-merchandising` (auto-gen from title drops "&", won't match — set manually)
- `onground-brandactivity-deployment-posminstallation-and-management-for-generaltrade-and-keyaccounts` (custom compressed slug, always set manually)
- `sales-associates-merchandisers`
- `brand-ambassadors`
- `promoter-sampler-push-girl-helper`
- `interactive-installations`
- `pop-up-shops`
- `community-partnerships`
- `gamified-engagement-campaigns`

**Updating service images after changing them in Contentful:**
1. Same `.env` as the gallery (`CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN`) — no separate credentials needed.
2. Run `npm run fetch-service-images`. This downloads images into `src/assets/service-images-cms/` and writes `src/data/service-images-manifest.json`.
3. Re-run the build (`npm run build`) and re-capture `prerendered/services/index.html`.
4. Commit the updated files.
