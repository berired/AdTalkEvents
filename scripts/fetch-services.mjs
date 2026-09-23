// Pulls "service" and "serviceSubcategory" entries from Contentful and
// materializes them as real files in the repo: downloaded images in
// src/assets/services-cms/ and a nested manifest at
// src/data/services-manifest.json that Services.jsx, ServiceDetailPage.jsx,
// and SubcategoryDetailPage.jsx import statically.
//
// Not run automatically on every build — run it by hand
// (`npm run fetch-services`) whenever service content changes in Contentful,
// then commit the results and re-capture prerendered/services/index.html
// (and any prerendered subcategory pages), same as the gallery workflow.
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

const assetsDir = join(rootDir, 'src', 'assets', 'services-cms')
const manifestPath = join(rootDir, 'src', 'data', 'services-manifest.json')

if (!spaceId || !accessToken) {
  console.error(
    '[fetch-services] Missing CONTENTFUL_SPACE_ID and/or CONTENTFUL_ACCESS_TOKEN.\n' +
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

async function fetchAllEntries(contentType) {
  const url =
    `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries` +
    `?content_type=${contentType}&order=sys.createdAt&include=2&access_token=${accessToken}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Contentful API error ${res.status} (${contentType}): ${await res.text()}`)
  }
  return res.json()
}

async function downloadImages(entry, assetsById, keepFiles) {
  const links = entry.fields.images || []
  const files = []
  let i = 0
  for (const link of links) {
    i += 1
    const asset = assetsById.get(link.sys?.id)
    const assetUrl = asset?.fields?.file?.url
    if (!assetUrl) {
      console.warn(`[fetch-services] Entry ${entry.sys.id}: image ${i} asset not found, skipping it.`)
      continue
    }
    const fileUrl = assetUrl.startsWith('//') ? `https:${assetUrl}` : assetUrl
    const ext = extensionFor(asset.fields.file.fileName, asset.fields.file.contentType)
    const fileName = `${entry.sys.id}-${i}${ext}`

    const imageRes = await fetch(fileUrl)
    if (!imageRes.ok) {
      console.warn(`[fetch-services] Entry ${entry.sys.id}: failed to download image ${i} (${imageRes.status}).`)
      continue
    }
    writeFileSync(join(assetsDir, fileName), Buffer.from(await imageRes.arrayBuffer()))
    keepFiles.add(fileName)
    files.push(fileName)
  }
  return files
}

async function main() {
  console.log('[fetch-services] Fetching service and serviceSubcategory entries from Contentful...')
  const [serviceData, subcategoryData] = await Promise.all([
    fetchAllEntries('service'),
    fetchAllEntries('serviceSubcategory'),
  ])

  const serviceAssets = new Map((serviceData.includes?.Asset || []).map((a) => [a.sys.id, a]))
  const subcategoryAssets = new Map((subcategoryData.includes?.Asset || []).map((a) => [a.sys.id, a]))

  mkdirSync(assetsDir, { recursive: true })
  mkdirSync(dirname(manifestPath), { recursive: true })

  const keepFiles = new Set()
  const services = []
  const slugBySysId = new Map()

  for (const entry of serviceData.items) {
    const title = entry.fields.title?.trim()
    const slug = entry.fields.slug?.trim()
    const description = entry.fields.description?.trim()
    if (!title || !slug || !description) {
      console.warn(`[fetch-services] Skipping service ${entry.sys.id}: missing title, slug, or description.`)
      continue
    }
    const images = await downloadImages(entry, serviceAssets, keepFiles)
    services.push({ slug, title, description, images, subcategories: [] })
    slugBySysId.set(entry.sys.id, slug)
  }
  const serviceBySlug = new Map(services.map((s) => [s.slug, s]))

  for (const entry of subcategoryData.items) {
    const title = entry.fields.title?.trim()
    const slug = entry.fields.slug?.trim()
    const description = entry.fields.description?.trim()
    const parentLink = entry.fields.service
    if (!title || !slug || !description || !parentLink) {
      console.warn(`[fetch-services] Skipping subcategory ${entry.sys.id}: missing title, slug, description, or parent service.`)
      continue
    }
    const parentSlug = slugBySysId.get(parentLink.sys?.id)
    const parentService = parentSlug && serviceBySlug.get(parentSlug)
    if (!parentService) {
      console.warn(`[fetch-services] Skipping subcategory ${entry.sys.id}: parent service not found (unpublished or deleted?).`)
      continue
    }
    const images = await downloadImages(entry, subcategoryAssets, keepFiles)
    parentService.subcategories.push({ slug, title, description, images })
  }

  for (const existing of readdirSync(assetsDir)) {
    if (existing === '.gitkeep' || keepFiles.has(existing)) continue
    rmSync(join(assetsDir, existing))
    console.log(`[fetch-services] Removed stale file ${existing}`)
  }

  writeFileSync(manifestPath, JSON.stringify(services, null, 2) + '\n')
  const subcategoryCount = services.reduce((n, s) => n + s.subcategories.length, 0)
  console.log(`[fetch-services] Wrote ${services.length} services (${subcategoryCount} subcategories) to src/data/services-manifest.json`)
}

main().catch((err) => {
  console.error('[fetch-services] Failed:', err.message)
  process.exit(1)
})
