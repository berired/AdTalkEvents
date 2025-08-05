import './Contact.css'

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Connect with Us</h1>
        <p className="contact-subtitle">
          Ready to elevate your next event? Our experienced team is here to help you create extraordinary experiences that drive results.
        </p>
      </div>

      <div className="contact-content">
        {/* Centered Section Title */}
        <div className="contact-section-header">
          <h2>Get In Touch</h2>
        </div>

        {/* Two Column Layout */}
        <div className="contact-grid">
          {/* Left Column: Phone, Email, Follow Us */}
          <div className="contact-column">
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>09178468381</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>mail@adtalk.com.ph</p>
                <p>loveliecaoile@adtalk.com.ph</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-details">
                <h3>Follow Us</h3>
                <p>
                  <a href="https://facebook.com/adtalkevents" target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Location */}
          <div className="contact-column">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>Location</h3>
                <p>283 Sumulong Highway</p>
                <p>Antipolo City, Rizal</p>
                <p>beside Kowloon House</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
