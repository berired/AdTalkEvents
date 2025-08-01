import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
  const clients = [
    { name: 'Universal Robina', logo: ''},
    { name: 'Kewpie', logo: ''},
    { name: 'Ford', logo: ''},
    { name: 'Casio', logo: ''},
    { name: 'Sunnies Studios', logo: ''},
    { name: 'Federated Distributors Inc', logo: ''}
  ];

  const services = [
    {
      title: 'Brand Activations',
      description: 'Bridge the gap between your market and your brand through an unforgettable experience. We’ll transform how your customers see your company and products by bringing your vision to life.',
      icon: '🎯'
    },
    {
      title: 'Manpower Deployment',
      description: 'Skilled personnel deployment including flyering agents, sales associates, merchandisers, samplers, push girls, and brand ambassadors.',
      icon: '👥'
    },
    {
      title: 'Conventions & Trade Shows',
      description: 'Full-service convention management including booth setup, staff coordination, and visitor engagement activities.',
      icon: '🏢'
    },
    {
      title: 'Merch Installation for Gen Trade & Key Accounts',
      description: 'Professional merchandising installation services for general trade outlets and key account establishments.',
      icon: '🛒'
    },
    {
      title: 'Product Launching, MOA Signing, and Concert Series',
      description: 'Professional event management for product launches, memorandum of agreement signings, and entertainment concert series.',
      icon: '🚀'
    },
    {
      title: 'Dropbox Management',
      description: 'Comprehensive management of promotional materials, inventory tracking, and distribution logistics for retail operations.',
      icon: '📦'
    }
    
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            You Talk <span className="gradient-text">We Listen</span>
          </h1>
          <p className="hero-subtitle">
           Building mutually beneficial relationships with clients and team members <strong>through the perfected art of listening.</strong>
          </p>
          <Link to="/contact" className="hero-cta-btn">Plan Your Event</Link>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-icon">🎉</span>
              <span className="stat-number">1000+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-icon">🤝</span>
              <span className="stat-number">6</span>
              <span className="stat-label">Clients</span>
            </div>
            <div className="stat">
              <span className="stat-icon">⭐</span>
              <span className="stat-number">8</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">Our Specialized Services</h2>
        <p className="services-intro">We provide comprehensive brand activation and promotional solutions with nationwide reach:</p>
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
      </section>

      {/* Manpower Deployment Section */}
      <section className="manpower-section">
        <h2 className="section-title">Professional Manpower Deployment</h2>
        <p className="manpower-intro">Our skilled personnel are trained to represent your brand with excellence:</p>
        <div className="manpower-grid">
          <div className="manpower-card">
            <div className="manpower-icon">🎯</div>
            <h3>Flyering Agents</h3>
            <p>Professional distribution specialists for promotional materials and brand awareness campaigns.</p>
          </div>
          <div className="manpower-card">
            <div className="manpower-icon">🛍️</div>
            <h3>Sales Associates & Merchandisers</h3>
            <p>Skilled retail professionals ensuring optimal product placement and customer engagement.</p>
          </div>
          <div className="manpower-card">
            <div className="manpower-icon">🎁</div>
            <h3>Samplers, Helpers & Push Girls</h3>
            <p>Experienced sampling specialists driving product trial and consumer interaction.</p>
          </div>
          <div className="manpower-card">
            <div className="manpower-icon">⭐</div>
            <h3>Brand Ambassadors</h3>
            <p>Class AA to Class C certified ambassadors representing your brand with professionalism.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">About Adtalk Events</h2>
          <p className="about-description">
            We are a dynamic group of people working together to <b>source, train,</b> and <b>manage </b> the right manpower
            required for any brand/product activation in Gen Trade and Key Account Outlets, Events (Festivals) and Sales Conventions nationwide.
          </p>
          <div className="company-values">
            <h3>Our Mission & Vision</h3>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">🎯</div>
                <h4>Mission</h4>
                <p>Dedicated to providing fresh results through only <b>the best customer service</b></p>
              </div>
              <div className="value-item">
                <div className="value-icon">🌟</div>
                <h4>Vision</h4>
                <p>• Providing innovative solutions for our clients
                  <br />
                  <b>to share their vision with their customers.</b> </p>
                <p>• Ushering in partnerships with clients
                  <br />
                  <b>where goals are met every step of the way.</b>
                </p>
              </div>
            </div>
          </div>
          <div className="why-choose-us">
            <h3>Why Choose AdTalk Events?</h3>
            <ul>
              <li> Nationwide promotional operations and coverage</li>
              <li>Comprehensive manpower deployment services</li>
              <li>Proven track record with major brands</li>
              <li>Expert merchandising and retail solutions</li>
              <li>Professional training and quality assurance</li>
              <li>Dedicated account management and reporting</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
