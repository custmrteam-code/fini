'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { monthlyBudget, cashFlow, formatFullCurrency } from '@/lib/mockData';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement,
  LineElement, Filler, Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export default function BudgetPage() {
  const totalPercent = ((monthlyBudget.spent / monthlyBudget.total) * 100).toFixed(0);
  const remaining = monthlyBudget.total - monthlyBudget.spent;

  const cashFlowData = {
    labels: cashFlow.months,
    datasets: [
      {
        label: 'Income',
        data: cashFlow.income,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#22c55e',
      },
      {
        label: 'Expenses',
        data: cashFlow.expenses,
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#f43f5e',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: (v) => `₹${(v / 1000).toFixed(0)}K`,
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${formatFullCurrency(ctx.parsed.y)}`,
        },
      },
      legend: { display: false },
    },
  };

  return (
    <>
      <div className="page-header">
        <Link href="/" className="back-btn"><ChevronLeft size={20} /></Link>
        <h1>Budget & Cash Flow</h1>
      </div>

      <div className="page-content" style={{ paddingTop: 0 }}>
        {/* Monthly Overview */}
        <div className="hero-card" style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
          <span style={{ fontSize: 'var(--font-sm)', opacity: 0.8 }}>July 2025 Budget</span>
          <div style={{ fontSize: 'var(--font-3xl)', fontWeight: 800, margin: '8px 0' }}>
            {formatFullCurrency(monthlyBudget.spent)}
          </div>
          <span style={{ fontSize: 'var(--font-sm)', opacity: 0.7 }}>
            of {formatFullCurrency(monthlyBudget.total)} ({totalPercent}% used)
          </span>
          <div className="progress-bar-container" style={{ height: '8px', marginTop: 'var(--space-md)' }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${totalPercent}%`,
                background: Number(totalPercent) > 90 ? '#f43f5e' : 'rgba(255,255,255,0.9)',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-sm)', fontSize: 'var(--font-xs)', opacity: 0.7 }}>
            <span>Spent</span>
            <span>Remaining: {formatFullCurrency(remaining)}</span>
          </div>
        </div>

        {/* AI Insight */}
        <div className="ai-insight" style={{ marginBottom: 'var(--space-lg)' }}>
          <span className="ai-icon">🤖</span>
          <span className="ai-text">
            You've overspent on <strong>Food & Dining</strong> by ₹2,200 this month. Try meal prepping on Sundays to save ~₹3K/month.
          </span>
        </div>

        {/* Category Breakdown */}
        <div className="section-title" style={{ marginBottom: 'var(--space-md)' }}>Category Breakdown</div>
        <div className="glass-card-static" style={{ marginBottom: 'var(--space-lg)' }}>
          {monthlyBudget.categories.map((cat, i) => {
            const percent = Math.min((cat.spent / cat.allocated) * 100, 100);
            const isOver = cat.spent > cat.allocated;

            return (
              <div key={cat.name} className="budget-category" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="budget-category-header">
                  <div className="budget-category-left">
                    <span className="cat-icon">{cat.icon}</span>
                    <span className="cat-name">{cat.name}</span>
                  </div>
                  <div className="budget-category-right">
                    <span className={`spent ${isOver ? 'budget-overspent' : ''}`}>
                      {formatFullCurrency(cat.spent)}
                    </span>
                    <span className="of-total"> / {formatFullCurrency(cat.allocated)}</span>
                  </div>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${percent}%`,
                      background: isOver ? '#f43f5e' : cat.color,
                    }}
                  />
                </div>
                {isOver && (
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--accent-rose)', marginTop: '4px', display: 'block' }}>
                    ⚠️ Over budget by {formatFullCurrency(cat.spent - cat.allocated)}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Cash Flow Chart */}
        <div className="section-title">Cash Flow Trend</div>
        <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-lg)', marginBottom: 'var(--space-md)', fontSize: 'var(--font-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ color: 'var(--text-muted)' }}>Income</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }} />
              <span style={{ color: 'var(--text-muted)' }}>Expenses</span>
            </div>
          </div>
          <div className="chart-container">
            <Line data={cashFlowData} options={chartOptions} />
          </div>
        </div>

        {/* Savings Opportunities */}
        <div className="section-title">💡 Savings Opportunities</div>
        <div className="stack">
          <div className="glass-card">
            <div style={{ fontSize: 'var(--font-base)', fontWeight: 600 }}>Switch to Annual Subscriptions</div>
            <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)', marginTop: '4px' }}>Save ₹4,800/year by switching Netflix, Spotify & YouTube to annual plans.</div>
            <span className="badge badge-success" style={{ marginTop: '8px' }}>Save ₹400/month</span>
          </div>
          <div className="glass-card">
            <div style={{ fontSize: 'var(--font-base)', fontWeight: 600 }}>Optimize Transport Costs</div>
            <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)', marginTop: '4px' }}>Use metro pass instead of daily Uber rides for office commute.</div>
            <span className="badge badge-success" style={{ marginTop: '8px' }}>Save ₹1,200/month</span>
          </div>
        </div>
      </div>
    </>
  );
}
