import { Router, Request, Response } from 'express';
import {
  getAllReviews,
  updateReviewStatus,
  deleteReview
} from '../db.js';
import { requireAdminAuth } from '../auth.js';
import { ReviewStatus } from '../types.js';

export const adminReviewsRouter = Router();

// Protect ALL admin reviews routes with authentication middleware
adminReviewsRouter.use(requireAdminAuth);

// GET /api/admin/reviews
adminReviewsRouter.get('/', (req: Request, res: Response) => {
  const status = req.query.status as ReviewStatus | undefined;
  const reviews = getAllReviews(status);
  res.json({ success: true, reviews });
});

// GET /api/admin/reviews/pending
adminReviewsRouter.get('/pending', (_req: Request, res: Response) => {
  const reviews = getAllReviews('pending');
  res.json({ success: true, reviews });
});

// PATCH /api/admin/reviews/:id/approve
adminReviewsRouter.patch('/:id/approve', (req: Request, res: Response): void => {
  const { id } = req.params;
  const updated = updateReviewStatus(id, 'approved');
  if (!updated) {
    res.status(404).json({ error: 'Review not found.' });
    return;
  }
  res.json({ success: true, message: 'Review approved successfully.', review: updated });
});

// PATCH /api/admin/reviews/:id/reject
adminReviewsRouter.patch('/:id/reject', (req: Request, res: Response): void => {
  const { id } = req.params;
  const updated = updateReviewStatus(id, 'rejected');
  if (!updated) {
    res.status(404).json({ error: 'Review not found.' });
    return;
  }
  res.json({ success: true, message: 'Review rejected successfully.', review: updated });
});

// DELETE /api/admin/reviews/:id
adminReviewsRouter.delete('/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const success = deleteReview(id);
  if (!success) {
    res.status(404).json({ error: 'Review not found.' });
    return;
  }
  res.json({ success: true, message: 'Review deleted successfully.' });
});
