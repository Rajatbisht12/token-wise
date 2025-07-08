import React from 'react';
import { TokenHolder } from '../types';
import { ExternalLink } from 'lucide-react';

interface HoldersTableProps {
  holders: TokenHolder[];
}

export const HoldersTable: React.FC<HoldersTableProps> = ({ holders }) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="bg-white rounded-xl border border-blue-100 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-6 border-b border-blue-100 bg-blue-50/40">
        <h3 className="text-xl font-semibold text-blue-900">Top Token Holders</h3>
        <p className="text-blue-700 mt-1">Real-time holder distribution</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr className="text-left text-blue-700 text-sm">
              <th className="px-6 py-4 font-medium">Rank</th>
              <th className="px-6 py-4 font-medium">Address</th>
              <th className="px-6 py-4 font-medium">Balance</th>
              <th className="px-6 py-4 font-medium">Percentage</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {holders.map((holder) => (
              <tr key={holder.address} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-blue-700 text-sm">#{holder.rank}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-blue-900 text-xs font-medium">
                        {holder.address.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-blue-900 font-medium">{formatAddress(holder.address)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-blue-900 font-medium">{formatNumber(holder.balanceUi)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-300 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(holder.percentage, 100)}%` }}
                      />
                    </div>
                    <span className="text-blue-700 text-sm">{holder.percentage.toFixed(2)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:text-blue-700 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};