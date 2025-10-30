import express from 'express';
import {
  createNotification,
  getAllNotifications,
  sendNotification,
  deleteNotification,
  getNotificationStats
} from '../controllers/notificationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', createNotification);
router.get('/', getAllNotifications);
router.get('/stats', getNotificationStats);
router.post('/:id/send', sendNotification);
router.delete('/:id', deleteNotification);

export default router;
