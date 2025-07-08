import React from 'react';
import { Layout } from '../components/Layout';
import TransactionTable from '../components/TransactionTable';

const TransactionsPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow-lg mb-1">
              Latest Transactions
            </h2>
            <p className="text-blue-700 text-base">
              See the most recent token transactions. All data is updated in real
              time.
            </p>
          </div>
        </div>
        <div className="transition-transform duration-300 hover:scale-[1.01]">
          <TransactionTable />
        </div>
      </div>
    </Layout>
  );
};

export default TransactionsPage;
