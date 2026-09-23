# AdTalk Events Landing Page

## Project Description
This project is a freelance website for AdTalk Events, built to present the company’s services, event capabilities, and gallery in a clean and professional single-page experience.

## Tech Stack
- React
- Vite
- React Router DOM
- CSS
- ESLint
- Contentful (gallery content)

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
