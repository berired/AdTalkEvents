import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ServiceDetail from '../components/ServiceDetail'
import './Services.css'

function Services() {
  const location = useLocation()
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      id: 'brand-activations',
      title: 'Brand Activations',
      description: 'Bridge the gap between your market and your brand through an unforgettable experience. We\'ll transform how your customers see your company and products by bringing your vision to life through strategic brand activation campaigns.',
      image1: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop',
      subcategories: [
        {
          title: 'Events',
          description: 'Comprehensive event planning and execution for brand launches, product demonstrations, and customer engagement activities.'
        },
        {
          title: 'Games',
          description: 'Interactive gaming experiences and competitions designed to increase brand awareness and customer participation.'
        },
        {
          title: 'Booths',
          description: 'Professional booth design, setup, and management for trade shows, exhibitions, and promotional events.'
        }
      ]
    },
    {
      id: 'manpower-deployment',
      title: 'Manpower Deployment',
      description: 'Skilled personnel deployment including trained professionals to represent your brand with excellence across various promotional activities and customer touchpoints.',
      image1: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop',
      subcategories: [
        {
          title: 'Sales Associates & Merchandisers',
          description: 'Skilled retail professionals ensuring optimal product placement and customer engagement in retail environments.'
        },
        {
          title: 'Brand Ambassadors',
          description: 'Professional brand representatives trained to embody your brand values and engage with customers effectively.',
          subItems: ['Class A - Premium brand representatives', 'Class B - Standard brand ambassadors', 'Class C - Entry-level brand promoters']
        },
        {
          title: 'Flyering Agents',
          description: 'Professional distribution specialists for promotional materials and brand awareness campaigns.'
        },
        {
          title: 'Promoters / Samplers, Push Girls, Helpers',
          description: 'Experienced sampling specialists and promotional staff driving product trial and consumer interaction.'
        }
      ]
    },
    {
      id: 'conventions-trade-shows',
      title: 'Conventions & Trade Shows',
      description: 'Full-service convention and trade show management including booth setup, staff coordination, visitor engagement activities, and comprehensive event logistics to ensure your brand stands out at industry events.',
      image1: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop'
    },
    {
      id: 'merchandise-installation',
      title: 'Merchandise Installation & Management for General Trade and Key Accounts',
      description: 'Professional merchandising installation and management services for general trade outlets and key account establishments, ensuring optimal product visibility and strategic placement to maximize sales impact.',
      image1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop'
    }
  ]

  useEffect(() => {
    // Check for hash in URL to show specific service
    const hash = location.hash.replace('#', '')
    if (hash) {
      const service = services.find(s => s.id === hash)
      if (service) {
        setSelectedService(service)
      }
    }
  }, [location.hash])

  const handleServiceClick = (serviceId) => {
    const service = services.find(s => s.id === serviceId)
    setSelectedService(service)
  }

  const handleBackToServices = () => {
    setSelectedService(null)
    window.history.pushState(null, null, '/services')
  }

  if (selectedService) {
    return <ServiceDetail service={selectedService} onBack={handleBackToServices} />
  }

  return (
    <div className="services-container">
      <div className="services-header">
        <h1 className="services-title">Our Specialized Services</h1>
        <p className="services-subtitle">
          We provide comprehensive brand activation and promotional solutions with nationwide reach, delivering exceptional results through strategic planning and professional execution.
        </p>
      </div>
      
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-item" onClick={() => handleServiceClick(service.id)}>
            <div className="service-images">
              <img src={service.image1} alt={`${service.title} 1`} />
              <img src={service.image2} alt={`${service.title} 2`} />
              <img src={service.image3} alt={`${service.title} 3`} />
            </div>
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
