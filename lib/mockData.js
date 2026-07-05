// ArthaAI — Mock Financial Data
// User: Rahul Sharma, 28, Software Engineer in Bengaluru

export const user = {
  name: 'Rahul Sharma',
  age: 28,
  occupation: 'Software Engineer',
  city: 'Bengaluru',
  avatar: '👨‍💻',
  monthlyIncome: 120000,
  joinedDate: '2024-03-15',
};

export const accounts = {
  savings: 350000,
  fd: 500000,
  ppf: 280000,
  nps: 145000,
  stocks: 420000,
  mutualFunds: 680000,
  gold: 150000,
  crypto: 45000,
  epf: 380000,
};

export const netWorth = {
  totalAssets: Object.values({
    savings: 350000, fd: 500000, ppf: 280000, nps: 145000,
    stocks: 420000, mutualFunds: 680000, gold: 150000, crypto: 45000, epf: 380000,
  }).reduce((a, b) => a + b, 0),
  totalLiabilities: 185000,
  get net() { return this.totalAssets - this.totalLiabilities; },
};

export const monthlyBudget = {
  total: 85000,
  spent: 62400,
  categories: [
    { name: 'Rent', allocated: 25000, spent: 25000, icon: '🏠', color: '#6366f1' },
    { name: 'Food & Dining', allocated: 12000, spent: 14200, icon: '🍕', color: '#f43f5e' },
    { name: 'Transport', allocated: 5000, spent: 3800, icon: '🚗', color: '#eab308' },
    { name: 'Shopping', allocated: 8000, spent: 6500, icon: '🛍️', color: '#ec4899' },
    { name: 'Utilities', allocated: 4000, spent: 3600, icon: '💡', color: '#14b8a6' },
    { name: 'Entertainment', allocated: 6000, spent: 4800, icon: '🎮', color: '#8b5cf6' },
    { name: 'Health', allocated: 5000, spent: 2100, icon: '🏥', color: '#22c55e' },
    { name: 'Subscriptions', allocated: 3000, spent: 2400, icon: '📱', color: '#f97316' },
  ],
};

export const investments = {
  totalValue: 1275000,
  totalInvested: 1080000,
  totalReturns: 195000,
  returnsPercent: 18.06,
  monthlyContribution: 35000,
  holdings: [
    { name: 'Nifty 50 Index Fund', type: 'Mutual Fund', value: 320000, invested: 270000, returns: 18.5, allocation: 25.1, color: '#6366f1' },
    { name: 'HDFC Mid-Cap Fund', type: 'Mutual Fund', value: 180000, invested: 145000, returns: 24.1, allocation: 14.1, color: '#8b5cf6' },
    { name: 'Parag Parikh Flexi Cap', type: 'Mutual Fund', value: 180000, invested: 160000, returns: 12.5, allocation: 14.1, color: '#a78bfa' },
    { name: 'Infosys', type: 'Stock', value: 145000, invested: 120000, returns: 20.8, allocation: 11.4, color: '#22c55e' },
    { name: 'TCS', type: 'Stock', value: 130000, invested: 115000, returns: 13.0, allocation: 10.2, color: '#14b8a6' },
    { name: 'Reliance', type: 'Stock', value: 95000, invested: 85000, returns: 11.8, allocation: 7.5, color: '#06b6d4' },
    { name: 'Sovereign Gold Bond', type: 'Gold', value: 150000, invested: 125000, returns: 20.0, allocation: 11.8, color: '#eab308' },
    { name: 'Bitcoin', type: 'Crypto', value: 45000, invested: 40000, returns: 12.5, allocation: 3.5, color: '#f97316' },
    { name: 'Fixed Deposit - SBI', type: 'FD', value: 500000, invested: 460000, returns: 8.7, allocation: 2.3, color: '#64748b' },
  ],
  allocation: [
    { name: 'Mutual Funds', value: 680000, percent: 53.3, color: '#6366f1' },
    { name: 'Stocks', value: 370000, percent: 29.0, color: '#22c55e' },
    { name: 'Gold', value: 150000, percent: 11.8, color: '#eab308' },
    { name: 'Crypto', value: 45000, percent: 3.5, color: '#f97316' },
    { name: 'FD', value: 30000, percent: 2.4, color: '#64748b' },
  ],
  performanceHistory: [
    { month: 'Jan', value: 980000 },
    { month: 'Feb', value: 1010000 },
    { month: 'Mar', value: 1045000 },
    { month: 'Apr', value: 1020000 },
    { month: 'May', value: 1090000 },
    { month: 'Jun', value: 1130000 },
    { month: 'Jul', value: 1105000 },
    { month: 'Aug', value: 1160000 },
    { month: 'Sep', value: 1195000 },
    { month: 'Oct', value: 1210000 },
    { month: 'Nov', value: 1250000 },
    { month: 'Dec', value: 1275000 },
  ],
};

