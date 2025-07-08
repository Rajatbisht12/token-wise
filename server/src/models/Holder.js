import mongoose from 'mongoose';

const HolderSchema = new mongoose.Schema({
  address: { type: String, required: true },
  balance: { type: Number, required: true },
  balanceUi: { type: Number, required: true },
  rank: { type: Number, required: true },
  percentage: { type: Number, required: true },
});

export default mongoose.model('Holder', HolderSchema);
