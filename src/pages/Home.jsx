import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
  const clients = [
    { name: 'TechCorp', logo: '🏢' },
    { name: 'InnovateLab', logo: '🔬' },
    { name: 'GlobalEvents', logo: '🌍' },
    { name: 'CreativeStudio', logo: '🎨' },
    { name: 'DigitalSolutions', logo: '💻' },
    { name: 'MarketingPro', logo: '📈' }
  ];

  const services = [
    {
      title: 'Event Planning & Management',
      description: 'From vision to reality, we handle every detail for seamless, unforgettable events.',
      icon: '🎯'
    },
    {
      title: 'Marketing & Promotion',
      description: 'Maximize your event\'s reach with creative campaigns and digital buzz.',
      icon: '🚀'
    },
    {
      title: 'Venue Selection',
      description: 'We find and secure the perfect venue to match your event\'s unique vibe.',
      icon: '🏛️'
    },
    {
      title: 'Digital Solutions',
      description: 'Engage your audience with cutting-edge tech, apps, and virtual experiences.',
      icon: '💡'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Make Your Next Event <span className="gradient-text">Unforgettable</span>
          </h1>
          <p className="hero-subtitle">
            AdTalk Events crafts extraordinary experiences that inspire, connect, and deliver results. Let's turn your vision into a show-stopping reality.
          </p>
          <Link to="/contact" className="hero-cta-btn">Plan Your Event</Link>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-icon">🎉</span>
              <span className="stat-number">500+</span>
              <span className="stat-label">Events Managed</span>
            </div>
            <div className="stat">
              <span className="stat-icon">🤝</span>
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Attendees</span>
            </div>
            <div className="stat">
              <span className="stat-icon">⭐</span>
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">Our Services</h2>
        <p className="services-intro">We don't just plan events—we create moments that matter. Explore what we can do for you:</p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clients Section */}
      <section className="clients-section">
        <h2 className="section-title">Trusted by Leading Companies</h2>
        <div className="clients-grid">
          {clients.map((client, index) => (
            <div key={index} className="client-card">
              <div className="client-logo">{client.logo}</div>
              <h3 className="client-name">{client.name}</h3>
            </div>
          ))}
        </div>
        <blockquote className="client-quote fade-in">
          "AdTalk Events exceeded our expectations—professional, creative, and truly dedicated to our success."
          <span className="client-quote-author">— Sarah L., TechCorp</span>
        </blockquote>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">About AdTalk Events</h2>
          <p className="about-description">
            With over a decade of experience, AdTalk Events is your partner for impactful, memorable events. We blend creativity, technology, and strategy to deliver results that wow.
          </p>
          <div className="why-choose-us">
            <h3>Why Choose Us?</h3>
            <ul>
              <li>✔️ Award-winning event planners & marketers</li>
              <li>✔️ Personalized, end-to-end service</li>
              <li>✔️ Proven track record with top brands</li>
              <li>✔️ Passion for innovation and excellence</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 