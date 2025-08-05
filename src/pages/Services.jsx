import { useNavigate } from 'react-router-dom'
import './Services.css'

function Services() {
  const navigate = useNavigate()

  const services = [
    {
      id: 'on-ground-brand-activity-deployment',
      title: 'On-Ground Brand Activity Deployment',
      description: 'Bridge the gap between your market and your brand through an unforgettable experience. We\'ll transform how your customers see your company and products by bringing your vision to life.',
      image1: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop',
      subcategories: [
        {
          title: 'Interactive Installations',
          description: 'Immersive brand experiences through interactive displays, technology-driven installations, and hands-on demonstrations that captivate audiences and create memorable brand interactions.'
        },
        {
          title: 'Pop-Up Shops',
          description: 'Temporary retail spaces strategically placed in high-traffic areas to create buzz, drive immediate sales, and provide customers with exclusive brand experiences and product access.'
        },
        {
          title: 'Community Partnerships',
          description: 'Collaborative initiatives with local organizations, schools, and community groups to enhance brand visibility, build goodwill, and establish meaningful connections within target communities.'
        },
        {
          title: 'Gamified Engagement Campaigns',
          description: 'Interactive campaigns that incorporate game mechanics, contests, and reward systems to boost customer participation, engagement, and brand loyalty through fun and competitive activities.'
        }
      ]
    },
    {
      id: 'nationwide-manpower-deployment',
      title: 'Nationwide Manpower Deployment',
      description: 'Skilled personnel deployment including flyering agents, sales associates, merchandisers, samplers, push girls, and brand ambassadors.',
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
      id: 'conventions-eventsconceptualization-management-execution',
      title: 'Conventions, Events Conceptualization, Management & Execution',
      description: 'Full-service convention management including booth setup, staff coordination, and visitor engagement activities.',
      image1: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop'
    },
    {
      id: 'posminstallation-managementforgeneraltrade-and-key-accounts',
      title: 'POSM Installation (Point-of-Sales-Material) & Management for General Trade and Key Accounts',
      description: 'Professional merchandising installation services for general trade outlets and key account establishments.',
      image1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop'
    },
    {
      id: 'nationwide-sampling-andor-selling-activity',
      title: 'Nationwide Sampling and or Selling Activity',
      description: 'Executing and overseeing the activity with seasoned team lead and account executives from our team.',
      image1: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop'
    },
    {
      id: 'nationwide-training-capabilities',
      title: 'Nationwide Training Capabilities',
      description: 'We can train your team nationwide, ensuring consistent brand messaging and product knowledge across all locations.',
      image1: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop'
    }
  ]

  const handleServiceClick = (serviceId) => {
    // Navigate to the ServiceDetailPage route instead of using hash navigation
    navigate(`/services/${serviceId}`)
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
