import { useState } from 'react'
import EventCard from '../components/EventCard'
import './Events.css'

function Events() {
  const [events] = useState([
    {
      id: 1,
      eventName: 'Global Technology Summit 2025',
      date: 'March 15-17, 2025',
      description: 'Join industry leaders for the premier technology conference of the year. Featuring C-suite executives from Fortune 500 companies, groundbreaking product launches, and strategic networking opportunities. This three-day summit will explore emerging technologies, digital transformation strategies, and the future of business innovation.',
      image1: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      eventName: 'Executive Leadership Forum',
      date: 'April 22-23, 2025',
      description: 'An exclusive two-day leadership development conference designed for C-level executives and senior management. Learn from renowned business leaders, participate in executive roundtables, and gain insights into strategic leadership, organizational transformation, and high-performance team management.',
      image1: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      eventName: 'Digital Marketing Masterclass',
      date: 'May 10-12, 2025',
      description: 'Comprehensive three-day intensive workshop covering advanced digital marketing strategies, brand positioning, and customer engagement. Led by industry experts from top marketing agencies, this masterclass includes hands-on sessions, case studies, and personalized strategy development for maximum ROI.',
      image1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      eventName: 'Innovation & Investment Summit',
      date: 'June 5-6, 2025',
      description: 'Connect with venture capitalists, angel investors, and successful entrepreneurs in this high-level networking summit. Featuring startup pitch competitions, investor panels, and exclusive networking sessions designed to foster strategic partnerships and funding opportunities.',
      image1: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop'
    },
    {
      id: 5,
      eventName: 'Digital Transformation Conference',
      date: 'July 18-19, 2025',
      description: 'Explore the future of business operations through digital transformation. This conference brings together CTOs, IT directors, and digital strategists to discuss implementation strategies, emerging technologies, cybersecurity, and change management in the digital era.',
      image1: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop'
    },
    {
      id: 6,
      eventName: 'Sustainability & Corporate Responsibility Expo',
      date: 'August 12-14, 2025',
      description: 'Discover sustainable business practices and corporate responsibility initiatives that drive both profit and positive impact. This expo features case studies from leading companies, sustainability technology showcases, and networking opportunities with ESG professionals and sustainability consultants.',
      image1: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop'
    }
  ])

  return (
    <div className="events-container">
      <div className="events-header">
        <h1 className="events-title">Upcoming Corporate Events</h1>
        <p className="events-subtitle">
          Join us for world-class corporate events, conferences, and professional development opportunities designed to drive business growth and innovation.
        </p>
      </div>
      
      <div className="events-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

export default Events 