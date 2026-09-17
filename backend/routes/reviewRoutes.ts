import { Router } from 'express';
import * as reviewController from '../controllers/reviewController.js';
import { uploadReviewPhoto } from '../middleware/uploadMiddleware.js';

export const reviewRouter = Router();

// GET /api/reviews/approved - Public list of approved reviews only
reviewRouter.get('/approved', reviewController.getApprovedReviews);

// POST /api/reviews - Public review submission with optional photo upload
// Always initially sets status = 'pending'
reviewRouter.post('/', uploadReviewPhoto.single('photo'), reviewController.submitReview);
