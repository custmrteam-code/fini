'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, Sparkles } from 'lucide-react';
import { goals, formatCurrency, formatFullCurrency } from '@/lib/mockData';

const categories = ['All', 'Emergency', 'Home', 'Travel', 'Retirement', 'Education'];

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredGoals = activeTab === 'All'
    ? goals
    : goals.filter((g) => g.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <>
      <div className="page-header">
        <Link href="/" className="back-btn"><ChevronLeft size={20} /></Link>
        <h1>Goals & Wealth Planning</h1>
      </div>

      <div className="page-content" style={{ paddingTop: 0 }}>
        {/* Summary Card */}
        <div className="hero-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: 'var(--font-sm)', opacity: 0.8 }}>Total Goals Value</span>
              <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 800, marginTop: '4px' }}>
                {formatFullCurrency(goals.reduce((a, g) => a + g.target, 0))}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 'var(--font-sm)', opacity: 0.8 }}>Saved So Far</span>
              <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 800, marginTop: '4px' }}>
                {formatFullCurrency(goals.reduce((a, g) => a + g.current, 0))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 'var(--space-md)' }}>
            <div className="progress-bar-container" style={{ height: '8px' }}>
              <div
                className="progress-bar-fill"
                style={{
                  width: `${(goals.reduce((a, g) => a + g.current, 0) / goals.reduce((a, g) => a + g.target, 0)) * 100}%`,
                  background: 'rgba(255,255,255,0.9)',
                }}
              />
            </div>
            <span style={{ fontSize: 'var(--font-xs)', opacity: 0.7, marginTop: '4px', display: 'block' }}>
              {((goals.reduce((a, g) => a + g.current, 0) / goals.reduce((a, g) => a + g.target, 0)) * 100).toFixed(1)}% overall progress
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="tab-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab-item ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Goal Cards */}
        <div className="stack-lg">
          {filteredGoals.map((goal, i) => {
            const progress = (goal.current / goal.target) * 100;
            const monthsLeft = Math.ceil(
              (goal.target - goal.current) / goal.monthly
            );

            return (
              <div key={goal.id} className="goal-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="goal-card-header">
                  <div className="goal-icon-name">
                    <span className="goal-icon">{goal.icon}</span>
                    <span className="goal-name">{goal.name}</span>
                  </div>
                  <span className="badge badge-info" style={{ background: `${goal.color}20`, color: goal.color }}>
                    {progress.toFixed(0)}%
                  </span>
                </div>

                <div className="goal-amounts">
                  <span className="current">{formatFullCurrency(goal.current)}</span>
                  <span>of {formatFullCurrency(goal.target)}</span>
                </div>

                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.min(progress, 100)}%`, background: goal.color }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-md)', fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
                  <span>₹{(goal.monthly / 1000).toFixed(0)}K/month</span>
                  <span>{monthsLeft} months left</span>
                </div>

                {/* AI Tip */}
                <div className="ai-insight" style={{ marginTop: 'var(--space-md)' }}>
                  <Sparkles size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                  <span className="ai-text">{goal.aiTip}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Goal FAB */}
        <button
          style={{
            position: 'fixed',
            bottom: 'calc(var(--bottom-nav-height) + 20px)',
            right: 'calc(50% - 200px)',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--gradient-hero)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
            color: 'white',
            zIndex: 50,
          }}
          aria-label="Add new goal"
        >
          <Plus size={24} />
        </button>
      </div>
    </>
  );
}
