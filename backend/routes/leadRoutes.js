import express from 'express';
import {
  createContactLead,
  createDreamLandLead,
  getLeads,
  updateLeadStatus,
  deleteLead
} from '../controllers/leadController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes for client form submissions
router.post('/contact', createContactLead);
router.post('/home', createDreamLandLead);

// Admin-only protected dashboard routes
router.get('/', authenticateToken, getLeads);
router.put('/:id/status', authenticateToken, updateLeadStatus);
router.delete('/:id', authenticateToken, deleteLead);

export default router;
