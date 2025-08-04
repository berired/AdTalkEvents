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
      id: 'brand-activations',
      title: 'Brand Activations',
      description: 'Bridge the gap between your market and your brand through an unforgettable experience. We\'ll transform how your customers see your company and products by bringing your vision to life.',
      icon: '🎯'
    },
    {
      id: 'manpower-deployment',
      title: 'Manpower Deployment',
      description: 'Skilled personnel deployment including flyering agents, sales associates, merchandisers, samplers, push girls, and brand ambassadors.',
      icon: '👥'
    },
    {
      id: 'conventions-trade-shows',
      title: 'Conventions & Trade Shows',
      description: 'Full-service convention management including booth setup, staff coordination, and visitor engagement activities.',
      icon: '🏢'
    },
    {
      id: 'merchandise-installation',
      title: 'Merchandise Installation & Management for General Trade and Key Accounts',
      description: 'Professional merchandising installation services for general trade outlets and key account establishments.',
      icon: '🛒'
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

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">About Adtalk Events</h2>
          <p className="about-description">
            We are a dynamic group of people working together to source, train, and manage the right manpower required for any brand/product activation in General Trade and Key Account. 
            We also do events, sales conventions, and launching of new products, and or services nationwide.
          </p>
          <div className="company-values">
            <h3>Our Mission & Vision</h3>
            <div className="values-grid">
              <div className="value-item">
                <h4>Mission</h4>
            <b> <p>DEDICATED TO PROVIDING FRESH RESULTS THROUGH ONLY THE BEST CUSTOMER SERVICE</p></b>
              </div>
              <div className="value-item">
                <h4>Vision</h4>
               <p><b>PROVIDING INNOVATIVE SOLUTIONS FOR OUR CLIENTS
                  <br />
                  TO SHARE THEIR VISION WITH THEIR CUSTOMERS</b></p>
                  <br />
                <p> <b>USHERING IN PARTNERSHIPS WITH CLIENTS
                  <br />
                  WHERE GOALS ARE MET EVERY STEP OF THE WAY.</b>
                </p>
              </div>
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
            <Link 
              key={index} 
              to={`/services#${service.id}`}
              className="service-card-link"
            >
              <div className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      

      {/* Manpower Deployment Section */}
      <section className="manpower-section">
        <h2 className="section-title">Professional Manpower Deployment</h2>
        <p className="manpower-intro">Our skilled personnel are trained to represent your brand with excellence:</p>
        <div className="manpower-grid">
          <div className="manpower-card">
            <div className="manpower-card">
            <div className="manpower-icon">🔍</div>
            <h3>Sourcing</h3>
            <p>We have a good number of contacts and agents that provides us a pool of quality candidates
              in line with the client's preference and requirements.
            </p>
          </div>
            <div className="manpower-icon">📚</div>
            <h3>Training</h3>
            <p>We make our training as comprehensive as possible. It is our duty as people managers to ensure proper product knowledge, project mechanics and compliance with certain
              rules and regulations related to the products and project we are handling.
            </p>
          </div>
          <div className="manpower-card">
            <div className="manpower-icon">⚙️</div>
            <h3>Managing</h3>
            <ul>
              <li>Seamless deployments, this our main goal.</li>
              <li>Our team of dedicated managers and account executives make sure that each operation we have has zero error.</li>
            </ul>
          </div>
          <div className="manpower-card">
            <div className="manpower-icon">📊</div>
            <h3>Monitoring</h3>
            <ul>
              <li>Each account executive monitor daily operations and provide effective
                and efficient solutions to any situation and challenges that arise in the project.
              </li>
              <li>
                Weekly submission of accurate sales report.
              </li>
            </ul>
          </div>
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

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="why-choose-content">
          <h2 className="section-title">Why Choose AdTalk Events?</h2>
          <p className="why-choose-intro">
            With over 8 years of experience in the industry, we've built a reputation for excellence that sets us apart from the competition. 
            Here's what makes us the preferred partner for leading brands across the Philippines:
          </p>
          <div className="why-choose-grid">
            <div className="why-choose-item">
              <div className="why-choose-icon">🌏</div>
              <h3>Nationwide Coverage & Operations</h3>
              <p>Our extensive network spans across all major cities and provinces in the Philippines. From Metro Manila to remote municipalities, we have the infrastructure and local partnerships to execute promotional campaigns anywhere in the country. Our regional teams understand local market dynamics, cultural nuances, and consumer behavior, ensuring your brand message resonates with target audiences nationwide.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">👥</div>
              <h3>Comprehensive Manpower Solutions</h3>
              <p>We maintain a database of over 5,000 trained professionals including brand ambassadors, sales associates, merchandisers, and promotional staff. Our rigorous recruitment process ensures we only work with Class AA to Class C certified personnel. Each team member undergoes comprehensive product training, customer service workshops, and brand alignment sessions before deployment.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">🏆</div>
              <h3>Proven Track Record with Industry Leaders</h3>
              <p>Our portfolio includes successful partnerships with Fortune 500 companies like Universal Robina, Ford, and Casio. We've executed over 1,000 projects with a 98% client satisfaction rate. Our case studies demonstrate consistent ROI improvements, increased brand awareness, and measurable sales growth for our clients across various industries.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">🛒</div>
              <h3>Expert Merchandising & Retail Excellence</h3>
              <p>Our merchandising specialists are trained in visual marketing, planogram compliance, and inventory management. We work closely with both general trade outlets and key accounts to ensure optimal product placement, attractive displays, and maximum shelf visibility. Our retail solutions include space optimization, promotional material installation, and real-time inventory monitoring.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">🎓</div>
              <h3>Professional Training & Quality Assurance</h3>
              <p>Every team member completes our proprietary training program covering product knowledge, sales techniques, customer engagement, and brand representation. We conduct regular performance evaluations, mystery shopper assessments, and continuous skill development workshops. Our quality assurance team monitors all operations to maintain the highest standards of service delivery.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">📋</div>
              <h3>Dedicated Account Management & Analytics</h3>
              <p>Each client is assigned a dedicated account executive who provides personalized service and strategic guidance. We deliver comprehensive reports including daily operation summaries, sales performance metrics, customer feedback analysis, and market insights. Our data-driven approach helps clients make informed decisions and optimize their promotional strategies.</p>
            </div>
          </div>
        </div>
      </section>

      

    </div>
  );
}

export default Home;
