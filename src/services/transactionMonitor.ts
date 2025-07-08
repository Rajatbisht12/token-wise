import { Transaction, Analytics } from '../types';
import { SolanaService } from './solana';

export class TransactionMonitor {
  private solanaService: SolanaService;
  private transactions: Transaction[] = [];
  private subscriptions: number[] = [];
  private isMonitoring = false;

  constructor(solanaService: SolanaService) {
    this.solanaService = solanaService;
  }

  async startMonitoring(walletAddresses: string[]): Promise<void> {
    if (this.isMonitoring) {
      await this.stopMonitoring();
    }

    this.isMonitoring = true;
    
    this.subscriptions = await this.solanaService.subscribeToAccountChanges(
      walletAddresses,
      (address, accountInfo) => {
        this.handleAccountChange(address, accountInfo);
      }
    );
  }

  async stopMonitoring(): Promise<void> {
    if (!this.isMonitoring) return;

    this.isMonitoring = false;
    await this.solanaService.unsubscribeFromAccountChanges(this.subscriptions);
    this.subscriptions = [];
  }

  private handleAccountChange(address: string, accountInfo: any): void {
    // Parse account change and create transaction record
    const transaction: Transaction = {
      id: `${address}-${Date.now()}`,
      walletAddress: address,
      timestamp: Date.now(),
      amount: 0, // Would be calculated from account data
      direction: 'buy', // Would be determined from balance change
      protocol: this.detectProtocol(accountInfo),
      signature: 'placeholder',
    };

    this.transactions.push(transaction);
    
    // Emit event for real-time updates
    this.emitTransactionUpdate(transaction);
  }

  private detectProtocol(accountInfo: any): Transaction['protocol'] {
    // Logic to detect which DEX was used based on account data
    // This would analyze program IDs and instruction data
    return 'Jupiter'; // Placeholder
  }

  private emitTransactionUpdate(transaction: Transaction): void {
    // Emit to connected clients via WebSocket or similar
    window.dispatchEvent(new CustomEvent('transactionUpdate', {
      detail: transaction
    }));
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getAnalytics(): Analytics {
    const totalVolume = this.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const buyVolume = this.transactions
      .filter(tx => tx.direction === 'buy')
      .reduce((sum, tx) => sum + tx.amount, 0);
    const sellVolume = totalVolume - buyVolume;

    const protocolDistribution = this.transactions.reduce((acc, tx) => {
      acc[tx.protocol] = (acc[tx.protocol] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalVolume,
      buyVolume,
      sellVolume,
      uniqueWallets: new Set(this.transactions.map(tx => tx.walletAddress)).size,
      avgTransactionSize: totalVolume / this.transactions.length || 0,
      protocolDistribution,
      hourlyActivity: this.getHourlyActivity(),
    };
  }

  private getHourlyActivity() {
    const hourlyData = new Map<number, { volume: number; transactions: number }>();
    
    this.transactions.forEach(tx => {
      const hour = new Date(tx.timestamp).getHours();
      const existing = hourlyData.get(hour) || { volume: 0, transactions: 0 };
      hourlyData.set(hour, {
        volume: existing.volume + tx.amount,
        transactions: existing.transactions + 1,
      });
    });

    return Array.from(hourlyData.entries()).map(([hour, data]) => ({
      hour,
      ...data,
    }));
  }
}