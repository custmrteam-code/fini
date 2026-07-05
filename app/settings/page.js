'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import { goals, monthlyBudget } from '@/lib/mockData';

export default function CustomizePage() {
  const [target, setTarget] = useState(goals[0].target);
  const [limit, setLimit] = useState(monthlyBudget.total);

  return (
    <>
      <div className="page-header">
        <Link href="/" className="back-btn"><ChevronLeft size={20} /></Link>
        <h1>Customize Targets & Limits</h1>
      </div>

      <div className="page-content" style={{ paddingTop: 0 }}>
        <div className="hero-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: 'var(--font-xl)', marginBottom: 'var(--space-md)' }}>Customize Components</h2>
          
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8 }}>Emergency Fund Target (₹)</label>
            <input 
              type="number" 
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)',
                color: 'white',
                fontSize: 'var(--font-md)'
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-md)' }}>
            <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8 }}>Monthly Budget Limit (₹)</label>
            <input 
              type="number" 
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)',
                color: 'white',
                fontSize: 'var(--font-md)'
              }}
            />
          </div>

          <button 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '12px',
              background: 'var(--gradient-hero)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 'var(--space-lg)'
            }}
            onClick={() => alert('Settings Saved Successfully!')}
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
