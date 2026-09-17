import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { getAdminUser } from './db.js';
import { AdminUser } from './types.js';

// Fallback high-entropy secret if not configured in .env
const JWT_SECRET = process.env.JWT_SECRET || (function () {
  const generated = crypto.randomBytes(32).toString('hex');
  return generated;
})();

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
    name: string;
  };
}

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(user: AdminUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function requireAdminAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required. Please log in as admin.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; name: string };
    const currentAdmin = getAdminUser();
    
    // Verify admin still exists and matches
    if (!currentAdmin || currentAdmin.id !== decoded.id) {
      res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
      return;
    }

    req.admin = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Session expired. Please log in again.' });
      return;
    }
    res.status(401).json({ error: 'Invalid authentication token.' });
  }
}
