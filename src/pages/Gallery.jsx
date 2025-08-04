import { useState } from 'react'
import './Gallery.css'

const images = [
  // Event images
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=500&fit=crop',
  // Extra images
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=500&fit=crop',
]

function Gallery() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImg, setSelectedImg] = useState(null)

  const openModal = (img) => {
    setSelectedImg(img)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
    setSelectedImg(null)
  }

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Adtalk Gallery</h1>
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <div key={idx} className="gallery-item" onClick={() => openModal(img)}>
            <img src={img} alt={`Event ${idx + 1}`} />
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={closeModal}>&times;</button>
            <img src={selectedImg} alt="Large event" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery 