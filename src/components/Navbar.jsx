import { Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeButtonRef = useRef(null)
  const hamburgerRef = useRef(null)

  const closeMenu = () => {
    setMenuOpen(false)
    hamburgerRef.current?.focus()
  }

  useEffect(() => {
    if (!menuOpen) return

    closeButtonRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          AdTalk Events
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/services" 
              className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/contact" 
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/gallery" 
              className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Gallery
            </Link>
          </li>
        </ul>
        <button
          ref={hamburgerRef}
          className="hamburger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <nav
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onClick={e => e.stopPropagation()}
          >
            <button ref={closeButtonRef} className="close-mobile-menu" aria-label="Close menu" onClick={closeMenu}>&times;</button>
            <Link to="/" className={`mobile-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
            <Link to="/services" className={`mobile-link ${location.pathname === '/services' ? 'active' : ''}`} onClick={closeMenu}>Services</Link>
            <Link to="/contact" className={`mobile-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={closeMenu}>Contact</Link>
            <Link to="/gallery" className={`mobile-link ${location.pathname === '/gallery' ? 'active' : ''}`} onClick={closeMenu}>Adtalk Gallery</Link>
          </nav>
        </div>
      )}
    </nav>
  )
}

export default Navbar