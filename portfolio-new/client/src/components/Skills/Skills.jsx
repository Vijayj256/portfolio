import React, { useState } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './Skills.css';

const CATEGORIES = ['all', 'frontend', 'backend', 'database', 'tools'];

const DEFAULT_SKILLS = [
  { name: 'HTML & CSS',    level: 90, category: 'frontend', color: '#E34F26' },
  { name: 'JavaScript',    level: 80, category: 'frontend', color: '#F7DF1E' },
  { name: 'React.js',      level: 75, category: 'frontend', color: '#61DAFB' },
  { name: 'Node.js',       level: 70, category: 'backend',  color: '#339933' },
  { name: 'Express.js',    level: 68, category: 'backend',  color: '#00f5d4' },
  { name: 'Python',        level: 78, category: 'backend',  color: '#3776AB' },
  { name: 'REST APIs',     level: 65, category: 'backend',  color: '#FF6B35' },
  { name: 'MongoDB',       level: 68, category: 'database', color: '#47A248' },
  { name: 'MySQL',         level: 72, category: 'database', color: '#4479A1' },
  { name: 'Git & GitHub',  level: 82, category: 'tools',    color: '#F05032' },
  { name: 'VS Code',       level: 88, category: 'tools',    color: '#007ACC' },
  { name: 'Postman',       level: 70, category: 'tools',    color: '#FF6C37' },
];

function SkillBar({ skill, animate }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-level">{skill.level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: animate ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
            boxShadow: animate ? `0 0 12px ${skill.color}60` : 'none',
          }}
        />
      </div>
    </div>
  );
}

export default function Skills({ skills }) {
  const data = skills?.length ? skills : DEFAULT_SKILLS;
  const [active, setActive] = useState('all');
  const [ref, isVisible] = useScrollAnimation(0.15);

  const filtered = active === 'all' ? data : data.filter(s => s.category === active);

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className="orb orb-purple" style={{ width: 500, height: 500, top: '20%', left: '-10%' }} />

      <div className="container">
        <p className="section-eyebrow">What I Know</p>
        <h2 className="section-title">My <span>Skills</span></h2>
        <p className="section-subtitle">
          Technologies and tools I have learned through coursework, personal projects, and self-study.
        </p>

        {/* Category tabs */}
        <div className="skill-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`skill-tab${active === cat ? ' active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Skill bars grid */}
        <div className="skills-grid">
          {filtered.map((skill, i) => (
            <SkillBar key={skill.name + i} skill={skill} animate={isVisible} />
          ))}
        </div>

        {/* Currently Learning strip */}
        <div className="learning-strip">
          <p className="learning-title">📚 Currently Learning</p>
          <div className="tech-strip">
            {['TypeScript', 'Docker', 'AWS Basics', 'Next.js', 'DSA'].map(t => (
              <span key={t} className="tech-chip learning">{t}</span>
            ))}
          </div>
        </div>

        {/* Coursework strip */}
        <div className="tech-strip" style={{ marginTop: 20 }}>
          <p style={{ width: '100%', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 10 }}>
            🎓 Relevant Coursework:
          </p>
          {['Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOP', 'Software Engineering'].map(t => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
