import { Link } from 'react-router-dom';
import {
  PartyPopper,
  Handshake,
  Star,
  Globe,
  UserCheck,
  Trophy,
  PackageSearch,
  GraduationCap,
  ClipboardList,
} from 'lucide-react';
import './Home.css'
import Seo from '../components/Seo'

// Import client logos
import universalRobinaLogo from '../assets/company icons/universal robina logo.png'
import kewpieLogo from '../assets/company icons/kewpie logo.png'
import bradyPharmaLogo from '../assets/company icons/brady pharma.png'
import tulipLogo from '../assets/company icons/tulip logo.png'
import sunniesStudiosLogo from '../assets/company icons/sunnies studios logo.png'
import federatedDistributorsLogo from '../assets/company icons/federated distributors logo.png'
import australiasOwnLogo from '../assets/company icons/australiasown logo.png'
import eminaCheeseLogo from '../assets/company icons/eminacheese logo.png'
import ovaltineLogo from '../assets/company icons/ovaltine logo.png'
import casioLogo from '../assets/company icons/casio logo.png'
import fordLogo from '../assets/company icons/ford logo.png'

// Real activation photos, standing in for generic stock icons on the service cards
import manpowerThumb from '../assets/nationwide manpower/nationwide manpower deployment.webp'
import trainingThumb from '../assets/nationwide training/nationwide training1.webp'
import sellingThumb from '../assets/selling activity/nationwide selling.png'
import posmThumb from '../assets/gallery/7.png'

