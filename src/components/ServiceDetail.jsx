import { Link, useParams } from 'react-router-dom'
import './ServiceDetail.css'

function ServiceDetail({ service, onBack }) {
  const { id } = useParams()

  const handleBackClick = (e) => {
    e.preventDefault()
    if (onBack) {
      onBack()
    } else {
      // Fallback to navigate to services page
      window.location.href = '/services'
    }
  }

  if (!service) {
    return (
      <div className="service-detail-container">
        <div className="service-not-found">
          <h2>Service not found</h2>
          <button onClick={handleBackClick} className="back-btn">Back to Services</button>
        </div>
      </div>
    )
  }

  return (
    <div className="service-detail-container">
      <div className="service-detail-header">
        <button onClick={handleBackClick} className="back-btn">
          ← Back to Services
        </button>
        <h1 className="service-detail-title">{service.title}</h1>
      </div>

      <div className="service-images-grid">
        {service.images.map((src, idx) => (
          <div className="service-image-item" key={idx}>
            <img src={src} alt={`${service.title} - Image ${idx + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      <div className="service-detail-content">
        <h2>Service Details</h2>
        <p className="service-detail-description">{service.description}</p>

        {service.subcategories && service.subcategories.length > 0 && (
          <div className="subcategories-section">
            <h3>Our Offerings</h3>
            <div className="subcategories-grid">
              {service.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/services/${id}/subcategory/${sub.id}`}
                  className="subcategory-card-link"
                >
                  <div className="subcategory-card">
                    <h4>{sub.title}</h4>
                    <p>{sub.description}</p>
                    <div className="learn-more-text">Learn More →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceDetail
