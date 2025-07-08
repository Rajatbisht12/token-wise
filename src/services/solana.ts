import { Connection, PublicKey, GetProgramAccountsFilter } from '@solana/web3.js';
import { TokenHolder } from '../types';

export class SolanaService {
  private connection: Connection;
  private tokenMint: PublicKey;

  constructor(rpcEndpoint: string, tokenMint: string) {
    this.connection = new Connection(rpcEndpoint, 'confirmed');
    this.tokenMint = new PublicKey(tokenMint);
  }

  async getTopTokenHolders(limit: number = 60): Promise<TokenHolder[]> {
    try {
      // Get initial top 20 holders
      const largestAccounts = await this.connection.getTokenLargestAccounts(this.tokenMint);
      
      // Get additional holders via getProgramAccounts
      const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
      
      const filters: GetProgramAccountsFilter[] = [
        {
          dataSize: 165, // SPL Token Account size
        },
        {
          memcmp: {
            offset: 0,
            bytes: this.tokenMint.toBase58(),
          },
        },
      ];

      const accounts = await this.connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
        filters,
        encoding: 'base64',
      });

      // Parse and combine holders
      const holders: TokenHolder[] = [];
      let totalSupply = 0;

      largestAccounts.value.forEach((account, index) => {
        const balance = account.uiAmount || 0;
        totalSupply += balance;
        holders.push({
          address: account.address || '',
          balance: balance,
          balanceUi: balance,
          rank: index + 1,
          percentage: 0, // Will calculate after getting total supply
        });
      });

      // Calculate percentages
      holders.forEach(holder => {
        holder.percentage = (holder.balance / totalSupply) * 100;
      });

      return holders.slice(0, limit);
    } catch (error) {
      console.error('Error fetching token holders:', error);
      return [];
    }
  }

  async subscribeToAccountChanges(
    walletAddresses: string[],
    callback: (address: string, data: any) => void
  ): Promise<number[]> {
    const subscriptions: number[] = [];

    for (const address of walletAddresses) {
      try {
        const pubkey = new PublicKey(address);
        const subscription = this.connection.onAccountChange(
          pubkey,
          (accountInfo) => {
            callback(address, accountInfo);
          },
          'confirmed'
        );
        subscriptions.push(subscription);
      } catch (error) {
        console.error(`Error subscribing to account ${address}:`, error);
      }
    }

    return subscriptions;
  }

  async unsubscribeFromAccountChanges(subscriptions: number[]): Promise<void> {
    for (const subscription of subscriptions) {
      await this.connection.removeAccountChangeListener(subscription);
    }
  }

  async getRecentTransactions(address: string, limit: number = 10) {
    try {
      const pubkey = new PublicKey(address);
      const signatures = await this.connection.getSignaturesForAddress(pubkey, { limit });
      
      const transactions = await Promise.all(
        signatures.map(async (sig) => {
          const tx = await this.connection.getTransaction(sig.signature, {
            encoding: 'jsonParsed',
            maxSupportedTransactionVersion: 0,
          });
          return tx;
        })
      );

      return transactions.filter(Boolean);
    } catch (error) {
      console.error('Error fetching recent transactions:', error);
      return [];
    }
  }
}