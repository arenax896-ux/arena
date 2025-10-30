import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transactionType: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  balanceBefore: {
    type: Number,
    required: true
  },
  balanceAfter: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['purchase', 'tournament_entry', 'tournament_win', 'refund', 'admin_adjustment', 'bonus'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  relatedTournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
  },
  paymentMethod: {
    type: String,
    enum: ['JazzCash', 'Easypaisa', 'PayPal', 'Bank Transfer', 'Admin', 'N/A'],
    default: 'N/A'
  },
  paymentReference: String,
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'reversed'],
    default: 'completed'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ category: 1 });
transactionSchema.index({ status: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
