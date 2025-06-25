import { Link } from 'react-router-dom'
import './EventCard.css'

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-image-container">
        <img 
          src={event.image1} 
          alt={event.eventName} 
          className="event-image"
        />
        <div className="event-overlay">
          <Link to={`/events/${event.id}`} className="view-details-btn">
            View Details
          </Link>
        </div>
      </div>
      <div className="event-content">
        <h3 className="event-title">{event.eventName}</h3>
        <p className="event-date">{event.date}</p>
        <p className="event-description">
          {event.description.length > 100 
            ? `${event.description.substring(0, 100)}...` 
            : event.description
          }
        </p>
      </div>
    </div>
  )
}

export default EventCard 