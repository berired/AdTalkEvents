import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ServiceDetail from '../components/ServiceDetail'
import './ServiceDetailPage.css'

import nationwideManpowerImage1 from '../assets/nationwide manpower/nationwide manpower deployment.png'
import nationwideManpowerImage2 from '../assets/nationwide manpower/nationwide manpower deployment - 2.png'
import nationwideManpowerImage3 from '../assets/nationwide manpower/nationwide manpower deployment - 3.png'

import nationwidesellingImage1 from '../assets/selling activity/nationwide selling.png'
import nationwidesellingImage2 from '../assets/selling activity/nationwide selling - 2.png'
import nationwidesellingImage3 from '../assets/selling activity/nationwide selling - 3.png'

function ServiceDetailPage() {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  const servicesData = [
    {
      id: 'nationwide-manpower-deployment',
      title: 'Nationwide Manpower Deployment',
      description: "Depending on the client's requirements, our team makes a strategic process of allocating and utilizing a workforce to effectively meet organizational goals and project requirements. Skilled personnel such as promoter, sampler, push girl, sales associate, merchandiser, brand ambassadors.",
      image1: nationwideManpowerImage1,
      image2: nationwideManpowerImage2,
      image3: nationwideManpowerImage3,
      subcategories: [
        {
          id: 'promoter-sampler-push-girl-helper',
          title: 'Promoter | Sampler | Push Girl | Helper',
          description: 'Experienced sampling specialists and promotional staff driving product trial and consumer interaction.'
        },
        {
          id: 'sales-associates-merchandisers',
          title: 'Sales Associate | Merchandisers',
          description: 'Skilled retail professionals ensuring optimal product placement and customer engagement in retail environments.'
        },
        {
          id: 'brand-ambassadors',
          title: 'Brand Ambassadors',
          description: 'Professional brand representatives trained to embody your brand values and engage with customers effectively.',
          subItems: ['Class A - Premium brand representatives', 'Class B - Standard brand ambassadors']
        },
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
      image1: nationwidesellingImage1,
      image2: nationwidesellingImage2,
      image3: nationwidesellingImage3
    },
    {
      id: 'onground-brandactivity-deployment-posminstallation-and-management-for-generaltrade-and-keyaccounts',
      title: (
        <>
          On-Ground Brand Activity Deployment<br />POSM Installation & Management for General Trade and Key Account
        </>
      ),
      description: 'Professional merchandising installation services for general trade outlets and key account establishments.',
      image1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop',
      subcategories: [
        {
          id: 'interactive-installations',
          title: 'Interactive Installations',
          description: 'Engaging and interactive installations that enhance customer experience and brand visibility.'
        },
        {
          id: 'pop-up-shops',
          title: 'Pop-Up Shops',
          description: 'Temporary retail spaces designed to create unique shopping experiences and promote brand engagement.'
        },
        {
          id: 'community-partnerships',
          title: 'Community Partnerships',
          description: 'Collaborative efforts with local businesses and organizations to enhance brand presence and community engagement.'
        },
        {
          id: 'gamified-engagement-campaigns',
          title: 'Gamified Engagement Campaigns',
          description: 'Innovative campaigns that use gamification to engage customers and promote brand loyalty.',
        }
      ]
    }
  ]

  useEffect(() => {
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
