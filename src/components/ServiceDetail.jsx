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

  // Function to generate subcategory ID from title
  const generateSubcategoryId = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
      .trim()
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
        <div className="service-image-item">
          <img src={service.image1} alt={`${service.title} - Image 1`} loading="lazy" />
        </div>
        <div className="service-image-item">
          <img src={service.image2} alt={`${service.title} - Image 2`} loading="lazy" />
        </div>
        <div className="service-image-item">
          <img src={service.image3} alt={`${service.title} - Image 3`} loading="lazy" />
        </div>
      </div>

      <div className="service-detail-content">
        <h2>Service Details</h2>
        <p className="service-detail-description">{service.description}</p>
        
        {service.subcategories && (
          <div className="subcategories-section">
            <h3>Our Offerings</h3>
            <div className="subcategories-grid">
              {service.subcategories.map((sub, index) => {
                const subcategoryId = generateSubcategoryId(sub.title)
                return (
                  <Link 
                    key={index} 
                    to={`/services/${id}/subcategory/${subcategoryId}`}
                    className="subcategory-card-link"
                  >
                    <div className="subcategory-card">
                      <h4>{sub.title}</h4>
                      <p>{sub.description}</p>
                      {sub.subItems && (
                        <ul className="sub-items">
                          {sub.subItems.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                      <div className="learn-more-text">Learn More →</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceDetail
