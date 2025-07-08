import React from 'react';
import { Layout } from '../components/Layout';
import { HoldersTable } from '../components/HoldersTable';
import { mockHolders } from '../utils/mockData';

const HoldersPage: React.FC = () => {
  const holders = Array.from({ length: 60 }, (_, i) =>
    mockHolders[i % mockHolders.length]
  ).map((h, i) => ({ ...h, rank: i + 1 }));

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow-lg mb-1">
              Top 60 Token Holders
            </h2>
            <p className="text-blue-700 text-base">
              Explore the largest holders of this Solana token. Click an address to
              copy it!
            </p>
          </div>
        </div>
        <div className="transition-transform duration-300 hover:scale-[1.01]">
          <HoldersTable holders={holders} />
        </div>
      </div>
    </Layout>
  );
};

export default HoldersPage;
