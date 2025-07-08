import { TokenHolder, Transaction, Analytics } from '../types';

export const mockHolders: TokenHolder[] = Array.from({ length: 20 }, (_, i) => ({
  address: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
  balance: Math.floor(Math.random() * 1000000) + 100000,
  balanceUi: Math.floor(Math.random() * 1000000) + 100000,
  rank: i + 1,
  percentage: Math.random() * 15 + 0.5,
}));

export const mockTransactions: Transaction[] = Array.from({ length: 50 }, (_, i) => ({
  id: `tx-${i}`,
  walletAddress: mockHolders[Math.floor(Math.random() * mockHolders.length)].address,
  timestamp: Date.now() - Math.random() * 86400000,
  amount: Math.floor(Math.random() * 10000) + 100,
  direction: Math.random() > 0.5 ? 'buy' : 'sell',
  protocol: ['Jupiter', 'Raydium', 'Orca'][Math.floor(Math.random() * 3)] as Transaction['protocol'],
  priceImpact: Math.random() * 5,
  signature: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
}));

export const mockAnalytics: Analytics = {
  totalVolume: 2500000,
  buyVolume: 1400000,
  sellVolume: 1100000,
  uniqueWallets: 45,
  avgTransactionSize: 5000,
  protocolDistribution: {
    Jupiter: 25,
    Raydium: 18,
    Orca: 12,
  },
  hourlyActivity: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    volume: Math.floor(Math.random() * 50000) + 10000,
    transactions: Math.floor(Math.random() * 20) + 5,
  })),
};