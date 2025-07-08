export interface TokenHolder {
  address: string;
  balance: number;
  balanceUi: number;
  rank: number;
  percentage: number;
}

export interface Transaction {
  id: string;
  walletAddress: string;
  timestamp: number;
  amount: number;
  direction: 'buy' | 'sell';
  protocol: 'Jupiter' | 'Raydium' | 'Orca' | 'Unknown';
  priceImpact?: number;
  signature?: string;
}

export interface Analytics {
  totalVolume: number;
  buyVolume: number;
  sellVolume: number;
  uniqueWallets: number;
  avgTransactionSize: number;
  protocolDistribution: Record<string, number>;
  hourlyActivity: Array<{
    hour: number;
    volume: number;
    transactions: number;
  }>;
}

export interface MonitoringConfig {
  tokenMint: string;
  rpcEndpoint: string;
  webhookUrl?: string;
  maxHolders: number;
}