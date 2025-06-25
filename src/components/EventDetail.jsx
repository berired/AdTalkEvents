import { Link } from 'react-router-dom'
import './EventDetail.css'

function EventDetail({ event }) {
  if (!event) {
    return (
      <div className="event-detail-container">
        <div className="event-not-found">
          <h2>Event not found</h2>
          <Link to="/events" className="back-btn">Back to Events</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="event-detail-container">
      <div className="event-detail-header">
        <Link to="/events" className="back-btn">
          ← Back to Events
        </Link>
        <h1 className="event-detail-title">{event.eventName}</h1>
        <p className="event-detail-date">{event.date}</p>
      </div>
      
      <div className="event-images-grid">
        <div className="event-image-item">
          <img src={event.image1} alt={`${event.eventName} - Image 1`} />
        </div>
        <div className="event-image-item">
          <img src={event.image2} alt={`${event.eventName} - Image 2`} />
        </div>
        <div className="event-image-item">
          <img src={event.image3} alt={`${event.eventName} - Image 3`} />
        </div>
      </div>
      
      <div className="event-detail-content">
        <h2>Event Details</h2>
        <p className="event-detail-description">{event.description}</p>
      </div>
    </div>
  )
}

export default EventDetail 