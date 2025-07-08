import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ProtocolDistributionProps {
  data: Record<string, number>;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const ProtocolDistribution: React.FC<ProtocolDistributionProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([protocol, count]) => ({
    name: protocol,
    value: count,
    percentage: (count / Object.values(data).reduce((a, b) => a + b, 0)) * 100,
  }));

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage.toFixed(1)}%`;
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white">Protocol Distribution</h3>
        <p className="text-gray-400 mt-1">Transaction distribution across DEXes</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6'
              }}
              formatter={(value, name) => [value, 'Transactions']}
            />
            <Legend 
              wrapperStyle={{ color: '#F3F4F6' }}
              formatter={(value) => <span style={{ color: '#F3F4F6' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};