import express from 'express';
import {
  getAllTransactions,
  getTransactionStats,
  getWalletOverview
} from '../controllers/transactionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllTransactions);
router.get('/stats', getTransactionStats);
router.get('/wallet/overview', getWalletOverview);

export default router;
