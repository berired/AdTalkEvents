import './ServiceCard.css'

function ServiceCard({ service, onClick }) {
  return (
    <div className="service-card-component" onClick={() => onClick && onClick(service.id)}>
      <div className="service-image-container">
        <img 
          src={service.image1 || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop'} 
          alt={service.title} 
          className="service-image"
        />
        <div className="service-overlay">
          <span className="view-details-btn">
            View Details
          </span>
        </div>
      </div>
      <div className="service-content">
        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">
          {service.description.length > 100 
            ? `${service.description.substring(0, 100)}...` 
            : service.description
          }
        </p>
      </div>
    </div>
  )
}

export default ServiceCard
