import { Router } from 'express';
import * as statsController from '../controllers/statsController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

export const statsRouter = Router();

// Protect stats with requireAdminAuth
statsRouter.use(requireAdminAuth);

// GET /api/admin/stats - Overview metrics
statsRouter.get('/', statsController.getDashboardStats);
