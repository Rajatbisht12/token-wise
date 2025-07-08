import { useState, useEffect, useCallback } from 'react';
import { TokenHolder, Transaction, Analytics } from '../types';
import { SolanaService } from '../services/solana';
import { TransactionMonitor } from '../services/transactionMonitor';

export const useTokenMonitor = (tokenMint: string, rpcEndpoint: string) => {
  const [holders, setHolders] = useState<TokenHolder[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const solanaService = new SolanaService(rpcEndpoint, tokenMint);
  const transactionMonitor = new TransactionMonitor(solanaService);

  const fetchHolders = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedHolders = await solanaService.getTopTokenHolders(60);
      setHolders(fetchedHolders);
    } catch (error) {
      console.error('Error fetching holders:', error);
    } finally {
      setIsLoading(false);
    }
  }, [tokenMint, rpcEndpoint]);

  const startMonitoring = useCallback(async () => {
    try {
      const walletAddresses = holders.map(h => h.address);
      await transactionMonitor.startMonitoring(walletAddresses);
      setIsMonitoring(true);
    } catch (error) {
      console.error('Error starting monitoring:', error);
    }
  }, [holders]);

  const stopMonitoring = useCallback(async () => {
    try {
      await transactionMonitor.stopMonitoring();
      setIsMonitoring(false);
    } catch (error) {
      console.error('Error stopping monitoring:', error);
    }
  }, []);

  const updateAnalytics = useCallback(() => {
    const currentAnalytics = transactionMonitor.getAnalytics();
    setAnalytics(currentAnalytics);
  }, []);

  useEffect(() => {
    fetchHolders();
  }, [fetchHolders]);

  useEffect(() => {
    const handleTransactionUpdate = (event: CustomEvent) => {
      const transaction = event.detail as Transaction;
      setTransactions(prev => [transaction, ...prev].slice(0, 100));
      updateAnalytics();
    };

    window.addEventListener('transactionUpdate', handleTransactionUpdate as EventListener);
    return () => {
      window.removeEventListener('transactionUpdate', handleTransactionUpdate as EventListener);
    };
  }, [updateAnalytics]);

  return {
    holders,
    transactions,
    analytics,
    isLoading,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    refetchHolders: fetchHolders,
  };
};