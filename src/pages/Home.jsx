import { useEffect, useState } from 'react';
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
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import { useTilt } from '../hooks/useTilt'

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

// Counts up from 0 once the surrounding hero-stats row scrolls into view.
function HeroStat({ icon, value, suffix = '', label, active }) {
  const Icon = icon;
  const count = useCountUp(value, { start: active });
  return (
    <div className="stat">
      <span className="stat-icon"><Icon size={35} aria-hidden="true" /></span>
      <span className="stat-number">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// Fades/slides in with its siblings (via --i stagger) and tilts toward the
// cursor on precise-pointer devices; touch devices get neither listener.
function ServiceCard({ service, index }) {
  const tiltRef = useTilt();
  return (
    <Link
      to={`/services/${service.id}`}
      className="service-card-link"
    >
      <div className="service-card" ref={tiltRef} style={{ '--i': index }}>
        <div className="service-thumb">
          <img src={service.thumb} alt="" loading="lazy" />
        </div>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">{service.description}</p>
      </div>
    </Link>
  );
}

function WhyChooseItem({ icon, title, description, index }) {
  const Icon = icon;
  const tiltRef = useTilt();
  return (
    <div className="why-choose-item" ref={tiltRef} style={{ '--i': index }}>
      <div className="why-choose-icon"><Icon size={40} aria-hidden="true" /></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

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

  const heroStats = [
    { icon: PartyPopper, value: 1000, suffix: '+', label: 'Projects Completed' },
    { icon: Handshake, value: clients.length, suffix: '+', label: 'Clients' },
    { icon: Star, value: 8, suffix: '', label: 'Years of Experience' },
  ];

  const whyChooseItems = [
    {
      icon: Globe,
      title: 'Nationwide Coverage & Operations',
      description: 'Extensive coverage across Metro Manila and the provinces, with regional teams who understand local market dynamics and consumer behavior.',
    },
    {
      icon: UserCheck,
      title: 'Comprehensive Manpower Solutions',
      description: 'A vetted roster of Class A to Class C brand ambassadors, sales associates, and merchandisers, each trained before deployment.',
    },
    {
      icon: Trophy,
      title: 'Proven Track Record with Industry Leaders',
      description: '1,000+ projects and a 98% client satisfaction rate with partners like Universal Robina Corporation, Ford, and Casio.',
    },
    {
      icon: PackageSearch,
      title: 'Expert Merchandising & Retail Excellence',
      description: 'Planogram-trained specialists optimizing shelf visibility, displays, and inventory across general trade and key accounts.',
    },
    {
      icon: GraduationCap,
      title: 'Professional Training & Quality Assurance',
      description: 'Every team member completes product, sales, and brand training, backed by ongoing mystery-shopper quality checks.',
    },
    {
      icon: ClipboardList,
      title: 'Dedicated Account Management & Analytics',
      description: 'A dedicated account executive per client, with regular reports on operations, sales performance, and market insights.',
    },
  ];

  // Hero stats are above the fold on load, so they count up immediately
  // instead of waiting on scroll visibility - the delay just mirrors the
  // existing .hero-stats fade-in so the count starts as the numbers appear.
  const [statsActive, setStatsActive] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setStatsActive(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const [aboutRef, aboutInView] = useInView();
  const [servicesRef, servicesInView] = useInView();
  const [manpowerRef, manpowerInView] = useInView();
  const [clientsRef, clientsInView] = useInView();
  const [whyChooseRef, whyChooseInView] = useInView();

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
            {heroStats.map((stat) => (
              <HeroStat key={stat.label} {...stat} active={statsActive} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className={`about-section reveal${aboutInView ? ' in-view' : ''}`}>
        <div className="about-content">
          <h2 className="section-title">you talk. we Listen.</h2>
          <p className="about-description">
            We are a dynamic group of people working together to help you source, train, manage the right manpower required to connect you to customers and reach your potential growth in the industry. Establishing benchmark that meet your expectations and beyond.
          </p>
          <div className="company-values">
            <div className="values-grid">
              <div className="value-item" style={{ '--i': 0 }}>
                <b><h3>MISSION</h3></b>
                <p style={{ fontSize: '1.35rem' }}>Dedicated to providing fresh results through only the best customer service.</p>
              </div>
              <div className="value-item" style={{ '--i': 1 }}>
                <b><h3>VISION</h3></b>
               <p>Providing innovative solutions for our clients to share their vision with their customers, ushering in partnerships with clients where goals are met every step of the way</p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className={`services-section reveal${servicesInView ? ' in-view' : ''}`}>
        <h2 className="section-title">OUR SPECIALIZED SERVICES</h2>
        <p className="services-intro">We provide comprehensive brand activation and promotional solutions with nationwide reach</p>
        <div className="home-services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>



      {/* Manpower Deployment Section */}
      <section ref={manpowerRef} className={`manpower-section reveal${manpowerInView ? ' in-view' : ''}`}>
        <h2 className="section-title">PROFESSIONAL MANPOWER DEPLOYMENT</h2>
        <p className="manpower-intro">Our skilled personnel are trained to represent your brand with excellence, through a process that runs in order:</p>
        <ol className="process-steps">
          <li className="process-step" style={{ '--i': 0 }}>
            <h3>Sourcing</h3>
            <p>We have a good number of contacts and agents that provide us a pool of quality candidates
              in line with the client's preference and requirements.
            </p>
          </li>
          <li className="process-step" style={{ '--i': 1 }}>
            <h3>Training</h3>
            <p>We make our training as comprehensive as possible, ensuring proper product knowledge, project mechanics and compliance with the rules and regulations related to the project.
            </p>
          </li>
          <li className="process-step" style={{ '--i': 2 }}>
            <h3>Managing</h3>
            <p>Seamless deployments are our main goal. Our team of dedicated managers and account executives make sure that each operation we run has zero error.</p>
          </li>
          <li className="process-step" style={{ '--i': 3 }}>
            <h3>Monitoring</h3>
            <p>Each account executive monitors daily operations and provides effective solutions to any challenge that arises, with weekly submission of accurate sales reports.</p>
          </li>
        </ol>
      </section>

      {/* Clients Section */}
      <section ref={clientsRef} className={`clients-section reveal${clientsInView ? ' in-view' : ''}`}>
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
      <section ref={whyChooseRef} className={`why-choose-section reveal${whyChooseInView ? ' in-view' : ''}`}>
        <div className="why-choose-content">
          <h2 className="section-title">why choose AdTalk?</h2>
          <p className="why-choose-intro">
            With over 8 years of experience in the industry, we've built a reputation for excellence that sets us apart from the competition. Here's what makes us the preferred partner for leading brands across the Philippines
          </p>
          <div className="why-choose-grid">
            {whyChooseItems.map((item, index) => (
              <WhyChooseItem key={item.title} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}

export default Home;
