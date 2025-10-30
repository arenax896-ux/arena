import express from 'express';
import {
  getAllSettings,
  getSetting,
  updateSetting,
  createSetting,
  deleteSetting
} from '../controllers/settingsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllSettings);
router.get('/:key', getSetting);
router.post('/', authorize('super_admin'), createSetting);
router.put('/:key', authorize('super_admin'), updateSetting);
router.delete('/:key', authorize('super_admin'), deleteSetting);

export default router;
