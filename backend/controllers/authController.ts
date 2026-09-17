import { Request, Response } from 'express';
import { generateAdminToken, comparePassword, hashPassword } from '../middleware/authMiddleware.js';
import * as dbService from '../services/databaseService.js';

// Rate limiting map: tracks failed login attempts
const failedAttempts = new Map<string, { count: number; lockedUntil?: number }>();

export async function login(req: Request, res: Response): Promise<void> {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  const clientRecord = failedAttempts.get(ip);
  if (clientRecord?.lockedUntil && clientRecord.lockedUntil > now) {
    const remainingSeconds = Math.ceil((clientRecord.lockedUntil - now) / 1000);
    res.status(429).json({
      error: `Too many failed login attempts. Please wait ${remainingSeconds} seconds.`,
      code: 'RATE_LIMITED'
    });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const admin = await dbService.getAdminByEmail(email);

  // Fallback to configured ADMIN_EMAIL or default
  const configuredEmail = (process.env.ADMIN_EMAIL || 'admin@devbyshukla.com').toLowerCase();
  const inputEmail = email.trim().toLowerCase();

  const isEmailMatch = admin.email.toLowerCase() === inputEmail || inputEmail === configuredEmail;

  if (!isEmailMatch) {
    registerFailedAttempt(ip);
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }

  const isPasswordValid = await comparePassword(password, admin.passwordHash);

  if (!isPasswordValid) {
    registerFailedAttempt(ip);
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }

  // Clear failed attempts upon success
  failedAttempts.delete(ip);

  const token = generateAdminToken({
    id: admin.id,
    email: admin.email,
    name: admin.name,
  });

  res.json({
    success: true,
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    },
  });
}

function registerFailedAttempt(ip: string): void {
  const rec = failedAttempts.get(ip) || { count: 0 };
  rec.count += 1;
  if (rec.count >= 5) {
    rec.lockedUntil = Date.now() + 60 * 1000; // 1-minute lockout
  }
  failedAttempts.set(ip, rec);
}

export async function getProfile(req: Request, res: Response): Promise<void> {
  const adminToken = (req as any).admin;
  const admin = await dbService.getAdminByEmail(adminToken.email);
  res.json({
    success: true,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    },
  });
}

export async function updateProfile(req: Request, res: Response): Promise<void> {
  const { name, email } = req.body;
  if (!name?.trim() || !email?.trim()) {
    res.status(400).json({ error: 'Name and email are required.' });
    return;
  }

  const updated = await dbService.updateAdminUser({
    name: name.trim(),
    email: email.trim(),
  });

  res.json({
    success: true,
    message: 'Profile updated successfully.',
    admin: updated,
  });
}

export async function changePassword(req: Request, res: Response): Promise<void> {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    res.status(400).json({ error: 'All password fields are required.' });
    return;
  }

  if (newPassword !== confirmPassword) {
    res.status(400).json({ error: 'New password and confirmation do not match.' });
    return;
  }

  if (newPassword.length < 8) {
    res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    return;
  }

  const adminToken = (req as any).admin;
  const admin = await dbService.getAdminByEmail(adminToken.email);

  const isCurrentValid = await comparePassword(currentPassword, admin.passwordHash);
  if (!isCurrentValid) {
    res.status(400).json({ error: 'Current password is incorrect.' });
    return;
  }

  const newHashed = await hashPassword(newPassword);
  await dbService.updateAdminUser({ password: newHashed });

  res.json({
    success: true,
    message: 'Password updated successfully. Please use your new password next time.',
  });
}

export function logout(_req: Request, res: Response): void {
  res.json({ success: true, message: 'Logged out successfully.' });
}
