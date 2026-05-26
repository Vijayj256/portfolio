import React, { useState } from 'react';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './Projects.css';

const CATEGORIES = ['all', 'web', 'mobile', 'api', 'other'];

const DEFAULT_PROJECTS = [
 {
  _id: '1',title: 'AI-Based Network Threat Detection System',category: 'cybersecurity',featured: true,
  description:'An AI-powered cybersecurity system that detects malicious network traffic and explains threats using Machine Learning and Large Language Models (LLMs).',
  longDesc:'Developed a full-stack intrusion detection system using React frontend and Django REST API backend integrated with a Random Forest machine learning model trained on the CIC-IDS2017 dataset. The system analyzes uploaded network traffic data to detect attacks such as DoS, DDoS, PortScan, and Bot attacks. Integrated Ollama LLM to generate detailed threat explanations including attack cause, risk level, and prevention methods. Features include real-time traffic analysis, SIEM-style dashboard, threat visualization, alert monitoring, and AI-generated security insights.',
  tech: ['React','TypeScript','Django','Python','Scikit-learn','Random Forest','SQLite','REST API','Ollama','LLM','Cybersecurity','Machine Learning'],
  github: '#',live: '#',
  image:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
  },
  {
    _id: '2', title: 'Task Manager', category: 'web',
    description: 'My first React project — a Task Manager with add, delete, complete and filter features. Helped me learn React hooks.',
    tech: ['Html','CSS','javascript','React', 'node.js','express'],
    github: '#', live: '#',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
  },
];

function ProjectCard({ project, onClick }) {
  return (
    <div className={`project-card${project.featured ? ' featured' : ''}`} onClick={() => onClick(project)}>
      <div className="project-img-wrap">
        {project.image
          ? <img src={project.image} alt={project.title} loading="lazy" />
          : <div className="project-img-placeholder" />}
        {project.featured && <div className="featured-badge">⭐ Featured</div>}
        <div className="project-overlay"><span>View Details</span></div>
      </div>
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tech">
          {project.tech?.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="project-links" onClick={e => e.stopPropagation()}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
              <FiGithub size={15} /> GitHub
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="project-link live">
              <FiExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Modal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FiX size={22} /></button>
        {project.image && <img src={project.image} alt={project.title} className="modal-img" />}
        <div className="modal-content">
          <h2>{project.title}</h2>
          <p className="modal-desc">{project.longDesc || project.description}</p>
          <div className="modal-tech">
            {project.tech?.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <div className="modal-actions">
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline"><FiGithub /> GitHub Repo</a>}
            {project.live   && <a href={project.live}   target="_blank" rel="noreferrer" className="btn btn-primary"><FiExternalLink /> Live Demo</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }) {
  const data = projects?.length ? projects : DEFAULT_PROJECTS;
  const [filter, setFilter]     = useState('all');
  const [selected, setSelected] = useState(null);
  const [ref, isVisible]        = useScrollAnimation(0.1);

  const filtered = filter === 'all' ? data : data.filter(p => p.category === filter);

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="orb orb-cyan" style={{ width: 400, height: 400, top: '10%', right: '-8%' }} />

      <div className="container">
        <p className="section-eyebrow">What I've Built</p>
        <h2 className="section-title">My <span>Projects</span></h2>
        <p className="section-subtitle">
          A collection of academic projects, personal builds, and hackathon submissions that showcase my learning journey.
        </p>

        {/* Filters */}
        <div className="project-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`skill-tab${filter === cat ? ' active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={`projects-grid${isVisible ? ' visible' : ''}`}>
          {filtered.map((p) => (
            <ProjectCard key={p._id} project={p} onClick={setSelected} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px 0' }}>
            No projects in this category yet.
          </p>
        )}
      </div>

      <Modal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
