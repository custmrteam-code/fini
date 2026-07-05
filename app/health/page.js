'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { healthScore } from '@/lib/mockData';
import HealthGauge from '@/components/HealthGauge';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement,
  LineElement, Filler, Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export default function HealthPage() {
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      data: healthScore.monthlyTrend,
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#6366f1',
      borderWidth: 2,
    }],
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
        min: 50,
        max: 100,
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#64748b', font: { size: 11 } },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#eab308';
    if (score >= 40) return '#f97316';
    return '#f43f5e';
  };

  const getStatusBadge = (status) => {
    const map = {
      'excellent': 'badge-success',
      'good': 'badge-info',
      'fair': 'badge-warning',
      'needs-work': 'badge-danger',
    };
    return map[status] || 'badge-info';
  };

  return (
    <>
      <div className="page-header">
        <Link href="/" className="back-btn"><ChevronLeft size={20} /></Link>
        <h1>Financial Health Center</h1>
      </div>

      <div className="page-content" style={{ paddingTop: 0 }}>
        {/* Overall Score */}
        <div className="glass-card" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          <HealthGauge score={healthScore.overall} size={180} strokeWidth={14} label="Health Score" />
          <div style={{ marginTop: 'var(--space-md)' }}>
            <span className="badge badge-warning" style={{ fontSize: 'var(--font-base)', padding: '4px 16px' }}>
              Grade {healthScore.grade}
            </span>
          </div>
          <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)', marginTop: 'var(--space-md)', lineHeight: 1.5 }}>
            Your financial health is <strong style={{ color: 'var(--text-primary)' }}>above average</strong>. 
            Focus on insurance and emergency fund to reach Grade A.
          </p>
        </div>

        {/* Risk Level & Key Ratios */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Risk Level</span>
            <span style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--accent-amber)' }}>{healthScore.riskLevel}</span>
          </div>
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Savings Rate</span>
            <span style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--accent-emerald)' }}>{healthScore.savingsRate}%</span>
          </div>
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Debt-to-Income</span>
            <span style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--accent-emerald)' }}>{healthScore.debtToIncome}%</span>
          </div>
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Emergency Buffer</span>
            <span style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--accent-amber)' }}>4.1 mo</span>
          </div>
        </div>

        {/* Category Scores */}
        <div className="section-title">Category Breakdown</div>
        <div className="stack" style={{ marginBottom: 'var(--space-lg)' }}>
          {healthScore.categories.map((cat) => (
            <div key={cat.name} className="health-cat">
              <span className="health-cat-icon">{cat.icon}</span>
              <div className="health-cat-info">
                <div className="hc-name">{cat.name}</div>
                <div className="hc-tip">{cat.tip}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span className="health-cat-score" style={{ color: getScoreColor(cat.score) }}>
                  {cat.score}
                </span>
                <span className={`badge ${getStatusBadge(cat.status)}`} style={{ fontSize: '9px' }}>
                  {cat.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Score Trend */}
        <div className="section-title">Score Trend</div>
        <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="chart-container">
            <Line data={trendData} options={chartOptions} />
          </div>
        </div>

        {/* Action Plan */}
        <div className="section-title">🎯 Action Plan to Improve</div>
        <div className="stack" style={{ marginBottom: 'var(--space-lg)' }}>
          {healthScore.actionPlan.map((action, i) => (
            <div key={i} className="action-item" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`action-number ${action.priority}`}>{i + 1}</div>
              <div className="action-content">
                <div className="action-text">{action.action}</div>
                <div className="action-impact">↑ {action.impact}</div>
              </div>
              <span className={`badge badge-${action.priority === 'high' ? 'danger' : action.priority === 'medium' ? 'warning' : 'success'}`}>
                {action.priority}
              </span>
            </div>
          ))}
        </div>

        {/* AI Summary */}
        <div className="ai-insight">
          <span className="ai-icon">🤖</span>
          <span className="ai-text">
            Your financial health has improved <strong>+7 points</strong> in 6 months. 
            The biggest quick win is getting term life insurance — it alone can boost your score by 8 points.
          </span>
        </div>
      </div>
    </>
  );
}