export const goals = [
  {
    id: 1,
    name: 'Emergency Fund',
    icon: '🛡️',
    target: 600000,
    current: 350000,
    monthly: 15000,
    deadline: '2025-12-31',
    category: 'emergency',
    color: '#22c55e',
    aiTip: 'Increase SIP by ₹2K to reach goal 2 months early.',
  },
  {
    id: 2,
    name: 'Dream Home',
    icon: '🏡',
    target: 5000000,
    current: 1250000,
    monthly: 25000,
    deadline: '2030-06-30',
    category: 'home',
    color: '#6366f1',
    aiTip: 'Consider a balanced advantage fund for faster growth.',
  },
  {
    id: 3,
    name: 'Europe Trip',
    icon: '✈️',
    target: 400000,
    current: 120000,
    monthly: 10000,
    deadline: '2026-03-31',
    category: 'travel',
    color: '#f43f5e',
    aiTip: 'A short-term debt fund can earn 7% while you save.',
  },
  {
    id: 4,
    name: 'Retirement Fund',
    icon: '🏖️',
    target: 50000000,
    current: 805000,
    monthly: 20000,
    deadline: '2056-12-31',
    category: 'retirement',
    color: '#eab308',
    aiTip: 'Your current SIP rate can grow to ₹4.8 Cr by retirement.',
  },
  {
    id: 5,
    name: 'MBA Education',
    icon: '🎓',
    target: 3000000,
    current: 450000,
    monthly: 12000,
    deadline: '2028-06-30',
    category: 'education',
    color: '#8b5cf6',
    aiTip: 'Lock in a child education plan for tax benefits u/s 80C.',
  },
];

export const transactions = [
  { id: 1, name: 'Salary Credit', amount: 120000, type: 'income', category: 'Salary', date: '2025-07-01', icon: '💰' },
  { id: 2, name: 'Rent Payment', amount: -25000, type: 'expense', category: 'Rent', date: '2025-07-01', icon: '🏠' },
  { id: 3, name: 'Swiggy Order', amount: -650, type: 'expense', category: 'Food & Dining', date: '2025-07-04', icon: '🍕' },
  { id: 4, name: 'SIP - Nifty 50', amount: -15000, type: 'investment', category: 'Investment', date: '2025-07-05', icon: '📈' },
  { id: 5, name: 'Uber Ride', amount: -380, type: 'expense', category: 'Transport', date: '2025-07-04', icon: '🚗' },
  { id: 6, name: 'Amazon Purchase', amount: -2499, type: 'expense', category: 'Shopping', date: '2025-07-03', icon: '🛍️' },
  { id: 7, name: 'Electricity Bill', amount: -1800, type: 'expense', category: 'Utilities', date: '2025-07-02', icon: '💡' },
  { id: 8, name: 'Netflix', amount: -649, type: 'expense', category: 'Subscriptions', date: '2025-07-01', icon: '📱' },
  { id: 9, name: 'Freelance Project', amount: 35000, type: 'income', category: 'Freelance', date: '2025-06-28', icon: '💻' },
  { id: 10, name: 'Gym Membership', amount: -2100, type: 'expense', category: 'Health', date: '2025-07-01', icon: '🏥' },
  { id: 11, name: 'Dinner Out', amount: -1850, type: 'expense', category: 'Food & Dining', date: '2025-07-03', icon: '🍕' },
  { id: 12, name: 'Movie Tickets', amount: -800, type: 'expense', category: 'Entertainment', date: '2025-07-02', icon: '🎮' },
];

export const upcomingBills = [
  { id: 1, name: 'Credit Card Bill', amount: 18500, dueDate: '2025-07-15', icon: '💳', urgency: 'high' },
  { id: 2, name: 'Internet Bill', amount: 1199, dueDate: '2025-07-10', icon: '🌐', urgency: 'medium' },
  { id: 3, name: 'Insurance Premium', amount: 12000, dueDate: '2025-07-20', icon: '🛡️', urgency: 'low' },
  { id: 4, name: 'Phone Recharge', amount: 599, dueDate: '2025-07-12', icon: '📱', urgency: 'low' },
];

export const healthScore = {
  overall: 72,
  grade: 'B+',
  categories: [
    { name: 'Savings Rate', score: 85, icon: '💰', status: 'excellent', tip: 'You save 29% of income — great!' },
    { name: 'Debt Management', score: 78, icon: '📊', status: 'good', tip: 'Debt-to-income ratio is healthy at 12%.' },
    { name: 'Emergency Fund', score: 58, icon: '🛡️', status: 'needs-work', tip: 'Build 6-month expenses buffer (currently 4.1 months).' },
    { name: 'Investment Diversity', score: 70, icon: '📈', status: 'good', tip: 'Good mix but consider adding international exposure.' },
    { name: 'Insurance Coverage', score: 55, icon: '🏥', status: 'needs-work', tip: 'Get term insurance of 1 Cr for adequate coverage.' },
    { name: 'Retirement Readiness', score: 65, icon: '🏖️', status: 'fair', tip: 'Increase NPS contribution for tax benefits.' },
  ],
  riskLevel: 'Moderate',
  debtToIncome: 12,
  savingsRate: 29,
  monthlyTrend: [65, 67, 68, 70, 69, 71, 72],
  actionPlan: [
    { priority: 'high', action: 'Get Term Life Insurance (₹1 Cr cover)', impact: '+8 points' },
    { priority: 'high', action: 'Build emergency fund to 6 months', impact: '+6 points' },
    { priority: 'medium', action: 'Start NPS for additional tax savings', impact: '+4 points' },
    { priority: 'medium', action: 'Add international mutual fund exposure', impact: '+3 points' },
    { priority: 'low', action: 'Consolidate credit card payments', impact: '+2 points' },
  ],
};

export const cashFlow = {
  months: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  income: [120000, 120000, 155000, 120000, 120000, 155000],
  expenses: [78000, 82000, 75000, 88000, 79000, 62400],
};

export const formatCurrency = (amount) => {
  const absAmount = Math.abs(amount);
  if (absAmount >= 10000000) return `₹${(absAmount / 10000000).toFixed(2)} Cr`;
  if (absAmount >= 100000) return `₹${(absAmount / 100000).toFixed(1)} L`;
  if (absAmount >= 1000) return `₹${(absAmount / 1000).toFixed(1)}K`;
  return `₹${absAmount}`;
};

export const formatFullCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};
