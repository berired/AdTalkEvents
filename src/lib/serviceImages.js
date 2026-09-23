// Resolves images for services/subcategories from Contentful when available,
// falling back to the hardcoded local imports otherwise. Titles and
// descriptions stay hardcoded in the page components — only images come
// from Contentful. Run `npm run fetch-service-images` after changing images
// in Contentful to regenerate src/assets/service-images-cms/ and
// src/data/service-images-manifest.json, then commit the result.
import manifest from '../data/service-images-manifest.json'

const imageModules = import.meta.glob('../assets/service-images-cms/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default',
})

const imagesByFile = Object.fromEntries(
  Object.entries(imageModules).map(([path, src]) => [path.split('/').pop(), src])
)

export function resolveServiceImages(key, fallback) {
  const files = manifest[key]
  if (!files || files.length === 0) return fallback
  const resolved = files.map((file) => imagesByFile[file]).filter(Boolean)
  return resolved.length > 0 ? resolved : fallback
}
