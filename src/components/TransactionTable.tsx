import React from 'react';
import { mockTransactions } from '../utils/mockData';

const TransactionTable: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white">Latest Transactions</h3>
        <p className="text-gray-400 mt-1">Recent token transactions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr className="text-left text-gray-400 text-sm">
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Wallet</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Direction</th>
              <th className="px-6 py-4 font-medium">Protocol</th>
              <th className="px-6 py-4 font-medium">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4 text-white font-mono">{tx.id}</td>
                <td className="px-6 py-4 text-white font-mono">{tx.walletAddress.slice(0, 6)}...{tx.walletAddress.slice(-4)}</td>
                <td className="px-6 py-4 text-white">{tx.amount}</td>
                <td className={`px-6 py-4 font-medium ${tx.direction === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{tx.direction}</td>
                <td className="px-6 py-4 text-white">{tx.protocol}</td>
                <td className="px-6 py-4 text-gray-400">{new Date(tx.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
