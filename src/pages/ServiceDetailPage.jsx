import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ServiceDetail from '../components/ServiceDetail'
import './ServiceDetailPage.css'

function ServiceDetailPage() {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock services data - in a real app, this would come from an API
  const servicesData = [
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
    // Simulate API call
    const timer = setTimeout(() => {
      const foundService = servicesData.find(s => s.id === id)
      setService(foundService)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading service details...</p>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="loading-container">
        <h2>Service not found</h2>
        <p>The service you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="service-detail-page">
      <ServiceDetail service={service} />
    </div>
  )
}

export default ServiceDetailPage
