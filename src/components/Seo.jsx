import { useEffect } from 'react'
import logo from '../assets/adtalk logo.jpg'

const SITE_NAME = 'AdTalk Events'

function truncate(text, maxLength = 157) {
  if (!text || text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}...`
}

function Seo({ title, description, structuredData }) {
  const desc = truncate(description)
  const ogImage = new URL(logo, window.location.origin).toString()
  const canonicalUrl = `${window.location.origin}${window.location.pathname}`

  // Mutates the single <title> element already present in index.html instead of
  // rendering a JSX <title>, since createRoot (no hydration) never removes the
  // static one — a second React-rendered <title> would just duplicate it.
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </>
  )
}

export default Seo
