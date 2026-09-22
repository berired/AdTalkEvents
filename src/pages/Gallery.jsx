import { useState, useRef, useEffect } from 'react'
import './Gallery.css'
import Seo from '../components/Seo'
import { breadcrumbList } from '../lib/seoSchema'

// Import gallery images
import img1 from '../assets/gallery/1.webp'
import img2 from '../assets/gallery/2.webp'
import img3 from '../assets/gallery/3.webp'
import img4 from '../assets/gallery/4.png'
import img5 from '../assets/gallery/5.png'
import img6 from '../assets/gallery/6.png'
import img7 from '../assets/gallery/7.png'
import img8 from '../assets/gallery/8.png'
import img9 from '../assets/gallery/9.png'
import img10 from '../assets/gallery/10.png'
import img11 from '../assets/gallery/11.webp'
import img12 from '../assets/gallery/12.png'
import img13 from '../assets/gallery/13.webp'

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13
]

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
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            className="gallery-item"
            onClick={(e) => openModal(idx, e.currentTarget)}
          >
            <img src={img} alt={`Event ${idx + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      {modalOpen && (
        <div className="gallery-modal" onClick={closeModal}>
          <div
            className="gallery-modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={`Event photo ${selectedIdx + 1}`}
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
            <img src={images[selectedIdx]} alt={`Event ${selectedIdx + 1} enlarged`} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery 