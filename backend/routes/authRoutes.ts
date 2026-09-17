import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

export const authRouter = Router();

// Public login endpoint
authRouter.post('/login', authController.login);

// Protected profile & password management endpoints
authRouter.get('/me', requireAdminAuth, authController.getProfile);
authRouter.post('/profile', requireAdminAuth, authController.updateProfile);
authRouter.post('/change-password', requireAdminAuth, authController.changePassword);
authRouter.post('/logout', requireAdminAuth, authController.logout);
