import { useNavigate } from 'react-router-dom'
import './Services.css'

import nationwideManpowerImage1 from '../assets/nationwide manpower/nationwide manpower deployment.png'
import nationwideManpowerImage2 from '../assets/nationwide manpower/nationwide manpower deployment - 2.png'
import nationwideManpowerImage3 from '../assets/nationwide manpower/nationwide manpower deployment - 3.png'

import nationwideTrainingImage1 from '../assets/nationwide training/nationwide training1.jpg'
import nationwideTrainingImage2 from '../assets/nationwide training/nationwide training2.jpg'
import nationwideTrainingImage3 from '../assets/nationwide training/nationwide training3.png'

import nationwidesellingImage1 from '../assets/selling activity/nationwide selling.png'
import nationwidesellingImage2 from '../assets/selling activity/nationwide selling - 2.png'
import nationwidesellingImage3 from '../assets/selling activity/nationwide selling - 3.png'


function Services() {
  const navigate = useNavigate()

  const services = [
    {
      id: 'nationwide-manpower-deployment',
      title: 'Nationwide Manpower Deployment',
      description: 'Skilled personnel deployment including flyering agents, sales associates, merchandisers, samplers, push girls, and brand ambassadors.',
      image1: nationwideManpowerImage1,
      image2: nationwideManpowerImage2,
      image3: nationwideManpowerImage3,
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
      description: 'We can train your team nationwide, ensuring consistent brand messaging and product knowledge across all locations.',
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
      image1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop'
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
          We provide comprehensive brand activation and promotional solutions with nationwide reach, delivering exceptional results through strategic planning and professional execution. <br /> Photos may be provided upon request.
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
