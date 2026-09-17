import { Router, Request, Response } from 'express';
import { getStats } from '../db.js';
import { requireAdminAuth } from '../auth.js';

export const statsRouter = Router();

statsRouter.get('/', requireAdminAuth, (_req: Request, res: Response) => {
  const stats = getStats();
  res.json({ success: true, stats });
});
