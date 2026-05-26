import React, { useState } from 'react';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { sendContact } from '../../utils/api';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './Contact.css';

const CONTACT_INFO = [
  { icon: FiMail,   label: 'Email',    value: 'vijayjayaraman256@gmail.com', href: 'mailto:vijayjayaraman256@gmail.com' },
  { icon: FiPhone,  label: 'Phone',    value: '+91 9042469003',                  href: 'tel:+919042469003' },
  { icon: FiMapPin, label: 'Location', value: 'Mannargudi, Thiruvarur, Tamil Nadu, India',       href: '#' },
];

const SOCIAL = [
  { icon: FiGithub,   href: 'https://github.com',   label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com',  label: 'LinkedIn' },
  { icon: FiTwitter,  href: 'https://twitter.com',   label: 'Twitter' },
];

export default function Contact({ profile }) {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [ref, isVisible]    = useScrollAnimation(0.1);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await sendContact(form);
      toast.success('Message sent! I\'ll get back to you within 24 hours 🚀');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="orb orb-cyan"   style={{ width: 500, height: 500, bottom: '-10%', left: '-10%' }} />
      <div className="orb orb-purple" style={{ width: 300, height: 300, top: '10%', right: '5%' }} />

      <div className="container">
        <p className="section-eyebrow">Get in Touch</p>
        <h2 className="section-title">Contact <span>Me</span></h2>
        <p className="section-subtitle">
          Whether you have an internship opportunity, a project idea, or just want to connect — I'd love to hear from you!
        </p>

        <div className={`contact-grid${isVisible ? ' visible' : ''}`}>
          {/* Left: Info */}
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p className="contact-intro">
              I'm actively looking for internship and entry-level opportunities. If you think I'd be a good fit for your team, feel free to reach out. I respond within 24 hours.
            </p>

            <div className="contact-items">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="contact-item">
                  <div className="contact-icon"><Icon size={18} /></div>
                  <div>
                    <p className="contact-label">{label}</p>
                    <p className="contact-value">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-social">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="social-icon" aria-label={label}>
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="availability-card">
              <span className="avail-dot" />
              <div>
                <p className="avail-title">Open to Opportunities</p>
                <p className="avail-sub">Internships • Entry-level roles • Freelance projects</p>
              </div>
            </div>

            {/* Quick links for recruiters */}
            <div className="recruiter-links">
              <p className="recruiter-label">📎 Quick Links for Recruiters</p>
              <div className="recruiter-btns">
                <a href="./vijayj.pdf" className="btn btn-outline" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
                  📄 View Resume
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
                  <FiGithub size={14} /> GitHub Profile
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="card contact-form-card">
            <h3>Send a Message</h3>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input id="name" name="name" type="text" placeholder="John Smith"
                    value={form.name} onChange={handleChange} className="form-input" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email *</label>
                  <input id="email" name="email" type="email" placeholder="john@company.com"
                    value={form.email} onChange={handleChange} className="form-input" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text"
                  placeholder="Internship Opportunity / Project Collab / Just Saying Hi"
                  value={form.subject} onChange={handleChange} className="form-input" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message"
                  placeholder="Tell me about the opportunity or what you'd like to discuss..."
                  value={form.message} onChange={handleChange}
                  className="form-input form-textarea" rows={6} required />
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                {loading
                  ? <><span className="spinner" /> Sending...</>
                  : <><FiSend size={16} /> Send Message</>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
