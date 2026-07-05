'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Bot, Target, Wallet, Heart } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/planner', label: 'Planner', icon: Bot },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/health', label: 'Health', icon: Heart },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon className="nav-icon" size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className="nav-label">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
