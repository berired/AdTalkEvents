import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Adtalk Events</h3>
              <p className="footer-tagline">You Talk, We Listen</p>
            </div>
            <p className="footer-description">
              Building mutually beneficial relationships with clients and team members through the perfected art of listening. Nationwide promotional operations and brand activation solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallery">Adtalk Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li>Brand Activations</li>
              <li>Manpower Deployment</li>
              <li>Conventions & Trade Shows</li>
              <li>Merchandise Installation & Management</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>09178468381</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>mail@adtalk.com.ph</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>283 Sumulong Highway<br />Antipolo City, Rizal</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <a href="https://facebook.com/adtalkevents" target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '5px', verticalAlign: 'middle'}}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Adtalk Events. All rights reserved.</p>
            <p>Professional brand activation and promotional marketing solutions nationwide.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
