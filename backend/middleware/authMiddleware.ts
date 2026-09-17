import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'devbyshukla_jwt_secret_super_secure_key_2026';

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
}

export function generateAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export async function hashPassword(plain: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Authentication required. Please log in as admin.',
      code: 'AUTH_REQUIRED'
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    (req as any).admin = decoded;
    next();
  } catch (err: any) {
    res.status(401).json({
      error: 'Invalid or expired session. Please log in again.',
      code: 'TOKEN_EXPIRED'
    });
    return;
  }
}
