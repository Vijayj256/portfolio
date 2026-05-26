import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiLogOut, FiHome, FiFolder, FiZap, FiMail } from 'react-icons/fi';
import {
  getProjects, createProject, deleteProject,
  getSkills, createSkill, deleteSkill,
  getMessages, markRead,
} from '../utils/api';

const TABS = [
  { id: 'projects',  label: 'Projects',  icon: FiFolder },
  { id: 'skills',    label: 'Skills',    icon: FiZap },
  { id: 'messages',  label: 'Messages',  icon: FiMail },
];

export default function Admin() {
  const { user, loading, logout } = useAuth();
  const [tab, setTab] = useState('projects');

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <div style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: 240,
        background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', padding: '32px 20px', zIndex: 100,
      }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, marginBottom: 40 }}>
          <span style={{ color: 'var(--accent-primary)' }}>&lt;</span>Admin<span style={{ color: 'var(--accent-primary)' }}>/&gt;</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px', borderRadius: 'var(--radius-sm)',
              border: 'none', cursor: 'pointer',
              background: tab === id ? 'rgba(0,245,212,0.08)' : 'transparent',
              color: tab === id ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500,
              borderLeft: tab === id ? '2px solid var(--accent-primary)' : '2px solid transparent',
              transition: 'var(--transition)',
            }}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', textDecoration: 'none', padding: '10px 16px', fontSize: '0.9rem' }}>
            <FiHome size={15} /> View Portfolio
          </Link>
          <button onClick={() => { logout(); toast.success('Logged out'); }} style={{
            display: 'flex', alignItems: 'center', gap: 10, color: 'var(--accent-tertiary)',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '10px 16px', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
          }}>
            <FiLogOut size={15} /> Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: 240, padding: '40px 48px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 8 }}>
          {TABS.find(t => t.id === tab)?.label}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 40 }}>
          Welcome back, <strong style={{ color: 'var(--accent-primary)' }}>{user?.name}</strong>
        </p>

        {tab === 'projects'  && <ProjectsPanel />}
        {tab === 'skills'    && <SkillsPanel />}
        {tab === 'messages'  && <MessagesPanel />}
      </div>
    </div>
  );
}

// ─── Projects Panel ────────────────────────────────────────
function ProjectsPanel() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', tech: '', github: '', live: '', category: 'web', featured: false });

  useEffect(() => {
    getProjects().then(r => setProjects(r.data.data)).catch(() => {});
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, tech: form.tech.split(',').map(t => t.trim()).filter(Boolean) };
      const res = await createProject(payload);
      setProjects(p => [res.data.data, ...p]);
      setForm({ title: '', description: '', tech: '', github: '', live: '', category: 'web', featured: false });
      toast.success('Project added!');
    } catch { toast.error('Failed to add project'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects(p => p.filter(x => x._id !== id));
      toast.success('Deleted');
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      {/* Add form */}
      <div className="card" style={{ marginBottom: 32, padding: 28 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 24 }}>Add New Project</h3>
        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            ['title', 'Project Title *', 'text'],
            ['github', 'GitHub URL', 'url'],
            ['live', 'Live URL', 'url'],
            ['category', 'Category', 'select'],
          ].map(([name, label, type]) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{label}</label>
              {type === 'select' ? (
                <select value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                  {['web','mobile','api','ai','other'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : (
                <input type={type} value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
                  required={name === 'title'}
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }} />
              )}
            </div>
          ))}
          <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Description *</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} required rows={3}
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', resize: 'vertical' }} />
          </div>
          <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Tech Stack (comma separated)</label>
            <input type="text" value={form.tech} onChange={e => setForm(p => ({ ...p, tech: e.target.value }))} placeholder="React, Node.js, MongoDB"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }} />
          </div>
          <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} />
            <label htmlFor="featured" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Mark as Featured</label>
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <button type="submit" className="btn btn-primary"><FiPlus size={15} /> Add Project</button>
          </div>
        </form>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {projects.map(p => (
          <div key={p._id} className="card" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 4 }}>{p.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{p.category} • {p.tech?.join(', ')}</p>
            </div>
            <button onClick={() => handleDelete(p._id)} style={{ background: 'rgba(255,59,107,0.1)', border: '1px solid rgba(255,59,107,0.3)', borderRadius: 8, padding: '8px 12px', color: 'var(--accent-tertiary)', cursor: 'pointer' }}>
              <FiTrash2 size={15} />
            </button>
          </div>
        ))}
        {projects.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No projects yet. Add one above.</p>}
      </div>
    </div>
  );
}

// ─── Skills Panel ────────────────────────────────────────
function SkillsPanel() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: '', level: 80, category: 'frontend', color: '#00f5d4' });

  useEffect(() => { getSkills().then(r => setSkills(r.data.data)).catch(() => {}); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createSkill({ ...form, level: Number(form.level) });
      setSkills(p => [...p, res.data.data]);
      toast.success('Skill added!');
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    try { await deleteSkill(id); setSkills(p => p.filter(x => x._id !== id)); toast.success('Deleted'); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: 32, padding: 28 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 24 }}>Add Skill</h3>
        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 16, alignItems: 'end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Skill Name</label>
            <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Level (0-100): {form.level}</label>
            <input type="range" min={0} max={100} value={form.level} onChange={e => setForm(p => ({ ...p, level: e.target.value }))} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Category</label>
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
              {['frontend','backend','database','devops','tools','other'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '12px 20px' }}><FiPlus size={15} /></button>
        </form>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {skills.map(s => (
          <div key={s._id} className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 2 }}>{s.name}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.category} • {s.level}%</p>
            </div>
            <button onClick={() => handleDelete(s._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-tertiary)' }}><FiTrash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Messages Panel ────────────────────────────────────────
function MessagesPanel() {
  const [messages, setMessages] = useState([]);

  useEffect(() => { getMessages().then(r => setMessages(r.data.data)).catch(() => {}); }, []);

  const handleRead = async (id) => {
    try { const r = await markRead(id); setMessages(p => p.map(m => m._id === id ? r.data.data : m)); }
    catch { toast.error('Error'); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {messages.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No messages yet.</p>}
      {messages.map(m => (
        <div key={m._id} className="card" style={{ padding: 24, borderLeft: `3px solid ${m.read ? 'var(--border)' : 'var(--accent-primary)'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 4 }}>{m.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.85rem' }}>— {m.email}</span></h4>
              {m.subject && <p style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>{m.subject}</p>}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {!m.read && <span style={{ padding: '3px 10px', background: 'rgba(0,245,212,0.1)', border: '1px solid rgba(0,245,212,0.3)', borderRadius: 99, fontSize: '0.75rem', color: 'var(--accent-primary)' }}>New</span>}
              {!m.read && <button onClick={() => handleRead(m._id)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Mark Read</button>}
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>{m.message}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 12 }}>{new Date(m.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
