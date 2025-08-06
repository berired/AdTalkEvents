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
      id: 'nationwide-manpower-deployment',
      title: 'Nationwide Manpower Deployment',
      description: 'Depending on the clients requirements our team makes a strategic process of allocating and utilizing a workforce to effectively meet organizational goals and project requirements.',
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
          title: 'Promoter | Sampler | Push Girl | Helper',
          description: 'Experienced sampling specialists and promotional staff driving product trial and consumer interaction.'
        }
      ]
    },
    {
      id: 'nationwide-training-capabilities',
      title: 'Nationwide Training Capabilities',
      description: 'With our nationwide reach and satellite offices, nationwide training can enhance job satisfaction, booth sales and productivity, and lastly improve employee retention.',
      image1: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop'
    },
    {
      id: 'nationwide-sampling-selling-and-merchandising',
      title: 'Nationwide Sampling, Selling & Merchandising',
      description: 'Executing and overseeing the activity with seasoned team lead and account executives from our team.',
      image1: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop'
    },
    {
      id: 'events-conceptualization-management-execution',
      title: 'Events Conceptualization, Management & Execution',
      description: 'Encompasses the entire process of planning, organizing, and executing events from initial concept and requirements to post-event evaluation.',
      image1: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop'
    },
    {
      id: 'onground-brandactivity-deployment-posminstallation-and-management-for-generaltrade-and-keyaccounts',
      title: 'On-Ground Brand Activity Deployment including POSM Installation & Management for General Trade and Key Accounts',
      description: 'Professional merchandising installation services for general trade outlets and key account establishments.',
      image1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop',
      subcategories: [
        {
          title: 'Interactive Installations',
          description: 'Engaging and interactive installations that enhance customer experience and brand visibility.'
        },
        {
          title: 'Pop-Up Shops',
          description: 'Temporary retail spaces designed to create unique shopping experiences and promote brand engagement.'
        },
        {
          title: 'Community Partnerships',
          description: 'Collaborative efforts with local businesses and organizations to enhance brand presence and community engagement.'
        },
        {
          title: 'Gamified Engagement Campagains',
          description: 'Innovative campaigns that use gamification to engage customers and promote brand loyalty.',
        }
      ]
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
