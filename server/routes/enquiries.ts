import { Router, Request, Response } from 'express';
import { createEnquiry } from '../db.js';

export const enquiriesRouter = Router();

// Anti-spam rate limiting for inquiries
const enquiryLimits = new Map<string, { count: number; resetTime: number }>();

function checkEnquiryRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = enquiryLimits.get(ip);
  if (!entry || now > entry.resetTime) {
    enquiryLimits.set(ip, { count: 1, resetTime: now + 10 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 8) {
    return false;
  }
  entry.count++;
  return true;
}

// POST /api/enquiries (Public)
enquiriesRouter.post('/', (req: Request, res: Response): void => {
  const clientIp = req.ip || 'unknown';
  if (!checkEnquiryRateLimit(clientIp)) {
    res.status(429).json({ error: 'Too many requests. Please wait a few moments before trying again.' });
    return;
  }

  const { name, email, phone, company, businessType, projectType, budget, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({ error: 'Please enter your name.' });
    return;
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    res.status(400).json({ error: 'Please provide details about your project.' });
    return;
  }

  const newEnquiry = createEnquiry({
    name,
    email,
    phone: phone ? String(phone) : undefined,
    company: company ? String(company) : undefined,
    businessType: businessType ? String(businessType) : undefined,
    projectType: projectType ? String(projectType) : undefined,
    budget: budget ? String(budget) : undefined,
    message
  });

  res.status(201).json({
    success: true,
    message: 'Thank you! Your project inquiry has been received. Satyam Shukla will review your requirements and reply within 24 hours.',
    enquiryId: newEnquiry._id
  });
});
