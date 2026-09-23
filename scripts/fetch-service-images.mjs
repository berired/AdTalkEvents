// Pulls "serviceImageSet" entries from Contentful and materializes them as
// real files in the repo: downloaded images in src/assets/service-images-cms/
// and a flat manifest at src/data/service-images-manifest.json, keyed by
// each entry's `key` (slug) field, e.g.:
//   { "nationwide-manpower-deployment": [{ "file": "...-1.webp", "alt": "..." }, ...] }
//
// Alt text comes from each image ASSET's own "Description" field in
// Contentful's Media Library (not a field on the entry) — that's the
// standard place Contentful editors put alt text, and it's reused
// automatically if the same asset is used in multiple entries.
//
// src/lib/serviceImages.js reads this manifest at build time and falls back
// to the existing hardcoded local images for any key not present, so the
// site keeps working even before every entry is filled in in Contentful.
//
// Not run automatically on every build — run it by hand
// (`npm run fetch-service-images`) whenever service images change in
// Contentful, then commit the results and re-capture the relevant
// prerendered snapshots.
//
// Requires CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN (a Content
// Delivery API token) as env vars, either exported or in a local .env file.

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
loadDotEnv(join(rootDir, '.env'))

const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master'
const contentType = 'serviceImageSet'

const assetsDir = join(rootDir, 'src', 'assets', 'service-images-cms')
const manifestPath = join(rootDir, 'src', 'data', 'service-images-manifest.json')

if (!spaceId || !accessToken) {
  console.error(
    '[fetch-service-images] Missing CONTENTFUL_SPACE_ID and/or CONTENTFUL_ACCESS_TOKEN.\n' +
    'Set them in a .env file (see .env.example) or as environment variables.'
  )
  process.exit(1)
}

function loadDotEnv(path) {
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

function extensionFor(fileName, contentType) {
  const fromName = fileName?.match(/\.[a-zA-Z0-9]+$/)?.[0]
  if (fromName) return fromName
  const fromType = contentType?.split('/')[1]
  return fromType ? `.${fromType}` : ''
}

async function fetchEntries() {
  const url =
    `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries` +
    `?content_type=${contentType}&order=sys.createdAt&include=2&access_token=${accessToken}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Contentful API error ${res.status}: ${await res.text()}`)
  }
  return res.json()
}

async function main() {
  console.log('[fetch-service-images] Fetching serviceImageSet entries from Contentful...')
  const data = await fetchEntries()

  if (data.items.length === 0) {
    const existingManifest = existsSync(manifestPath)
      ? JSON.parse(readFileSync(manifestPath, 'utf8'))
      : {}
    const existingKeyCount = Object.keys(existingManifest).length
    if (existingKeyCount > 0) {
      console.error(
        `[fetch-service-images] Contentful returned 0 published serviceImageSet entries, ` +
        `but ${existingKeyCount} key(s) are currently in the manifest. Refusing to wipe ` +
        `existing service images — this usually means entries were unpublished by ` +
        `mistake, or the space/environment/token is misconfigured. Re-publish the ` +
        `entries (or fix the credentials) and re-run this script.`
      )
      process.exit(1)
    }
  }

  const assetsById = new Map((data.includes?.Asset || []).map((a) => [a.sys.id, a]))

  mkdirSync(assetsDir, { recursive: true })
  mkdirSync(dirname(manifestPath), { recursive: true })

  const keepFiles = new Set()
  const manifest = {}

  for (const entry of data.items) {
    const key = entry.fields.key?.trim()
    const links = entry.fields.images || []
    if (!key) {
      console.warn(`[fetch-service-images] Skipping entry ${entry.sys.id}: missing key.`)
      continue
    }
    if (manifest[key]) {
      console.warn(`[fetch-service-images] Duplicate key "${key}" (entry ${entry.sys.id}) — overwriting earlier entry.`)
    }

    const files = []
    let i = 0
    for (const link of links) {
      i += 1
      const asset = assetsById.get(link.sys?.id)
      const assetUrl = asset?.fields?.file?.url
      if (!assetUrl) {
        console.warn(`[fetch-service-images] Entry ${entry.sys.id} ("${key}"): image ${i} asset not found, skipping it.`)
        continue
      }
      const fileUrl = assetUrl.startsWith('//') ? `https:${assetUrl}` : assetUrl
      const ext = extensionFor(asset.fields.file.fileName, asset.fields.file.contentType)
      const fileName = `${key}-${i}${ext}`
      const alt = asset.fields.description?.trim() || asset.fields.title?.trim() || ''
      if (!alt) {
        console.warn(`[fetch-service-images] Entry ${entry.sys.id} ("${key}"): image ${i} has no Description/Title set on the asset — alt text will be empty.`)
      }

      const imageRes = await fetch(fileUrl)
      if (!imageRes.ok) {
        console.warn(`[fetch-service-images] Entry ${entry.sys.id} ("${key}"): failed to download image ${i} (${imageRes.status}).`)
        continue
      }
      writeFileSync(join(assetsDir, fileName), Buffer.from(await imageRes.arrayBuffer()))
      keepFiles.add(fileName)
      files.push({ file: fileName, alt })
    }

    manifest[key] = files
    console.log(`[fetch-service-images] Saved ${files.length} image(s) for "${key}"`)
  }

  for (const existing of readdirSync(assetsDir)) {
    if (existing === '.gitkeep' || keepFiles.has(existing)) continue
    rmSync(join(assetsDir, existing))
    console.log(`[fetch-service-images] Removed stale file ${existing}`)
  }

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`[fetch-service-images] Wrote ${Object.keys(manifest).length} image set(s) to src/data/service-images-manifest.json`)
}

main().catch((err) => {
  console.error('[fetch-service-images] Failed:', err.message)
  process.exit(1)
})
