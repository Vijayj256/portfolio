import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const { isAdmin } = useAuth();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeSection, setActive] = useState('');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) current = id;
    });
    setActive(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#hero" className="navbar__logo" onClick={() => scrollTo('#hero')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Student.dev</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <button
                className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
                onClick={() => scrollTo(link.href)}
              >
                {link.label}
              </button>
            </li>
          ))}
          {isAdmin && (
            <li><Link to="/admin" className="nav-link admin-badge">Admin</Link></li>
          )}
        </ul>

        {/* CTA */}
        <button className="btn btn-primary navbar__cta" onClick={() => scrollTo('#contact')}>
          Hire Me 🎓
        </button>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(link => (
          <button key={link.href} className="mobile-link" onClick={() => scrollTo(link.href)}>
            {link.label}
          </button>
        ))}
        <button className="btn btn-primary mobile-cta" onClick={() => scrollTo('#contact')}>
          Hire Me 🎓
        </button>
      </div>
    </nav>
  );
}
