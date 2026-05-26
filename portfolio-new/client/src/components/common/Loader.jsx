// components/common/Loader.jsx
import React from 'react';

export default function Loader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <div style={{
        width: 60, height: 60,
        border: '3px solid rgba(255,255,255,0.06)',
        borderTop: '3px solid var(--accent-primary)',
        borderRadius: '50%',
        animation: 'rotate 0.8s linear infinite',
      }} />
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading...</p>
    </div>
  );
}
