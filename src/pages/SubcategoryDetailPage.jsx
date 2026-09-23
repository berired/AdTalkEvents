import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Seo from '../components/Seo'
import { breadcrumbList, serviceSchema } from '../lib/seoSchema'
import { resolveServiceImages } from '../lib/serviceImages'
import './SubcategoryDetailPage.css'

// Import images
import promoterImage1 from '../assets/nationwide manpower/promoter, sampler, push girl/promoter, sampler, push girl.webp'
import promoterImage2 from '../assets/nationwide manpower/promoter, sampler, push girl/promoter, sampler, push girl  - 2.webp'
import promoterImage3 from '../assets/nationwide manpower/promoter, sampler, push girl/promoter, sampler, push girl - 3.webp'

import sellingImage1 from '../assets/selling activity/nationwide selling.png'
import sellingImage2 from '../assets/selling activity/nationwide selling - 2.png'
import sellingImage3 from '../assets/selling activity/nationwide selling - 3.webp'

import manpowerImage1 from '../assets/nationwide manpower/nationwide manpower deployment.webp'
import manpowerImage2 from '../assets/nationwide manpower/nationwide manpower deployment - 2.png'
import manpowerImage3 from '../assets/nationwide manpower/nationwide manpower deployment - 3.webp'

import galleryImage1 from '../assets/gallery/1.webp'
import galleryImage2 from '../assets/gallery/2.webp'
import galleryImage3 from '../assets/gallery/3.webp'
import galleryImage4 from '../assets/gallery/4.png'
import galleryImage5 from '../assets/gallery/5.png'
import galleryImage6 from '../assets/gallery/6.png'
import galleryImage7 from '../assets/gallery/7.png'
import galleryImage8 from '../assets/gallery/8.png'
import galleryImage10 from '../assets/gallery/10.png'
import galleryImage11 from '../assets/gallery/11.webp'
import galleryImage12 from '../assets/gallery/12.png'
import galleryImage13 from '../assets/gallery/13.webp'

function SubcategoryDetailPage() {
  const { serviceId, subcategoryId } = useParams()
  const navigate = useNavigate()

  // Complete subcategory data with images
  const subcategoriesData = {
    'nationwide-manpower-deployment': {
      'sales-associates-merchandisers': {
        id: 'nationwide-manpower-deployment',
        title: 'Sales Associates & Merchandisers',
        description: 'Skilled retail professionals ensuring optimal product placement and customer engagement in retail environments. Our sales associates are trained to understand customer needs, provide excellent service, and drive sales through effective communication and product knowledge. Our merchandisers specialize in visual marketing, ensuring products are displayed attractively and strategically to maximize visibility and sales potential.',
        image1: sellingImage1,
        image2: sellingImage2,
        image3: sellingImage3
      },
      'brand-ambassadors': {
        id: 'brand-ambassadors',
        title: 'Brand Ambassadors',
        description: 'Professional brand representatives trained to embody your brand values and engage with customers effectively. Our brand ambassadors are categorized into two classes based on their experience and capabilities: Class A - Premium brand representatives with extensive experience and exceptional communication skills, Class B - Standard brand ambassadors with solid training and proven track record. *Photos available upon request',
        image1: manpowerImage1,
        image2: manpowerImage2,
        image3: manpowerImage3
      },
      'promoter-sampler-push-girl-helper': {
        id: 'promoters-samplers-helpers',
        title: 'Promoter | Sampler | Push Girl | Helper',
        description: 'Experienced sampling specialists and promotional staff driving product trial and consumer interaction. Our team includes dedicated promoters who create excitement around your products, samplers who facilitate product trials and gather customer feedback, push girls who drive sales through personal interaction and product demonstrations, and helpers who provide essential support to ensure smooth operations during promotional events.',
        image1: promoterImage1,
        image2: promoterImage2,
        image3: promoterImage3
      }
    },
    'onground-brandactivity-deployment-posminstallation-and-management-for-generaltrade-and-keyaccounts': {
      'interactive-installations': {
        id: 'interactive-installations',
        title: 'Interactive Installations',
        description: 'Engaging and interactive installations that enhance customer experience and brand visibility. Our interactive installations incorporate cutting-edge technology, creative design, and user-friendly interfaces to create memorable brand experiences. These installations are designed to encourage customer participation, generate social media buzz, and create lasting impressions that drive brand recall and customer loyalty.',
        image1: galleryImage10,
        image2: galleryImage11,
        image3: galleryImage12
      },
      'pop-up-shops': {
        id: 'pop-up-shops',
        title: 'Pop-Up Shops',
        description: 'AdTalk designs and manages nationwide pop-up shop and pop-up store activations, turning malls, bazaars, transport hubs, and event venues into short-term retail spaces built to capture attention and convert foot traffic into sales. Our team handles every detail of your temporary retail space, from site scouting, permits, and booth design to trained on-site staff and inventory management, so product launches, seasonal campaigns, and brand activations run smoothly from setup to teardown.',
        highlights: [
          'Prime pop-up shop locations in high-footfall malls, bazaars, and transport hubs nationwide',
          'End-to-end setup: permits, booth design and fabrication, and on-brand styling',
          'Trained promoters, sales associates, and merchandisers for the full activation period',
          'Inventory and sales tracking to keep every pop-up store activation running smoothly',
          'Flexible temporary retail spaces for product launches, seasonal campaigns, and clearance sales'
        ],
        image1: galleryImage4,
        image2: galleryImage5,
        image3: galleryImage6
      },
      'community-partnerships': {
        id: 'community-partnerships',
        title: 'Community Partnerships',
        description: 'Collaborative efforts with local businesses and organizations to enhance brand presence and community engagement. Our community partnership programs focus on building meaningful relationships with local stakeholders, supporting community initiatives, and creating positive brand associations. We work closely with schools, local governments, NGOs, and community organizations to develop mutually beneficial partnerships that strengthen your brand presence in target markets.',
        image1: galleryImage1,
        image2: galleryImage2,
        image3: galleryImage3
      },
      'gamified-engagement-campaigns': {
        id: 'gamified-engagement-campaigns',
        title: 'Gamified Engagement Campaigns',
        description: 'Innovative campaigns that use gamification to engage customers and promote brand loyalty. Our gamified engagement campaigns incorporate elements such as points, badges, leaderboards, and rewards to create exciting and interactive experiences. These campaigns are designed to increase customer participation, extend engagement duration, and create positive emotional connections with your brand through fun and competitive activities.',
        image1: galleryImage13,
        image2: galleryImage7,
        image3: galleryImage8
      }
    }
  }

  Object.values(subcategoriesData).forEach((subcategoriesForService) => {
    Object.entries(subcategoriesForService).forEach(([key, sub]) => {
      const [image1, image2, image3] = resolveServiceImages(key, [sub.image1, sub.image2, sub.image3])
      sub.image1 = image1
      sub.image2 = image2
      sub.image3 = image3
    })
  })

  const subcategory = subcategoriesData[serviceId]?.[subcategoryId]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [serviceId, subcategoryId])

  const handleBackClick = () => {
    navigate(`/services/${serviceId}`)
  }

  if (!subcategory) {
    return (
      <div className="loading-container">
        <Seo title="Subcategory Not Found | AdTalk Events" description="The subcategory you're looking for doesn't exist. Explore AdTalk's nationwide manpower, training, and brand activation services." />
        <h2>Subcategory not found</h2>
        <p>The subcategory you're looking for doesn't exist.</p>
        <button onClick={handleBackClick} className="back-btn">Back to Service</button>
      </div>
    )
  }

  const subcategoryPath = `/services/${serviceId}/subcategory/${subcategoryId}`

  return (
    <div className="subcategory-detail-page">
      <Seo
        title={`${subcategory.title} | AdTalk Events`}
        description={subcategory.description}
        structuredData={[
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: subcategory.title, path: subcategoryPath },
          ]),
          serviceSchema({ name: subcategory.title, description: subcategory.description, path: subcategoryPath }),
        ]}
      />
      <div className="subcategory-detail-container">
        <div className="subcategory-detail-header">
          <button onClick={handleBackClick} className="back-btn">
            ← Back to Service
          </button>
          <h1 className="subcategory-detail-title">{subcategory.title}</h1>
        </div>

        <div className="subcategory-images-grid">
          <div className="subcategory-image-item subcategory-image-1">
            <img src={subcategory.image1} alt={`${subcategory.title} - Image 1`} loading="lazy" />
          </div>
          <div className="subcategory-image-item subcategory-image-2">
            <img src={subcategory.image2} alt={`${subcategory.title} - Image 2`} loading="lazy" />
          </div>
          <div className="subcategory-image-item subcategory-image-3 landscape-image">
            <img src={subcategory.image3} alt={`${subcategory.title} - Image 3`} loading="lazy" />
          </div>
        </div>

        <div className="subcategory-detail-content">
          <h2>About This Service</h2>
          <p className="subcategory-detail-description">{subcategory.description}</p>
          {subcategory.highlights && (
            <ul className="subcategory-highlights">
              {subcategory.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubcategoryDetailPage
