import { useState } from 'react'
import './Gallery.css'

// Import gallery images
import img1 from '../assets/gallery/1.png'
import img2 from '../assets/gallery/2.png'
import img3 from '../assets/gallery/3.png'
import img4 from '../assets/gallery/4.png'
import img5 from '../assets/gallery/5.png'
import img6 from '../assets/gallery/6.png'
import img7 from '../assets/gallery/7.png'
import img8 from '../assets/gallery/8.png'
import img9 from '../assets/gallery/9.png'
import img10 from '../assets/gallery/10.png'
import img11 from '../assets/gallery/11.png'
import img12 from '../assets/gallery/12.png'
import img13 from '../assets/gallery/13.png'

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
      <h1 className="gallery-title">Gallery</h1>
      <br />
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