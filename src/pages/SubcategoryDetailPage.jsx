import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './SubcategoryDetailPage.css'

function SubcategoryDetailPage() {
  const { serviceId, subcategoryId } = useParams()
  const navigate = useNavigate()
  const [subcategory, setSubcategory] = useState(null)
  const [loading, setLoading] = useState(true)

  // Complete subcategory data with images
  const subcategoriesData = {
    'nationwide-manpower-deployment': {
      'sales-associates-merchandisers': {
        id: 'nationwide-manpower-deployment',
        title: 'Sales Associates & Merchandisers',
        description: 'Skilled retail professionals ensuring optimal product placement and customer engagement in retail environments. Our sales associates are trained to understand customer needs, provide excellent service, and drive sales through effective communication and product knowledge. Our merchandisers specialize in visual marketing, ensuring products are displayed attractively and strategically to maximize visibility and sales potential.',
        image1: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
        image2: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop',
        image3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop'
      },
      'brand-ambassadors': {
        id: 'brand-ambassadors',
        title: 'Brand Ambassadors',
        description: 'Professional brand representatives trained to embody your brand values and engage with customers effectively. Our brand ambassadors are categorized into two classes based on their experience and capabilities: Class A - Premium brand representatives with extensive experience and exceptional communication skills, Class B - Standard brand ambassadors with solid training and proven track record.',
        image1: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop',
        image2: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=300&fit=crop',
        image3: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=300&fit=crop'
      },
      'promoter-sampler-push-girl-helper': {
        id: 'promoters-samplers-helpers',
        title: 'Promoter | Sampler | Push Girl | Helper',
        description: 'Experienced sampling specialists and promotional staff driving product trial and consumer interaction. Our team includes dedicated promoters who create excitement around your products, samplers who facilitate product trials and gather customer feedback, push girls who drive sales through personal interaction and product demonstrations, and helpers who provide essential support to ensure smooth operations during promotional events.',
        image1: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
        image2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop',
        image3: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=300&fit=crop'
      }
    },
    'onground-brandactivity-deployment-posminstallation-and-management-for-generaltrade-and-keyaccounts': {
      'interactive-installations': {
        id: 'interactive-installations',
        title: 'Interactive Installations',
        description: 'Engaging and interactive installations that enhance customer experience and brand visibility. Our interactive installations incorporate cutting-edge technology, creative design, and user-friendly interfaces to create memorable brand experiences. These installations are designed to encourage customer participation, generate social media buzz, and create lasting impressions that drive brand recall and customer loyalty.',
        image1: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=500&h=300&fit=crop',
        image2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
        image3: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop'
      },
      'pop-up-shops': {
        id: 'pop-up-shops',
        title: 'Pop-Up Shops',
        description: 'Temporary retail spaces designed to create unique shopping experiences and promote brand engagement. Our pop-up shops are strategically located in high-traffic areas and designed to capture attention, create exclusivity, and drive immediate sales. We handle everything from location scouting and design to staffing and inventory management, ensuring a seamless and successful temporary retail experience.',
        image1: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop',
        image2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
        image3: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=300&fit=crop'
      },
      'community-partnerships': {
        id: 'community-partnerships',
        title: 'Community Partnerships',
        description: 'Collaborative efforts with local businesses and organizations to enhance brand presence and community engagement. Our community partnership programs focus on building meaningful relationships with local stakeholders, supporting community initiatives, and creating positive brand associations. We work closely with schools, local governments, NGOs, and community organizations to develop mutually beneficial partnerships that strengthen your brand presence in target markets.',
        image1: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=300&fit=crop',
        image2: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=300&fit=crop',
        image3: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop'
      },
      'gamified-engagement-campaigns': {
        id: 'gamified-engagement-campaigns',
        title: 'Gamified Engagement Campaigns',
        description: 'Innovative campaigns that use gamification to engage customers and promote brand loyalty. Our gamified engagement campaigns incorporate elements such as points, badges, leaderboards, and rewards to create exciting and interactive experiences. These campaigns are designed to increase customer participation, extend engagement duration, and create positive emotional connections with your brand through fun and competitive activities.',
        image1: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=500&h=300&fit=crop',
        image2: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=300&fit=crop',
        image3: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=500&h=300&fit=crop'
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const serviceSubcategories = subcategoriesData[serviceId]
      if (serviceSubcategories && serviceSubcategories[subcategoryId]) {
        setSubcategory(serviceSubcategories[subcategoryId])
      }
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [serviceId, subcategoryId])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [serviceId, subcategoryId])

  const handleBackClick = () => {
    navigate(`/services/${serviceId}`)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading subcategory details...</p>
      </div>
    )
  }

  if (!subcategory) {
    return (
      <div className="loading-container">
        <h2>Subcategory not found</h2>
        <p>The subcategory you're looking for doesn't exist.</p>
        <button onClick={handleBackClick} className="back-btn">Back to Service</button>
      </div>
    )
  }

  return (
    <div className="subcategory-detail-page">
      <div className="subcategory-detail-container">
        <div className="subcategory-detail-header">
          <button onClick={handleBackClick} className="back-btn">
            ← Back to Service
          </button>
          <h1 className="subcategory-detail-title">{subcategory.title}</h1>
        </div>
        
        <div className="subcategory-images-grid">
          <div className="subcategory-image-item">
            <img src={subcategory.image1} alt={`${subcategory.title} - Image 1`} />
          </div>
          <div className="subcategory-image-item">
            <img src={subcategory.image2} alt={`${subcategory.title} - Image 2`} />
          </div>
          <div className="subcategory-image-item">
            <img src={subcategory.image3} alt={`${subcategory.title} - Image 3`} />
          </div>
        </div>
        
        <div className="subcategory-detail-content">
          <h2>About This Service</h2>
          <p className="subcategory-detail-description">{subcategory.description}</p>
        </div>
      </div>
    </div>
  )
}

export default SubcategoryDetailPage
