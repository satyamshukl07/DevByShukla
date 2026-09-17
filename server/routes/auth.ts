import { Router, Request, Response } from 'express';
import { getAdminUser, updateAdminUser } from '../db.js';
import { comparePassword, hashPassword, generateToken, requireAdminAuth, AuthRequest } from '../auth.js';

export const authRouter = Router();

// Simple in-memory rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);
  if (!attempt || now > attempt.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }); // 15 mins window
    return true;
  }
  if (attempt.count >= 10) {
    return false; // too many attempts
  }
  attempt.count++;
  return true;
}

// POST /api/auth/login
authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  const clientIp = req.ip || 'unknown';
  if (!checkRateLimit(clientIp)) {
    res.status(429).json({ error: 'Too many login attempts. Please try again after 15 minutes.' });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({ error: 'Please provide both admin email and password.' });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const admin = getAdminUser();

  if (admin.email.toLowerCase() !== normalizedEmail) {
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }

  const isPasswordMatch = comparePassword(password, admin.passwordHash);
  if (!isPasswordMatch) {
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }

  // Generate secure JWT
  const token = generateToken(admin);

  res.json({
    success: true,
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name
    }
  });
});

// GET /api/auth/me
authRouter.get('/me', requireAdminAuth, (req: AuthRequest, res: Response) => {
  const admin = getAdminUser();
  res.json({
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      updatedAt: admin.updatedAt
    }
  });
});

// POST /api/auth/profile (Update name / email)
authRouter.post('/profile', requireAdminAuth, (req: AuthRequest, res: Response): void => {
  const { name, email } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({ error: 'Please enter a valid admin name.' });
    return;
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }

  const updated = updateAdminUser({
    name: name.trim(),
    email: email.trim().toLowerCase()
  });

  res.json({
    success: true,
    message: 'Profile updated successfully.',
    admin: {
      id: updated.id,
      email: updated.email,
      name: updated.name
    }
  });
});

// POST /api/auth/change-password
authRouter.post('/change-password', requireAdminAuth, (req: AuthRequest, res: Response): void => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    res.status(400).json({ error: 'All password fields are required.' });
    return;
  }

  if (newPassword !== confirmPassword) {
    res.status(400).json({ error: 'New password and confirmation do not match.' });
    return;
  }

  if (typeof newPassword !== 'string' || newPassword.length < 8) {
    res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    return;
  }

  const admin = getAdminUser();
  const isMatch = comparePassword(currentPassword, admin.passwordHash);
  if (!isMatch) {
    res.status(400).json({ error: 'Current password is incorrect.' });
    return;
  }

  const newHash = hashPassword(newPassword);
  updateAdminUser({ passwordHash: newHash });

  res.json({
    success: true,
    message: 'Password changed successfully.'
  });
});

// POST /api/auth/logout
authRouter.post('/logout', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});
