import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { initCloudinary } from './config/cloudinary.js';
import { authRouter } from './routes/authRoutes.js';
import { reviewRouter } from './routes/reviewRoutes.js';
import { enquiryRouter } from './routes/enquiryRoutes.js';
import { adminReviewRouter } from './routes/adminReviewRoutes.js';
import { adminEnquiryRouter } from './routes/adminEnquiryRoutes.js';
import { statsRouter } from './routes/statsRoutes.js';

export const app = express();

// Ensure Cloudinary is initialized
initCloudinary();

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure DB is connected for serverless invocations
app.use(async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
  } catch (err) {
    console.warn('[DB Middleware] Connection error:', err);
  }
  next();
});

// Static uploads serving with security headers
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (e) {
    // Ignore in read-only environments
  }
}

app.use('/uploads', (_req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(uploadsDir, { maxAge: '7d' }));

// Health Check
const healthHandler = (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'DevByShukla Backend API',
    database: mongoose.connection.readyState === 1 ? 'mongodb_atlas' : 'local_fallback',
    timestamp: new Date().toISOString()
  });
};

// API Router
const apiRouter = express.Router();
apiRouter.get('/health', healthHandler);
apiRouter.use('/auth', authRouter);
apiRouter.use('/reviews', reviewRouter);
apiRouter.use('/enquiries', enquiryRouter);
apiRouter.use('/admin/reviews', adminReviewRouter);
apiRouter.use('/admin/enquiries', adminEnquiryRouter);
apiRouter.use('/admin/stats', statsRouter);

// Support both /api/* and /* (in case Vercel rewrites strip /api)
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('API Error:', err);
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ error: 'Uploaded photo exceeds 5MB limit. Please choose a smaller photo.' });
      return;
    }
    res.status(400).json({ error: `Upload error: ${err.message}` });
    return;
  }
  res.status(err.status || 500).json({
    error: err.message || 'An internal server error occurred.'
  });
});

export default app;
