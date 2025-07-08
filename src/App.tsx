import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { StatsCard } from './components/StatsCard';
import { HoldersTable } from './components/HoldersTable';
import { TransactionChart } from './components/TransactionChart';
import { ProtocolDistribution } from './components/ProtocolDistribution';
import { TrendingUp, Users, Activity, DollarSign } from 'lucide-react';
import { mockHolders, mockAnalytics } from './utils/mockData';

function App() {
  const [isLive] = useState(false);
  const [analytics, setAnalytics] = useState(mockAnalytics);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      if (isLive) {
        setAnalytics(prev => ({
          ...prev,
          totalVolume: prev.totalVolume + Math.floor(Math.random() * 1000),
          uniqueWallets: prev.uniqueWallets + Math.floor(Math.random() * 2),
        }));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // --- Download Handlers ---
  const downloadJSON = () => {
    const data = {
      analytics,
      holders: mockHolders,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    // Only holders table for CSV
    const headers = ['Rank', 'Address', 'Balance', 'Percentage'];
    const rows = mockHolders.map(h => [h.rank, h.address, h.balanceUi, h.percentage.toFixed(2)]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'holders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="space-y-10 animate-fade-in bg-gray-50 min-h-screen">
        <div className="flex flex-wrap gap-4 justify-end">
          <button
            onClick={downloadJSON}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition-colors"
          >
            Download JSON
          </button>
          <button
            onClick={downloadCSV}
            className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition-colors"
          >
            Download CSV
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatsCard
            title="Total Volume"
            value={formatCurrency(analytics.totalVolume)}
            change="+12.5%"
            changeType="positive"
            icon={DollarSign}
          />
          <StatsCard
            title="Active Wallets"
            value={analytics.uniqueWallets.toString()}
            change="+3"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Buy/Sell Ratio"
            value={`${((analytics.buyVolume / analytics.totalVolume) * 100).toFixed(1)}%`}
            change="+2.1%"
            changeType="positive"
            icon={TrendingUp}
          />
          <StatsCard
            title="Avg Transaction"
            value={formatCurrency(analytics.avgTransactionSize)}
            change="-1.2%"
            changeType="negative"
            icon={Activity}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="transition-transform duration-300 hover:scale-[1.02]">
            <TransactionChart data={analytics.hourlyActivity} />
          </div>
          <div className="transition-transform duration-300 hover:scale-[1.02]">
            <ProtocolDistribution data={analytics.protocolDistribution} />
          </div>
        </div>

        {/* Holders Table */}
        <div className="transition-transform duration-300 hover:scale-[1.01]">
          <HoldersTable holders={mockHolders} />
        </div>
      </div>
    </Layout>
  );
}

export default App;