function Home() {
  const clients = [
    { name: 'Universal Robina Corporation', logo: universalRobinaLogo },
    { name: 'Kewpie', logo: kewpieLogo },
    { name: 'Brady Pharma', logo: bradyPharmaLogo },
    { name: 'Tulip', logo: tulipLogo },
    { name: 'Sunnies Studios', logo: sunniesStudiosLogo },
    { name: 'Federated Distributors Inc', logo: federatedDistributorsLogo },
    { name: "Australia's Own", logo: australiasOwnLogo },
    { name: 'Emina Cheese', logo: eminaCheeseLogo },
    { name: 'Ovomaltine', logo: ovaltineLogo },
    { name: 'Casio', logo: casioLogo },
    { name: 'Ford', logo: fordLogo },
  ];

  const services = [
    {
      id: 'nationwide-manpower-deployment',
      title: 'NATIONWIDE MANPOWER DEPLOYMENT',
      description: 'Skilled personnel deployment including flyering agents, sales associates, merchandisers, samplers, push girls, and brand ambassadors.',
      thumb: manpowerThumb
    },
     {
      id: 'nationwide-training-capabilities',
      title: 'NATIONWIDE TRAINING CAPABILITIES',
      description: 'We train your team nationwide, ensuring consistent brand messaging and product knowledge across all locations.',
      thumb: trainingThumb
    },
    {
      id:'nationwide-sampling-selling-and-merchandising',
      title: 'NATIONWIDE SAMPLING, SELLING & MERCHANDISING',
      description: 'Executing and overseeing the activity with seasoned team leads and account executives from our team.',
      thumb: sellingThumb
    },
    {
      id: 'onground-brandactivity-deployment-posminstallation-and-management-for-generaltrade-and-keyaccounts',
      title: (
        <>
          ON-GROUND BRAND ACTIVITY DEPLOYMENT<br />POSM INSTALLATION AND MANAGEMENT FOR GENERAL TRADE AND KEY ACCOUNT
        </>
      ),
      description: 'Professional merchandising installation for general trade outlets and key account establishments.',
      thumb: posmThumb
    },

  ];

  return (
    <div className="home-container">
      <Seo
        title="AdTalk Events | Nationwide Manpower & Brand Activation"
        description="AdTalk Event Solutions provides nationwide manpower deployment, training, sampling, selling, and merchandising for brands across the Philippines. 1000+ projects completed, 8+ years of experience."
      />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            you Talk. <span className="gradient-text">we listen.</span>
          </h1>
          <p className="hero-subtitle">
           Building mutually beneficial relationships with clients and team members <strong><br />through the perfected art of listening.</strong>
          </p>

          <Link to="/contact" className="hero-cta-btn">Plan Your Event</Link>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-icon"><PartyPopper size={35} aria-hidden="true" /></span>
              <span className="stat-number">1000+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-icon"><Handshake size={35} aria-hidden="true" /></span>
              <span className="stat-number">{clients.length}+</span>
              <span className="stat-label">Clients</span>
            </div>
            <div className="stat">
              <span className="stat-icon"><Star size={35} aria-hidden="true" /></span>
              <span className="stat-number">8</span>
              <span className="stat-label">Years of Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">you talk. we Listen.</h2>
          <p className="about-description">
            We are a dynamic group of people working together to help you source, train, manage the right manpower required to connect you to customers and reach your potential growth in the industry. Establishing benchmark that meet your expectations and beyond.
          </p>
          <div className="company-values">
            <div className="values-grid">
              <div className="value-item">
                <b><h3>MISSION</h3></b>
                <p style={{ fontSize: '1.35rem' }}>Dedicated to providing fresh results through only the best customer service.</p>
              </div>
              <div className="value-item">
                <b><h3>VISION</h3></b>
               <p>Providing innovative solutions for our clients to share their vision with their customers, ushering in partnerships with clients where goals are met every step of the way</p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">OUR SPECIALIZED SERVICES</h2>
        <p className="services-intro">We provide comprehensive brand activation and promotional solutions with nationwide reach</p>
        <div className="home-services-grid">
          {services.map((service, index) => (
            <Link 
              key={index} 
              to={`/services/${service.id}`}
              className="service-card-link"
            >
              <div className="service-card">
                <div className="service-thumb">
                  <img src={service.thumb} alt="" loading="lazy" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      

      {/* Manpower Deployment Section */}
      <section className="manpower-section">
        <h2 className="section-title">PROFESSIONAL MANPOWER DEPLOYMENT</h2>
        <p className="manpower-intro">Our skilled personnel are trained to represent your brand with excellence, through a process that runs in order:</p>
        <ol className="process-steps">
          <li className="process-step">
            <h3>Sourcing</h3>
            <p>We have a good number of contacts and agents that provide us a pool of quality candidates
              in line with the client's preference and requirements.
            </p>
          </li>
          <li className="process-step">
            <h3>Training</h3>
            <p>We make our training as comprehensive as possible, ensuring proper product knowledge, project mechanics and compliance with the rules and regulations related to the project.
            </p>
          </li>
          <li className="process-step">
            <h3>Managing</h3>
            <p>Seamless deployments are our main goal. Our team of dedicated managers and account executives make sure that each operation we run has zero error.</p>
          </li>
          <li className="process-step">
            <h3>Monitoring</h3>
            <p>Each account executive monitors daily operations and provides effective solutions to any challenge that arises, with weekly submission of accurate sales reports.</p>
          </li>
        </ol>
      </section>

      {/* Clients Section */}
      <section className="clients-section">
        <h2 className="clients-title">Trusted by Leading Companies</h2>
        <div className="clients-carousel">
          <div className="clients-track">
            {[...clients, ...clients].map((client, index) => (
              <div className="client-logo-item" key={index}>
                <img src={client.logo} alt={client.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="why-choose-content">
          <h2 className="section-title">why choose AdTalk?</h2>
          <p className="why-choose-intro">
            With over 8 years of experience in the industry, we've built a reputation for excellence that sets us apart from the competition. Here's what makes us the preferred partner for leading brands across the Philippines
          </p>
          <div className="why-choose-grid">
            <div className="why-choose-item">
              <div className="why-choose-icon"><Globe size={40} aria-hidden="true" /></div>
              <h3>Nationwide Coverage & Operations</h3>
              <p>Extensive coverage across Metro Manila and the provinces, with regional teams who understand local market dynamics and consumer behavior.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon"><UserCheck size={40} aria-hidden="true" /></div>
              <h3>Comprehensive Manpower Solutions</h3>
              <p>A vetted roster of Class A to Class C brand ambassadors, sales associates, and merchandisers, each trained before deployment.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon"><Trophy size={40} aria-hidden="true" /></div>
              <h3>Proven Track Record with Industry Leaders</h3>
              <p>1,000+ projects and a 98% client satisfaction rate with partners like Universal Robina Corporation, Ford, and Casio.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon"><PackageSearch size={40} aria-hidden="true" /></div>
              <h3>Expert Merchandising & Retail Excellence</h3>
              <p>Planogram-trained specialists optimizing shelf visibility, displays, and inventory across general trade and key accounts.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon"><GraduationCap size={40} aria-hidden="true" /></div>
              <h3>Professional Training & Quality Assurance</h3>
              <p>Every team member completes product, sales, and brand training, backed by ongoing mystery-shopper quality checks.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon"><ClipboardList size={40} aria-hidden="true" /></div>
              <h3>Dedicated Account Management & Analytics</h3>
              <p>A dedicated account executive per client, with regular reports on operations, sales performance, and market insights.</p>
            </div>
          </div>
        </div>
      </section>

      

    </div>
  );
}

export default Home;
