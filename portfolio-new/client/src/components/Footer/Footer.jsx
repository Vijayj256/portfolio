import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import './Footer.css';

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer-logo">
            <span className="logo-bracket">&lt;</span>Student.dev<span className="logo-bracket">/&gt;</span>
          </span>
          <p>Final-year CS student passionate about building real-world web applications and eager to start my professional journey.</p>
          <div className="footer-social">
            <a href="https://github.com"   target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin size={18} /></a>
            <a href="https://twitter.com"  target="_blank" rel="noreferrer" aria-label="Twitter"><FiTwitter size={18} /></a>
          </div>
        </div>

        <div className="footer__links">
          <h4>Quick Links</h4>
          <ul>
            {NAV_LINKS.map(l => (
              <li key={l}>
                <button onClick={() => scrollTo(l)}>{l}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Contact</h4>
          <p>vijayjayaraman256@gmail.com</p>
          <p>+91 90424 69004</p>
          <p>Mannargudi, Thiruvarur, Tamil Nadu, India</p>
          <a href="#contact" className="btn btn-outline footer-cta" onClick={() => scrollTo('contact')}>
            Hire Me 🎓
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} Student Portfolio. All rights reserved.
          </p>
          <p className="footer-made">
            Made with <FiHeart size={13} style={{ color: '#ff3b6b' }} /> by a CS Student using MERN Stack
          </p>
        </div>
      </div>
    </footer>
  );
}
