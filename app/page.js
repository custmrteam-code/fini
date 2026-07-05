'use client';

import { Bell, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import { user, netWorth, accounts, monthlyBudget, transactions, upcomingBills, healthScore, formatCurrency, formatFullCurrency } from '@/lib/mockData';
import HealthGauge from '@/components/HealthGauge';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const assetData = {
    labels: ['Mutual Funds', 'Stocks', 'FD', 'PPF', 'EPF', 'Savings', 'Gold', 'NPS', 'Crypto'],
    datasets: [{
      data: [
        accounts.mutualFunds, accounts.stocks, accounts.fd,
        accounts.ppf, accounts.epf, accounts.savings,
        accounts.gold, accounts.nps, accounts.crypto,
      ],
      backgroundColor: [
        '#6366f1', '#22c55e', '#64748b', '#8b5cf6',
        '#14b8a6', '#38bdf8', '#eab308', '#f97316', '#f43f5e',
      ],
      borderWidth: 0,
      cutout: '70%',
    }],
  };

  const chartOptions = {
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
        padding: 10,
        callbacks: {
          label: (ctx) => ` ${formatFullCurrency(ctx.parsed)}`,
        },
      },
    },
  };

  return (
    <>
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <div className="header-avatar">{user.avatar}</div>
          <div className="header-greeting">
            <span className="greeting-text">Good Evening</span>
            <span className="user-name">{user.name}</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="header-btn" aria-label="Search"><Search size={18} /></button>
          <Link href="/settings" className="header-btn" aria-label="Settings">
            <Settings size={18} />
          </Link>
          <button className="header-btn" aria-label="Notifications">
            <Bell size={18} />
          </button>
        </div>
      </header>

      <div className="page-content">
        {/* Net Worth Hero Card */}
        <div className="hero-card">
          <span style={{ fontSize: 'var(--font-sm)', opacity: 0.8, fontWeight: 500 }}>Total Net Worth</span>
          <div style={{ fontSize: 'var(--font-3xl)', fontWeight: 800, marginTop: '4px', letterSpacing: '-0.5px' }}>
            {formatFullCurrency(netWorth.totalAssets - netWorth.totalLiabilities)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
            <span className="badge badge-success">↑ 12.4% this year</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: 'var(--font-sm)' }}>
            <div>
              <span style={{ opacity: 0.7 }}>Assets</span>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-md)' }}>{formatCurrency(netWorth.totalAssets)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ opacity: 0.7 }}>Liabilities</span>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-md)' }}>{formatCurrency(netWorth.totalLiabilities)}</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stat-pills">
          <div className="stat-pill">
            <span className="label">Income</span>
            <span className="value positive">{formatCurrency(user.monthlyIncome)}</span>
          </div>
          <div className="stat-pill">
            <span className="label">Expenses</span>
            <span className="value negative">{formatCurrency(monthlyBudget.spent)}</span>
          </div>
          <div className="stat-pill">
            <span className="label">Savings</span>
            <span className="value neutral">{formatCurrency(user.monthlyIncome - monthlyBudget.spent)}</span>
          </div>
        </div>

        {/* Financial Health Score */}
        <div className="glass-card" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          <div className="section-title" style={{ marginBottom: 'var(--space-md)' }}>Financial Health</div>
          <HealthGauge score={healthScore.overall} size={130} />
          <div style={{ marginTop: 'var(--space-sm)' }}>
            <span className="badge badge-warning">Grade {healthScore.grade}</span>
          </div>
        </div>

        {/* AI Insight */}
        <div className="ai-insight" style={{ marginBottom: 'var(--space-lg)' }}>
          <span className="ai-icon">🤖</span>
          <span className="ai-text">
            Your spending on dining is 18% above budget this month. Consider cooking at home 2x more per week to save ₹3,200.
          </span>
        </div>

        {/* Upcoming Bills */}
        <div className="section-header">
          <h2>Upcoming Bills</h2>
          <button className="see-all">See All</button>
        </div>
        <div className="h-scroll" style={{ marginBottom: 'var(--space-lg)' }}>
          {upcomingBills.map((bill) => (
            <div key={bill.id} className="bill-card">
              <span className="bill-icon">{bill.icon}</span>
              <div className="bill-info">
                <div className="bill-name">{bill.name}</div>
                <div className="bill-due">Due {new Date(bill.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
              </div>
              <div className="bill-amount" style={{ color: bill.urgency === 'high' ? 'var(--accent-rose)' : 'var(--text-primary)' }}>
                {formatFullCurrency(bill.amount)}
              </div>
            </div>
          ))}
        </div>

        {/* Asset Breakdown */}
        <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="section-title">Asset Breakdown</div>
          <div className="chart-container">
            <Doughnut data={assetData} options={chartOptions} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: 'var(--space-md)' }}>
            {assetData.labels.map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: assetData.datasets[0].backgroundColor[i], flexShrink: 0 }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="section-header">
          <h2>Recent Transactions</h2>
          <button className="see-all">See All</button>
        </div>
        <div className="glass-card-static">
          {transactions.slice(0, 6).map((tx) => (
            <div key={tx.id} className="transaction-item">
              <div className="transaction-icon">{tx.icon}</div>
              <div className="transaction-info">
                <div className="name">{tx.name}</div>
                <div className="date">{new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
              </div>
              <div className={`transaction-amount ${tx.type}`}>
                {tx.amount > 0 ? '+' : ''}{formatFullCurrency(tx.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
