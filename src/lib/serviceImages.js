// Resolves images (+ alt text) for services/subcategories from Contentful
// when available, falling back to the hardcoded local imports otherwise.
// Titles and descriptions stay hardcoded in the page components — only
// images (and their alt text) come from Contentful. Run
// `npm run fetch-service-images` after changing images in Contentful to
// regenerate src/assets/service-images-cms/ and
// src/data/service-images-manifest.json, then commit the result.
//
// `fallback` and the return value are both arrays of { src, alt }.
import manifest from '../data/service-images-manifest.json'

const imageModules = import.meta.glob('../assets/service-images-cms/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default',
})

const imagesByFile = Object.fromEntries(
  Object.entries(imageModules).map(([path, src]) => [path.split('/').pop(), src])
)

export function resolveServiceImages(key, fallback) {
  const items = manifest[key]
  if (!items || items.length === 0) return fallback

  const resolved = items
    .map((item, idx) => {
      const src = imagesByFile[item.file]
      if (!src) return null
      // Fall back to the hardcoded alt text for this slot if the
      // Contentful asset doesn't have a Description/Title set.
      const alt = item.alt || fallback[idx]?.alt || ''
      return { src, alt }
    })
    .filter(Boolean)

  return resolved.length > 0 ? resolved : fallback
}
