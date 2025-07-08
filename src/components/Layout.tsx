import React from 'react';
import { Activity, TrendingUp, Users, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { label: 'Dashboard', icon: TrendingUp, key: 'dashboard', path: '/' },
  { label: 'Holders', icon: Users, key: 'holders', path: '/holders' },
  { label: 'Transactions', icon: Activity, key: 'transactions', path: '/transactions' },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-100 text-gray-900">
      <header className="bg-gradient-to-r from-blue-100/80 to-purple-100/80 border-b border-blue-200 px-8 py-5 shadow-lg sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-400 p-2 rounded-lg shadow-lg">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight drop-shadow text-blue-900">TokenWise</h1>
              <p className="text-blue-600 text-sm font-medium">Solana Token Monitor</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Live</span>
            </div>
            <button className="p-2 hover:bg-blue-200 rounded-lg transition-colors border border-blue-200 shadow">
              <Settings className="w-5 h-5 text-blue-700" />
            </button>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="w-64 bg-gradient-to-b from-blue-100/80 to-gray-100/80 border-r border-blue-200 p-8 min-h-screen shadow-xl">
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  className={`flex w-full items-center space-x-3 px-5 py-3 rounded-xl transition-all text-left font-semibold text-lg shadow-sm ${
                    isActive
                      ? 'bg-blue-400/90 text-white shadow-lg scale-105'
                      : 'text-blue-700 hover:bg-blue-200/60 hover:text-blue-900'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 p-8 min-h-screen bg-gradient-to-br from-white/60 to-blue-100/40">
          {children}
        </main>
      </div>
    </div>
  );
};