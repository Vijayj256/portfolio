import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiDownload } from 'react-icons/fi';
import './Hero.css';

const SOCIAL_LINKS = [
  { icon: FiGithub,   href: 'https://github.com',    label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/j-vijay25',   label: 'LinkedIn' },
  { icon: FiMail,     href: 'mailto:vijayjayarman256@gmail.com',               label: 'Email' },
];

const STATS = [
  { value: 'Final',  label: 'Year Student' },
  { value: '3',    label: 'Projects Built' },
  { value: '7.8',    label: 'GPA Score' },
  { value: '2026',   label: 'Graduating Year' },
];

export default function Hero({ profile }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth  - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero grid-bg">
      {/* Orbs */}
      <div className="orb orb-cyan" style={{ width: 600, height: 600, top: '-10%', right: '-5%',
        transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }} />
      <div className="orb orb-purple" style={{ width: 400, height: 400, bottom: '10%', left: '-5%',
        transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)` }} />

      <div className="container hero__inner">
        {/* Left: Text */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="badge-dot" />
            Open to Internships & Entry-Level Roles
          </div>

          <h1 className="hero__name">
            Hi, I'm <span className="gradient-text">{profile?.name || 'Vijay'}</span>
          </h1>

          <div className="hero__typing">
            <TypeAnimation
              sequence={[
                'CS Student @ Anna University',  2000,
                'Aspiring Full Stack Developer',  2000,
                'React & Node.js Learner',        2000,
                'Problem Solver & Builder',       2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p className="hero__bio">
            {profile?.bio ||
              "I'm a final-year Computer Science student passionate about building real-world web applications. I love turning ideas into working products using the MERN stack, and I'm actively looking for internships and entry-level opportunities to grow as a developer."
            }
          </p>

          {/* Socials */}
          <div className="hero__social">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="social-icon" aria-label={label}>
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero__ctas">
            <button className="btn btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Projects
            </button>
            <a href={profile?.resume || './vijayj.pdf'} download className="btn btn-outline">
              <FiDownload size={16} />
              Download Resume
            </a>
          </div>
        </div>

        {/* Right: Avatar card */}
        <div className="hero__visual" style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.3}deg)`,
        }}>
          <div className="avatar-card">
            <div className="avatar-ring">
              <div className="avatar-img">
                {profile?.avatar
                  ? <img src={profile.avatar} alt={profile.name} />
                  : <div className="avatar-placeholder">
                      <span>{(profile?.name || 'Vijay').split(' ').map(n => n[0]).join('')}</span>
                    </div>
                }
              </div>
            </div>

            {/* Floating badges */}
            <div className="float-badge badge-react">⚛️ React</div>
            <div className="float-badge badge-node">🟢 Node.js</div>
            <div className="float-badge badge-mongo">🍃 MongoDB</div>
            <div className="float-badge badge-ts">🎓 CS Final Year</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="hero__stats container">
        {STATS.map(({ value, label }) => (
          <div key={label} className="stat-card">
            <span className="stat-value gradient-text">{value}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <button className="scroll-indicator" onClick={scrollDown} aria-label="Scroll down">
        <span>Scroll</span>
        <FiArrowDown size={18} />
      </button>
    </section>
  );
}
