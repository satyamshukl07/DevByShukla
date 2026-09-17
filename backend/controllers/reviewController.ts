import { Request, Response } from 'express';
import * as dbService from '../services/databaseService.js';
import { uploadImage } from '../config/cloudinary.js';

// Default avatars to assign if none is uploaded
const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
];

// ======================== PUBLIC ENDPOINTS ========================

/**
 * GET /api/reviews/approved
 * Fetches only reviews that have been verified and approved by admin.
 */
export async function getApprovedReviews(_req: Request, res: Response): Promise<void> {
  try {
    const reviews = await dbService.getApprovedReviews();
    res.json({ success: true, reviews });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch reviews' });
  }
}

/**
 * POST /api/reviews
 * Public submission of customer feedback.
 * CRITICAL: New reviews are strictly saved with status: "pending".
 */
export async function submitReview(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, rating, reviewText } = req.body;

    if (!name?.trim()) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    if (!reviewText?.trim() || reviewText.trim().length < 10) {
      res.status(400).json({ error: 'Review text must be at least 10 characters long' });
      return;
    }

    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      res.status(400).json({ error: 'Rating must be a whole number between 1 and 5' });
      return;
    }

    let photoUrl = '';
    if (req.file) {
      photoUrl = await uploadImage(req.file);
    } else {
      photoUrl = DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];
    }

    const newReview = await dbService.createReview({
      name: name.trim(),
      email: email ? email.trim() : undefined,
      photoUrl,
      rating: parsedRating,
      reviewText: reviewText.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been submitted and is awaiting approval.',
      reviewId: newReview._id,
      status: newReview.status, // 'pending'
    });
  } catch (err: any) {
    console.error('Error submitting review:', err);
    res.status(500).json({ error: err.message || 'Failed to submit review' });
  }
}

// ======================== ADMIN ENDPOINTS ========================

/**
 * GET /api/admin/reviews
 * Admin list of all reviews with optional status filter (?status=pending|approved|rejected)
 */
export async function getAllAdminReviews(req: Request, res: Response): Promise<void> {
  try {
    const status = req.query.status as ('pending' | 'approved' | 'rejected') | undefined;
    const reviews = await dbService.getAllReviews(status);
    res.json({ success: true, reviews });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch reviews' });
  }
}

/**
 * GET /api/admin/reviews/pending
 * Convenience route for pending reviews queue
 */
export async function getPendingAdminReviews(_req: Request, res: Response): Promise<void> {
  try {
    const reviews = await dbService.getAllReviews('pending');
    res.json({ success: true, reviews });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch pending reviews' });
  }
}

/**
 * PATCH /api/admin/reviews/:id/approve
 * Admin approves a review (status -> approved)
 */
export async function approveReview(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const review = await dbService.updateReviewStatus(id, 'approved');
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    res.json({ success: true, message: 'Review approved and published', review });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to approve review' });
  }
}

/**
 * PATCH /api/admin/reviews/:id/reject
 * Admin rejects a review (status -> rejected)
 */
export async function rejectReview(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const review = await dbService.updateReviewStatus(id, 'rejected');
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    res.json({ success: true, message: 'Review marked as rejected', review });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to reject review' });
  }
}

/**
 * DELETE /api/admin/reviews/:id
 * Admin permanently deletes a review
 */
export async function deleteReview(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await dbService.deleteReview(id);
    if (!deleted) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete review' });
  }
}
