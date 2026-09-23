// Pulls "galleryImage" entries from Contentful and materializes them as real
// files in the repo: downloaded images in src/assets/gallery-cms/ and a
// manifest at src/data/gallery-manifest.json that Gallery.jsx imports
// statically. This is NOT run automatically on every build — run it by hand
// (`npm run fetch-gallery`) whenever gallery content changes in Contentful,
// then commit the results and re-capture prerendered/gallery/index.html,
// same as the existing prerendered-snapshot workflow.
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
const contentType = 'galleryImage'

const assetsDir = join(rootDir, 'src', 'assets', 'gallery-cms')
const manifestPath = join(rootDir, 'src', 'data', 'gallery-manifest.json')

if (!spaceId || !accessToken) {
  console.error(
    '[fetch-gallery] Missing CONTENTFUL_SPACE_ID and/or CONTENTFUL_ACCESS_TOKEN.\n' +
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
  const fromName = fileName.match(/\.[a-zA-Z0-9]+$/)?.[0]
  if (fromName) return fromName
  const fromType = contentType.split('/')[1]
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
  console.log('[fetch-gallery] Fetching galleryImage entries from Contentful...')
  const data = await fetchEntries()

  if (data.items.length === 0) {
    const existingManifest = existsSync(manifestPath)
      ? JSON.parse(readFileSync(manifestPath, 'utf8'))
      : []
    if (existingManifest.length > 0) {
      console.error(
        `[fetch-gallery] Contentful returned 0 published galleryImage entries, but ` +
        `${existingManifest.length} are currently in the manifest. Refusing to wipe ` +
        `existing gallery content — this usually means entries were unpublished by ` +
        `mistake, or the space/environment/token is misconfigured. Re-publish the ` +
        `entries (or fix the credentials) and re-run this script.`
      )
      process.exit(1)
    }
  }

  const assetsById = new Map(
    (data.includes?.Asset || []).map((asset) => [asset.sys.id, asset])
  )

  mkdirSync(assetsDir, { recursive: true })
  mkdirSync(dirname(manifestPath), { recursive: true })

  const manifest = []
  const keepFiles = new Set()

  for (const entry of data.items) {
    const caption = entry.fields.caption?.trim()
    const imageLink = entry.fields.image
    if (!caption || !imageLink) {
      console.warn(`[fetch-gallery] Skipping entry ${entry.sys.id}: missing caption or image.`)
      continue
    }

    const asset = assetsById.get(imageLink.sys.id)
    const assetUrl = asset?.fields?.file?.url
    if (!assetUrl) {
      console.warn(`[fetch-gallery] Skipping entry ${entry.sys.id}: linked asset not found.`)
      continue
    }

    const fileUrl = assetUrl.startsWith('//') ? `https:${assetUrl}` : assetUrl
    const ext = extensionFor(asset.fields.file.fileName, asset.fields.file.contentType)
    const fileName = `${entry.sys.id}${ext}`

    const imageRes = await fetch(fileUrl)
    if (!imageRes.ok) {
      console.warn(`[fetch-gallery] Skipping entry ${entry.sys.id}: failed to download image (${imageRes.status}).`)
      continue
    }
    writeFileSync(join(assetsDir, fileName), Buffer.from(await imageRes.arrayBuffer()))
    keepFiles.add(fileName)
    manifest.push({ file: fileName, caption })
    console.log(`[fetch-gallery] Saved ${fileName} ("${caption}")`)
  }

  for (const existing of readdirSync(assetsDir)) {
    if (existing === '.gitkeep' || keepFiles.has(existing)) continue
    rmSync(join(assetsDir, existing))
    console.log(`[fetch-gallery] Removed stale file ${existing}`)
  }

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`[fetch-gallery] Wrote ${manifest.length} entries to src/data/gallery-manifest.json`)
}

main().catch((err) => {
  console.error('[fetch-gallery] Failed:', err.message)
  process.exit(1)
})
