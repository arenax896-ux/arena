import express from 'express';
import {
  getAllTournaments,
  getTournamentById,
  updateTournamentStatus,
  verifyParticipantResult,
  getTournamentStats,
  deleteTournament
} from '../controllers/tournamentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllTournaments);
router.get('/stats', getTournamentStats);
router.get('/:id', getTournamentById);
router.put('/:id/status', updateTournamentStatus);
router.post('/verify-result', verifyParticipantResult);
router.delete('/:id', deleteTournament);

export default router;
