import React from 'react';
import { FiBriefcase, FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './Experience.css';

const DEFAULT_EXP = [
  {
    _id: '1',
    company: 'Novitech Solutions',
    role: 'Full Stack Developer Trainee',
    type: 'training',
    location: 'online',
    startDate: '2026-05-01',
    endDate: 'null',
    current: true,
    description: 'Currently attending a MERN Stack development webinar focused on modern web application development.',
    bullets: [
      'Learning frontend development using React.js and modern JavaScript',
      'Understanding backend development with Node.js and Express.js',
      'Working with MongoDB for database management and CRUD operations',
      'Exploring REST APIs, authentication, and full-stack project development',
    ],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'REST API'],
  },
  {
    _id: '2',
    company: 'Nerds Lab',
    role: 'Cyber Security Intern',
    type: 'internship',
    location: 'thanjavur, Tamil Nadu',
    startDate: '2025-07-01',
    endDate: null,
    current: false,
    description: 'Completed a Cyber Security internship focused on learning security fundamentals and practices.',
    bullets: [
      'Learned cybersecurity basics, cryptography concepts, and Linux commands',
      'Worked with Wireshark for basic network traffic analysis',
      'Practiced network scanning and reconnaissance using Nmap',
      'Explored password testing and security auditing using Hydra',
    ],
    tech: ['Cyber Security', 'Cryptography', 'Linux', 'Wireshark', 'Nmap', 'Hydra'],
  },
  {
    _id: '3',
    company: 'Samcore Solution',
    role: 'Artificial Intelligence Intern',
    type: 'internship',
    location: 'Thiruchirapalli, Tamil Nadu',
    startDate: '2024-08-20',
    endDate: '2024-09-1',
    current: false,
    description: 'Completed an Artificial Intelligence internship focused on learning AI fundamentals.',
    bullets: [
      'Learned core concepts of Artificial Intelligence and Machine Learning',
      'Worked on basic AI models and data preprocessing techniques',
      'Explored Python libraries used for AI development and automation',,
      'Collaborated with mentors and completed assigned tasks within deadlines',
    ],
    tech: ['Python' , 'Artificial Intelligence' , 'Machine Learning' ,'Data Processing' , 'Problem Solving'],
  } 
];

function formatDate(dateStr) {
  if (!dateStr) return 'Present';
  return new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

export default function Experience({ experience }) {
  const data = experience?.length ? experience : DEFAULT_EXP;
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="experience" className="section experience-section" ref={ref}>
      <div className="orb orb-purple" style={{ width: 400, height: 400, bottom: '10%', right: '-8%' }} />

      <div className="container">
        <p className="section-eyebrow">My Journey</p>
        <h2 className="section-title">Internships & <span>Activities</span></h2>
        <p className="section-subtitle">
          Internships, leadership roles, hackathons and extracurriculars that shaped my development journey.
        </p>

        <div className={`timeline${isVisible ? ' visible' : ''}`}>
          {data.map((exp, i) => (
            <div key={exp._id} className={`timeline-item${i % 2 === 0 ? ' left' : ' right'}`}>
              <div className="timeline-dot">
                {exp.type === 'internship' ? <FiBriefcase size={14} /> : <FiAward size={14} />}
              </div>
              <div className="card timeline-card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">{exp.company}</p>
                  </div>
                  {exp.current && <span className="current-badge">Ongoing</span>}
                  {!exp.current && exp.type === 'internship' && <span className="current-badge" style={{ background: 'rgba(245,197,24,0.1)', border: '1px solid rgba(245,197,24,0.3)', color: 'var(--accent-gold)' }}>Internship</span>}
                </div>

                <div className="exp-meta">
                  <span><FiCalendar size={13} /> {formatDate(exp.startDate)} — {formatDate(exp.endDate)}</span>
                  {exp.location && <span><FiMapPin size={13} /> {exp.location}</span>}
                  {exp.type && <span className="type-chip">{exp.type}</span>}
                </div>

                {exp.description && <p className="exp-desc">{exp.description}</p>}

                {exp.bullets?.length > 0 && (
                  <ul className="exp-bullets">
                    {exp.bullets.map((b, j) => (
                      <li key={j}><span className="bullet-dot" />{b}</li>
                    ))}
                  </ul>
                )}

                {exp.tech?.length > 0 && (
                  <div className="exp-tech">
                    {exp.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="timeline-line" />
        </div>
      </div>
    </section>
  );
}
