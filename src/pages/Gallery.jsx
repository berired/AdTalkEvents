import { useState, useRef, useEffect } from 'react'
import './Gallery.css'
import Seo from '../components/Seo'
import { breadcrumbList } from '../lib/seoSchema'
import galleryManifest from '../data/gallery-manifest.json'

// Images + captions come from Contentful. Run `npm run fetch-gallery` after
// changing content in Contentful to regenerate src/assets/gallery-cms/ and
// src/data/gallery-manifest.json, then commit the result.
const galleryImageModules = import.meta.glob('../assets/gallery-cms/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default',
})

const imagesByFile = Object.fromEntries(
  Object.entries(galleryImageModules).map(([path, src]) => [path.split('/').pop(), src])
)

const images = galleryManifest
  .map(({ file, caption }) => ({ file, src: imagesByFile[file], caption }))
  .filter((item) => item.src)

function Gallery() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const closeButtonRef = useRef(null)
  const lastTriggerRef = useRef(null)

  const openModal = (idx, triggerEl) => {
    lastTriggerRef.current = triggerEl
    setSelectedIdx(idx)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
    setSelectedIdx(null)
    lastTriggerRef.current?.focus()
  }

  useEffect(() => {
    if (!modalOpen) return

    closeButtonRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [modalOpen])

  return (
    <div className="gallery-container">
      <Seo
        title="Event Gallery | AdTalk Events"
        description="Browse photos from AdTalk Events' nationwide brand activation campaigns, manpower deployments, and promotional events across the Philippines."
        structuredData={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ])}
      />
      <h1 className="gallery-title">Gallery</h1>
      <br />
      {images.length === 0 ? (
        <p className="gallery-empty">Gallery photos coming soon.</p>
      ) : (
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <button
              key={img.file || idx}
              type="button"
              className="gallery-item"
              onClick={(e) => openModal(idx, e.currentTarget)}
            >
              <img src={img.src} alt={img.caption || `Event ${idx + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}
      {modalOpen && (
        <div className="gallery-modal" onClick={closeModal}>
          <div
            className="gallery-modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={images[selectedIdx].caption || `Event photo ${selectedIdx + 1}`}
            onClick={e => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="gallery-modal-close"
              onClick={closeModal}
              aria-label="Close image"
            >
              &times;
            </button>
            <img
              src={images[selectedIdx].src}
              alt={images[selectedIdx].caption || `Event ${selectedIdx + 1} enlarged`}
            />
            {images[selectedIdx].caption && (
              <p className="gallery-modal-caption">{images[selectedIdx].caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery 