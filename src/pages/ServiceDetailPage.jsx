import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ServiceDetail from '../components/ServiceDetail'
import Seo from '../components/Seo'
import { breadcrumbList, serviceSchema } from '../lib/seoSchema'
import { resolveServiceImages } from '../lib/serviceImages'
import './ServiceDetailPage.css'

import nationwideManpowerImage1 from '../assets/nationwide manpower/nationwide manpower deployment.webp'
import nationwideManpowerImage2 from '../assets/nationwide manpower/nationwide manpower deployment - 2.png'
import nationwideManpowerImage3 from '../assets/nationwide manpower/nationwide manpower deployment - 3.webp'

import nationwideTrainingImage1 from '../assets/nationwide training/nationwide training1.webp'
import nationwideTrainingImage2 from '../assets/nationwide training/nationwide training2.webp'
import nationwideTrainingImage3 from '../assets/nationwide training/nationwide training3.webp'

import nationwidesellingImage1 from '../assets/selling activity/nationwide selling.png'
import nationwidesellingImage2 from '../assets/selling activity/nationwide selling - 2.png'
import nationwidesellingImage3 from '../assets/selling activity/nationwide selling - 3.webp'

import posmImage1 from '../assets/gallery/7.png'
import posmImage2 from '../assets/gallery/8.png'
import posmImage3 from '../assets/gallery/9.png'

function ServiceDetailPage() {
  const { id } = useParams()

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
      description: 'With our nationwide reach and satellite offices, nationwide training can enhance job satisfaction, With our nationwide reach and satellite offices, our nationwide training programs can enhance job satisfaction, boost sales and productivity, and ultimately improve employee retention. In addition, we identify and secure professional, corporate training spaces across the country to ensure every session is conducted in a polished, business-appropriate environment. sales and productivity, and lastly improve employee retention.',
      image1: nationwideTrainingImage1,
      image2: nationwideTrainingImage2,
      image3: nationwideTrainingImage3
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
      image1: posmImage1,
      image2: posmImage2,
      image3: posmImage3,
      subcategories: [
        {
          id: 'interactive-installations',
          title: 'Interactive Installations',
          description: 'Engaging and interactive installations that enhance customer experience and brand visibility.'
        },
        {
          id: 'pop-up-shops',
          title: 'Pop-Up Shops',
          description: 'Turnkey pop-up shop and pop-up store activations in high-traffic malls, bazaars, and events nationwide, built to drive foot traffic, brand engagement, and immediate sales.'
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
  ].map((service) => {
    const titleText = typeof service.title === 'string'
      ? service.title
      : 'On-Ground Brand Activity Deployment & POSM Installation'
    const [image1, image2, image3] = resolveServiceImages(service.id, [
      { src: service.image1, alt: `${titleText} - Image 1` },
      { src: service.image2, alt: `${titleText} - Image 2` },
      { src: service.image3, alt: `${titleText} - Image 3` },
    ])
    return { ...service, image1, image2, image3 }
  })

  const service = servicesData.find(s => s.id === id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!service) {
    return (
      <div className="loading-container">
        <Seo title="Service Not Found | AdTalk Events" description="The service you're looking for doesn't exist. Explore AdTalk's nationwide manpower, training, and brand activation services." />
        <h2>Service not found</h2>
        <p>The service you're looking for doesn't exist.</p>
      </div>
    )
  }

  const serviceTitle = typeof service.title === 'string'
    ? service.title
    : 'On-Ground Brand Activity Deployment & POSM Installation'
  const servicePath = `/services/${service.id}`

  return (
    <div className="service-detail-page">
      <Seo
        title={`${serviceTitle} | AdTalk Events`}
        description={service.description}
        structuredData={[
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: serviceTitle, path: servicePath },
          ]),
          serviceSchema({ name: serviceTitle, description: service.description, path: servicePath }),
        ]}
      />
      <ServiceDetail service={service} />
    </div>
  )
}

export default ServiceDetailPage
