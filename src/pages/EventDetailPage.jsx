import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EventDetail from '../components/EventDetail'
import './EventDetailPage.css'

function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock events data - in a real app, this would come from an API
  const eventsData = [
    {
      id: 1,
      eventName: 'Tech Innovation Summit 2024',
      date: 'March 15, 2024',
      description: 'Join us for the most anticipated technology conference of the year. Featuring keynote speakers from leading tech companies, interactive workshops, and networking opportunities with industry professionals. This summit brings together innovators, entrepreneurs, and technology enthusiasts to explore the latest trends and breakthroughs in the tech world. Our comprehensive program includes panel discussions, hands-on workshops, and exclusive networking sessions designed to foster collaboration and innovation. Don\'t miss this opportunity to connect with industry leaders and discover the future of technology.',
      image1: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      eventName: 'Corporate Leadership Conference',
      date: 'April 22, 2024',
      description: 'A comprehensive leadership development conference designed for executives and managers. Learn from industry leaders, participate in leadership workshops, and gain insights into effective management strategies. This event focuses on building strong leadership skills and fostering organizational growth. The conference features expert speakers, interactive sessions, and practical workshops that will help you develop the skills needed to lead teams effectively in today\'s dynamic business environment.',
      image1: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      eventName: 'Creative Marketing Workshop',
      date: 'May 10, 2024',
      description: 'An intensive workshop focused on creative marketing strategies and digital innovation. Participants will learn about content creation, social media marketing, and brand development. Hands-on sessions will help you develop practical skills for modern marketing campaigns. This workshop is perfect for marketing professionals, entrepreneurs, and anyone looking to enhance their digital marketing skills. You\'ll leave with actionable strategies and tools to implement immediately.',
      image1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      eventName: 'Startup Networking Night',
      date: 'June 5, 2024',
      description: 'Connect with fellow entrepreneurs, investors, and startup enthusiasts in this dynamic networking event. Share ideas, build partnerships, and discover new opportunities in the startup ecosystem. Perfect for anyone looking to grow their network and business. This event provides a relaxed atmosphere for meaningful conversations and potential collaborations. Whether you\'re a seasoned entrepreneur or just starting your journey, you\'ll find valuable connections and insights.',
      image1: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop'
    },
    {
      id: 5,
      eventName: 'Digital Transformation Forum',
      date: 'July 18, 2024',
      description: 'Explore the future of business in the digital age. This forum brings together experts to discuss digital transformation strategies, emerging technologies, and their impact on various industries. Learn how to adapt and thrive in the rapidly evolving digital landscape. The forum includes keynote presentations, panel discussions, and interactive sessions focused on practical implementation strategies. Discover how leading organizations are leveraging technology to drive innovation and growth.',
      image1: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop'
    },
    {
      id: 6,
      eventName: 'Sustainability & Innovation Expo',
      date: 'August 12, 2024',
      description: 'Discover sustainable solutions and innovative approaches to environmental challenges. This expo showcases cutting-edge technologies and practices that promote sustainability across industries. Connect with like-minded professionals committed to creating a better future. The expo features interactive exhibits, expert presentations, and networking opportunities focused on sustainable business practices. Learn about the latest innovations in renewable energy, waste reduction, and environmental conservation.',
      image1: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&h=300&fit=crop',
      image2: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
      image3: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop'
    }
  ]

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundEvent = eventsData.find(e => e.id === parseInt(id))
      setEvent(foundEvent)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading event details...</p>
      </div>
    )
  }

  return (
    <div className="event-detail-page">
      <EventDetail event={event} />
    </div>
  )
}

export default EventDetailPage 