import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      gap: '16px',
    }}>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '8rem',
        lineHeight: 1,
        background: 'var(--gradient-main)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>404</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
        Oops! This page doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '12px' }}>
        ← Back to Home
      </Link>
    </div>
  );
}
