import { Request, Response } from 'express';
import * as dbService from '../services/databaseService.js';

/**
 * GET /api/admin/stats
 * Admin dashboard statistics
 */
export async function getDashboardStats(_req: Request, res: Response): Promise<void> {
  try {
    const stats = await dbService.getDashboardStats();
    res.json({
      success: true,
      stats,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch statistics' });
  }
}
