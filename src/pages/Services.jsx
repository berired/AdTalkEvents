import { useNavigate } from 'react-router-dom'
import './Services.css'
import Seo from '../components/Seo'
import { breadcrumbList } from '../lib/seoSchema'
import servicesManifest from '../data/services-manifest.json'

// Content + images come from Contentful. Run `npm run fetch-services` after
// changing content in Contentful to regenerate src/assets/services-cms/ and
// src/data/services-manifest.json, then commit the result.
const serviceImageModules = import.meta.glob('../assets/services-cms/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default',
})

const imagesByFile = Object.fromEntries(
  Object.entries(serviceImageModules).map(([path, src]) => [path.split('/').pop(), src])
)

const services = servicesManifest.map((service) => ({
  id: service.slug,
  title: service.title,
  description: service.description,
  images: (service.images || []).map((file) => imagesByFile[file]).filter(Boolean),
}))

function Services() {
  const navigate = useNavigate()

  const handleServiceClick = (serviceId) => {
    // Navigate to the ServiceDetailPage route instead of using hash navigation
    navigate(`/services/${serviceId}`)
  }

  return (
    <div className="services-container">
      <Seo
        title="Our Services | AdTalk Events"
        description="Explore AdTalk's nationwide services: manpower deployment, training, sampling & selling, merchandising, and on-ground brand activation for general trade and key accounts."
        structuredData={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <div className="services-header">
        <h1 className="services-title">Our Specialized Services</h1>
        <p className="services-subtitle">
          We provide comprehensive brand activation and promotional solutions with nationwide reach, delivering exceptional results through strategic planning and professional execution. <br /> Photos may be provided upon request.
        </p>
      </div>

      {services.length === 0 ? (
        <p className="services-empty">Services coming soon.</p>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-item" onClick={() => handleServiceClick(service.id)}>
              <div className="service-images">
                {service.images.map((src, idx) => (
                  <img key={idx} src={src} alt={`${service.title} ${idx + 1}`} loading="lazy" />
                ))}
              </div>
              <div className="service-info">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button className="learn-more-btn">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Services
