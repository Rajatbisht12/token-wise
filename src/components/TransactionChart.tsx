import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface TransactionChartProps {
  data: Array<{
    hour: number;
    volume: number;
    transactions: number;
  }>;
}

export const TransactionChart: React.FC<TransactionChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white">24h Trading Activity</h3>
        <p className="text-gray-400 mt-1">Hourly transaction volume and count</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="hour" 
              stroke="#9CA3AF"
              fontSize={12}
              formatter={(value) => `${value}:00`}
            />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6'
              }}
              formatter={(value, name) => [
                name === 'volume' ? `$${value.toLocaleString()}` : value,
                name === 'volume' ? 'Volume' : 'Transactions'
              ]}
              labelFormatter={(label) => `${label}:00`}
            />
            <Line 
              type="monotone" 
              dataKey="volume" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="transactions" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};