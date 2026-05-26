import React from 'react';
import { FiBook, FiCalendar, FiAward, FiStar } from 'react-icons/fi';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './Education.css';

const DEFAULT_EDU = [
  {
    _id: '1',
    institution: 'Anjalai Ammal Mahalingam Engineering College (Anna University)',
    degree: 'B.E. Computer Science & Engineering',
    field: 'Computer Science',
    startDate: '2022-08-01',
    endDate: '2026-05-31',
    current: true,
    grade: 'CGPA: 7.8 / 10',
    description: 'Core subjects: Data Structures, DBMS, Operating Systems, Computer Networks, OOP, Software Engineering. Active member of GDSC and Coding Club.',
  },
  {
    _id: '2',
    institution: 'National Higher Secondary School',
    degree: 'Higher Secondary Certificate (HSC)',
    field: 'Maths Biology Group',
    startDate: '2020-06-01',
    endDate: '2022-04-30',
    current: false,
    grade: 'Score: 79%',
    description: 'Studied Maths, Physics, Chemistry and Biology.',
  },
    {
    _id: '3',
    institution: 'st.joseph Higher Secondary School',
    degree: 'Senior Secondary Leave Certificate (SSLC)',
    field: 'General',
    startDate: '2019-06-01',
    endDate: '2020-04-30',
    current: false,
    grade: 'Score: 81%',
    description: 'Studied Maths, Physics, Chemistry and Computer Science. ',
    },
  {
  _id: '4',
  institution: 'Simplilearn SkillUp',
  degree: 'JavaScript for Beginners',
  field: 'Programming / JavaScript',
  startDate: '2026-04-01',
  endDate: '2026-04-29',
  current: false,
  grade: 'Completed with Certificate',
  description: 'Successfully completed the JavaScript for Beginners certification course from Simplilearn SkillUp covering JavaScript fundamentals, variables, functions, loops, arrays and basic programming concepts.',
  
},
   {
    _id: '5',
    institution: 'freeCodeCamp',
    degree: 'javascript libraries and frameworks',
    field: 'Online Certification',
    startDate: '2026-04-01',
    endDate: '2026-06-01',
    current: true,
    grade: 'Completed with Certificate',
    description: 'Completed 60+ hours of MERN stack development covering React, Node.js, Express, MongoDB, REST APIs and deployment.',
  },
];

function formatDate(d) {
  if (!d) return 'Present';
  return new Date(d).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

export default function Education({ education }) {
  const data = education?.length ? education : DEFAULT_EDU;
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="education" className="section education-section" ref={ref}>
      <div className="orb orb-red" style={{ width: 350, height: 350, bottom: '5%', left: '5%' }} />

      <div className="container">
        <p className="section-eyebrow">My Background</p>
        <h2 className="section-title">Education & <span>Certifications</span></h2>
        <p className="section-subtitle">
          My academic background, online courses and certifications that have built my technical foundation.
        </p>

        <div className={`edu-grid${isVisible ? ' visible' : ''}`}>
          {data.map((edu, i) => (
            <div key={edu._id} className="card edu-card" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="edu-icon">
                {i < 2 ? <FiBook size={20} /> : <FiStar size={20} />}
              </div>
              <div className="edu-content">
                <h3 className="edu-degree">{edu.degree}</h3>
                {edu.field && <p className="edu-field">{edu.field}</p>}
                <p className="edu-institution">{edu.institution}</p>
                <div className="edu-meta">
                  <span><FiCalendar size={12} /> {formatDate(edu.startDate)} — {formatDate(edu.endDate)}</span>
                  {edu.grade && <span className="edu-grade"><FiAward size={12} /> {edu.grade}</span>}
                  {edu.current && <span style={{ color: 'var(--accent-primary)', fontSize: '0.78rem', fontWeight: 600 }}>🟢 Currently Enrolled</span>}
                </div>
                {edu.description && <p className="edu-desc">{edu.description}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        
      </div>
    </section>
  );
}
