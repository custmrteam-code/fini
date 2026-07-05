'use client';

import Link from 'next/link';
import { ChevronLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { investments, formatCurrency, formatFullCurrency } from '@/lib/mockData';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, Filler, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip, Legend);

export default function InvestmentsPage() {
  const allocationData = {
    labels: investments.allocation.map((a) => a.name),
    datasets: [{
      data: investments.allocation.map((a) => a.value),
      backgroundColor: investments.allocation.map((a) => a.color),
      borderWidth: 0,
      cutout: '72%',
    }],
  };

  const performanceData = {
    labels: investments.performanceHistory.map((p) => p.month),
    datasets: [{
      label: 'Portfolio Value',
      data: investments.performanceHistory.map((p) => p.value),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: '#6366f1',
      borderWidth: 2,
    }],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: {
          color: '#64748b',
          font: { size: 10 },
          callback: (v) => `₹${(v / 100000).toFixed(1)}L`,
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
          label: (ctx) => ` ${formatFullCurrency(ctx.parsed.y)}`,
        },
      },
      legend: { display: false },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => ` ${formatFullCurrency(ctx.parsed)}`,
        },
      },
    },
  };

  return (
    <>
      <div className="page-header">
        <Link href="/" className="back-btn"><ChevronLeft size={20} /></Link>
        <h1>Investments & Portfolio</h1>
      </div>

      <div className="page-content" style={{ paddingTop: 0 }}>
        {/* Portfolio Value Hero */}
        <div className="hero-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <span style={{ fontSize: 'var(--font-sm)', opacity: 0.8 }}>Total Portfolio Value</span>
          <div style={{ fontSize: 'var(--font-3xl)', fontWeight: 800, marginTop: '4px' }}>
            {formatFullCurrency(investments.totalValue)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <span className="badge badge-success">
              <TrendingUp size={12} /> +{investments.returnsPercent}%
            </span>
            <span style={{ fontSize: 'var(--font-sm)', opacity: 0.7 }}>
              +{formatFullCurrency(investments.totalReturns)} returns
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-lg)', fontSize: 'var(--font-sm)' }}>
            <div>
              <span style={{ opacity: 0.7 }}>Invested</span>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-md)' }}>{formatCurrency(investments.totalInvested)}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ opacity: 0.7 }}>Monthly SIP</span>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-md)' }}>{formatCurrency(investments.monthlyContribution)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ opacity: 0.7 }}>Returns</span>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-md)', color: '#22c55e' }}>+{formatCurrency(investments.totalReturns)}</div>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="section-title">Performance (1 Year)</div>
        <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="chart-container-lg">
            <Line data={performanceData} options={lineOptions} />
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="section-title">Asset Allocation</div>
        <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
            <div style={{ width: '140px', height: '140px', flexShrink: 0 }}>
              <Doughnut data={allocationData} options={doughnutOptions} />
            </div>
            <div className="flex-col gap-sm" style={{ flex: 1 }}>
              {investments.allocation.map((a) => (
                <div key={a.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>{a.name}</span>
                  </div>
                  <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600 }}>{a.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="ai-insight" style={{ marginBottom: 'var(--space-lg)' }}>
          <span className="ai-icon">🤖</span>
          <span className="ai-text">
            Your portfolio is <strong>equity-heavy (82%)</strong>. Consider adding 10-15% to debt funds like Liquid or Short Duration for stability and emergency liquidity.
          </span>
        </div>

        {/* Holdings List */}
        <div className="section-title">All Holdings</div>
        <div className="glass-card-static">
          {investments.holdings.map((h) => (
            <div key={h.name} className="holding-item">
              <span className="holding-dot" style={{ background: h.color }} />
              <div className="holding-info">
                <div className="h-name">{h.name}</div>
                <div className="h-type">{h.type} · {h.allocation}%</div>
              </div>
              <div className="holding-values">
                <div className="h-value">{formatFullCurrency(h.value)}</div>
                <div className={`h-returns ${h.returns >= 0 ? 'positive' : 'negative'}`}>
                  {h.returns >= 0 ? '+' : ''}{h.returns}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
