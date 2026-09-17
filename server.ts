import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { connectDB } from './backend/config/db.js';
import { initCloudinary } from './backend/config/cloudinary.js';
import { authRouter } from './backend/routes/authRoutes.js';
import { reviewRouter } from './backend/routes/reviewRoutes.js';
import { enquiryRouter } from './backend/routes/enquiryRoutes.js';
import { adminReviewRouter } from './backend/routes/adminReviewRoutes.js';
import { adminEnquiryRouter } from './backend/routes/adminEnquiryRoutes.js';
import { statsRouter } from './backend/routes/statsRoutes.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Database & Cloudinary
  await connectDB();
  initCloudinary();

  // Make sure uploads and data directories exist
  const uploadsDir = path.join(process.cwd(), 'uploads');
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  // Security & Body parsing middlewares
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Static uploads serving with security headers
  app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  }, express.static(uploadsDir, { maxAge: '7d' }));

  // API Health Check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'DevByShukla Backend API',
      timestamp: new Date().toISOString()
    });
  });

  // Public API Routes
  app.use('/api/auth', authRouter);
  app.use('/api/reviews', reviewRouter);
  app.use('/api/enquiries', enquiryRouter);

  // Protected Admin API Routes (each router enforces requireAdminAuth)
  app.use('/api/admin/reviews', adminReviewRouter);
  app.use('/api/admin/enquiries', adminEnquiryRouter);
  app.use('/api/admin/stats', statsRouter);

  // Global API Error Handler
  app.use('/api', (err: any, _req: Request, res: Response, _next: NextFunction) => {
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

  // Vite middleware in dev mode / Static in prod mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DevByShukla full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
