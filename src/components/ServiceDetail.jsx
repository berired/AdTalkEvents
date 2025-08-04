import { Link } from 'react-router-dom'
import './ServiceDetail.css'

function ServiceDetail({ service, onBack }) {
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
        <div className="service-image-item">
          <img src={service.image1 || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop'} alt={`${service.title} - Image 1`} />
        </div>
        <div className="service-image-item">
          <img src={service.image2 || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop'} alt={`${service.title} - Image 2`} />
        </div>
        <div className="service-image-item">
          <img src={service.image3 || 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop'} alt={`${service.title} - Image 3`} />
        </div>
      </div>
      
      <div className="service-detail-content">
        <h2>Service Details</h2>
        <p className="service-detail-description">{service.description}</p>
        
        {service.subcategories && (
          <div className="subcategories-section">
            <h3>Our Offerings</h3>
            <div className="subcategories-grid">
              {service.subcategories.map((sub, index) => (
                <div key={index} className="subcategory-card">
                  <h4>{sub.title}</h4>
                  <p>{sub.description}</p>
                  {sub.subItems && (
                    <ul className="sub-items">
                      {sub.subItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceDetail
