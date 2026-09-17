import { Router, Request, Response } from 'express';
import { getApprovedReviews, createReview } from '../db.js';
import { upload, processUploadedFile } from '../upload.js';

export const reviewsRouter = Router();

// Anti-spam sliding window rate limiting for public review submissions
const submissionLimits = new Map<string, { count: number; resetTime: number }>();

function checkReviewRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = submissionLimits.get(ip);
  if (!entry || now > entry.resetTime) {
    submissionLimits.set(ip, { count: 1, resetTime: now + 10 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) {
    return false;
  }
  entry.count++;
  return true;
}

// GET /api/reviews/approved - Public: Only approved reviews!
reviewsRouter.get('/approved', (_req: Request, res: Response) => {
  const reviews = getApprovedReviews();
  res.json({ success: true, reviews });
});

// GET /api/reviews - Alias for approved reviews on public route
reviewsRouter.get('/', (_req: Request, res: Response) => {
  const reviews = getApprovedReviews();
  res.json({ success: true, reviews });
});

// POST /api/reviews - Public: Submit new review (ALWAYS status = 'pending')
reviewsRouter.post(
  '/',
  upload.single('photo'),
  async (req: Request, res: Response): Promise<void> => {
    const clientIp = req.ip || 'unknown';
    if (!checkReviewRateLimit(clientIp)) {
      res.status(429).json({
        error: 'Too many submissions from this connection. Please wait a few minutes before submitting another review.'
      });
      return;
    }

    const { name, email, rating, reviewText } = req.body;

    // Strict validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      res.status(400).json({ error: 'Please enter a valid full name (2–100 characters).' });
      return;
    }

    const parsedRating = Number(rating);
    if (![1, 2, 3, 4, 5].includes(parsedRating)) {
      res.status(400).json({ error: 'Rating must be a valid whole number between 1 and 5 stars.' });
      return;
    }

    if (!reviewText || typeof reviewText !== 'string' || reviewText.trim().length < 10 || reviewText.trim().length > 1500) {
      res.status(400).json({ error: 'Review message must be between 10 and 1,500 characters.' });
      return;
    }

    // Process photo
    let photoUrl = '';
    if (req.file) {
      try {
        const uploadedUrl = await processUploadedFile(req.file);
        if (uploadedUrl) {
          photoUrl = uploadedUrl;
        }
      } catch (err) {
        console.error('Photo processing error:', err);
      }
    } else if (req.body.photoUrl && typeof req.body.photoUrl === 'string' && req.body.photoUrl.startsWith('http')) {
      photoUrl = req.body.photoUrl.trim();
    }

    // Default friendly avatar if none provided
    if (!photoUrl) {
      const initials = encodeURIComponent(name.trim().slice(0, 2).toUpperCase());
      photoUrl = `https://ui-avatars.com/api/?name=${initials}&background=0284c7&color=ffffff&bold=true`;
    }

    // Persist with status 'pending' (NEVER automatically publish)
    const newReview = createReview({
      name,
      email: email ? String(email) : undefined,
      rating: parsedRating,
      reviewText,
      photoUrl
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been submitted and is awaiting approval.',
      reviewId: newReview._id
    });
  }
);
