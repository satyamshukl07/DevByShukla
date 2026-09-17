import { Router } from 'express';
import * as reviewController from '../controllers/reviewController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

export const adminReviewRouter = Router();

// Protect all admin review routes with requireAdminAuth
adminReviewRouter.use(requireAdminAuth);

// GET /api/admin/reviews - All reviews with optional ?status= query
adminReviewRouter.get('/', reviewController.getAllAdminReviews);

// GET /api/admin/reviews/pending - Pending reviews waiting for moderation
adminReviewRouter.get('/pending', reviewController.getPendingAdminReviews);

// PATCH /api/admin/reviews/:id/approve - Approve review
adminReviewRouter.patch('/:id/approve', reviewController.approveReview);

// PATCH /api/admin/reviews/:id/reject - Reject review
adminReviewRouter.patch('/:id/reject', reviewController.rejectReview);

// DELETE /api/admin/reviews/:id - Delete review
adminReviewRouter.delete('/:id', reviewController.deleteReview);
