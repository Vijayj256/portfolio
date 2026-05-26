import React from 'react';
import { FiCode, FiBook, FiTarget, FiUsers } from 'react-icons/fi';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './About.css';

const SERVICES = [
  { icon: FiCode,  title: 'Web Development',    desc: 'Building projects using React, Node.js, Express and MongoDB.' },
  { icon: FiBook,   title: 'Currently Learning',  desc: 'TypeScript, Docker, AWS and system design concepts.' },
  { icon: FiTarget, title: 'Career Goal',         desc: 'Seeking internships and entry-level full stack developer roles.' },
  
];

export default function About({ profile }) {
  const [ref, isVisible] = useScrollAnimation(0.15);

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="orb orb-cyan" style={{ width: 300, height: 300, top: '-5%', right: '10%' }} />

      <div className="container">
        <p className="section-eyebrow">Who I Am</p>
        <h2 className="section-title">About <span>Me</span></h2>

        <div className={`about-grid${isVisible ? ' visible' : ''}`}>
          {/* Text */}
          <div className="about-text">
            <p>
              {profile?.bio ||
                "I'm a final-year Computer Science and Engineering student at Anna University, Chennai. I discovered my passion for web development during my second year and have been building projects ever since. I specialize in the MERN stack and love creating applications that solve real problems."
              }
            </p>
            <p>
              Outside of coursework, I participate in hackathons, contribute to open source projects, and build side projects to sharpen my skills. I'm a fast learner who enjoys collaborating with others and I'm always looking for opportunities to grow as a developer.
            </p>

            <div className="about-highlights">
              {[
                ['Degree',     'B.E. Computer Science'],
                ['University', 'Anna University'],
                ['Grad Year',  '2026'],
                ['Status',     'Seeking Internship or Full-Time Role ✅'],
              ].map(([k, v]) => (
                <div key={k} className="highlight-item">
                  <span className="highlight-key">{k}</span>
                  <span className="highlight-val">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="about-services">
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="service-card card">
                <div className="service-icon"><Icon size={22} /></div>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
