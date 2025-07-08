import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  walletAddress: { type: String, required: true },
  timestamp: { type: Number, required: true },
  amount: { type: Number, required: true },
  direction: { type: String, enum: ['buy', 'sell'], required: true },
  protocol: { type: String, required: true },
  priceImpact: { type: Number },
  signature: { type: String },
});

export default mongoose.model('Transaction', TransactionSchema);
