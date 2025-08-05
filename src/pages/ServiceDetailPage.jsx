import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ServiceDetail from '../components/ServiceDetail'
import './ServiceDetailPage.css'

function ServiceDetailPage() {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  const servicesData = [
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
      description: 'Depending on the clients requirements our team makes a strategic process of allocating and utilizing a workforce to effectively meet organizational goals and project requirements',
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
      description: 'Encompasses the entire process of planning, organizing, and executing events from initial concept and requirements to post-event evaluation.',
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
      description: 'Executing and overseeing the activity with seasoned team lead and account executives from our team',
      image1: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop'
    },
    {
      id: 'nationwide-training-capabilities',
      title: 'Nationwide Training Capabilities',
      description: 'With our nationwide reach and satellite offices, nationwide training can enhance job satisfaction, boost sales and productivity, and lastly improve employee retention.',
      image1: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop'
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

  // Scroll to top when component mounts or when the service ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
