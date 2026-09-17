import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { DatabaseSchema, AdminUser, ReviewItem, EnquiryItem, ReviewStatus, EnquiryStatus } from './types.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let dbMemoryCache: DatabaseSchema | null = null;

function generateInitialData(): DatabaseSchema {
  const defaultAdminEmail = (process.env.ADMIN_EMAIL || 'admin@devbyshukla.com').trim().toLowerCase();
  const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'Admin@Dev2026!';
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(defaultAdminPassword, salt);

  const initialAdmin: AdminUser = {
    id: 'admin_root',
    email: defaultAdminEmail,
    passwordHash,
    name: 'Satyam Shukla (Admin)',
    updatedAt: new Date().toISOString()
  };

  const initialReviews: ReviewItem[] = [
    {
      _id: 'rev_' + crypto.randomUUID().slice(0, 8),
      name: 'Dr. Alok Verma',
      email: 'alok.verma@carepulse.in',
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      reviewText: 'DevByShukla built an exceptional website for our multi-specialty clinic. Patient appointment inquiries have surged by 45%, and the mobile booking flow works seamlessly.',
      status: 'approved',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString()
    },
    {
      _id: 'rev_' + crypto.randomUUID().slice(0, 8),
      name: 'Priya Nambiar',
      email: 'priya@eduglobal.ac.in',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      reviewText: 'Outstanding experience! Our international academy website needed a massive speed and design overhaul. DevByShukla completed it in under 2 weeks with perfect score performance.',
      status: 'approved',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString()
    },
    {
      _id: 'rev_' + crypto.randomUUID().slice(0, 8),
      name: 'Vikramaditya Roy',
      email: 'vikram@styleupfashion.com',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      reviewText: 'DevByShukla delivered our modern e-commerce storefront right on schedule. The checkout process is frictionless and our customers constantly compliment the high-end design.',
      status: 'approved',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString()
    },
    {
      _id: 'rev_' + crypto.randomUUID().slice(0, 8),
      name: 'Ananya Deshmukh',
      email: 'ananya@creativescape.io',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      reviewText: 'The attention to typography, micro-interactions, and conversion architecture is phenomenal. Worth every rupee. Highly recommended for any serious business.',
      status: 'approved',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
    },
    {
      _id: 'rev_pending_demo_1',
      name: 'Karan Mehta',
      email: 'karan@mehtarealty.com',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      reviewText: 'Super fast delivery and clean responsive layout for our real estate luxury agency. The lead capture rates are visibly higher now!',
      status: 'pending',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
    }
  ];

  const initialEnquiries: EnquiryItem[] = [
    {
      _id: 'enq_demo_1',
      name: 'Rajesh Singhania',
      email: 'rajesh@singhaniagroup.in',
      phone: '+91 98110 54321',
      company: 'Singhania Logistics Ltd',
      businessType: 'B2B Enterprise',
      projectType: 'Web Portal & Tracking',
      budget: '₹1,00,000 - ₹2,00,000 / $1,200 - $2,500',
      message: 'Looking to redesign our corporate website and build a customer shipment status lookup portal. Need this ready before next quarter.',
      status: 'New',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
    },
    {
      _id: 'enq_demo_2',
      name: 'Sneha Kapoor',
      email: 'sneha@theartisancafe.com',
      phone: '+91 98200 98765',
      company: 'The Artisan Cafe & Bakery',
      businessType: 'Restaurant / Cafe',
      projectType: 'Business Website',
      budget: '₹20,000 - ₹50,000 / $250 - $600',
      message: 'We are opening a second boutique cafe branch in Bangalore and want an interactive digital menu, reservation form, and Instagram feed integration.',
      status: 'Contacted',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
    }
  ];

  return {
    admin: initialAdmin,
    reviews: initialReviews,
    enquiries: initialEnquiries
  };
}

export function loadDb(): DatabaseSchema {
  if (dbMemoryCache) {
    return dbMemoryCache;
  }

  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      dbMemoryCache = JSON.parse(raw);
      if (!dbMemoryCache?.admin || !Array.isArray(dbMemoryCache?.reviews)) {
        console.warn('DB file format irregular, reinitializing with defaults...');
        dbMemoryCache = generateInitialData();
        saveDb(dbMemoryCache);
      }
      return dbMemoryCache!;
    }
  } catch (err) {
    console.error('Error reading DB_FILE, initializing fresh DB:', err);
  }

  dbMemoryCache = generateInitialData();
  saveDb(dbMemoryCache);
  return dbMemoryCache!;
}

export function saveDb(data: DatabaseSchema): void {
  dbMemoryCache = data;
  try {
    const tmpFile = DB_FILE + '.tmp';
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpFile, DB_FILE);
  } catch (err) {
    console.error('Failed to write database file atomically:', err);
  }
}

// ---------------- Admin Operations ----------------

export function getAdminUser(): AdminUser {
  const db = loadDb();
  return db.admin;
}

export function updateAdminUser(updates: Partial<Omit<AdminUser, 'id'>>): AdminUser {
  const db = loadDb();
  db.admin = {
    ...db.admin,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  saveDb(db);
  return db.admin;
}

// ---------------- Review Operations ----------------

export function getAllReviews(status?: ReviewStatus): ReviewItem[] {
  const db = loadDb();
  if (status) {
    return db.reviews.filter((r) => r.status === status);
  }
  return [...db.reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getApprovedReviews(): ReviewItem[] {
  const db = loadDb();
  return db.reviews
    .filter((r) => r.status === 'approved')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createReview(data: {
  name: string;
  email?: string;
  photoUrl: string;
  rating: number;
  reviewText: string;
}): ReviewItem {
  const db = loadDb();
  const newReview: ReviewItem = {
    _id: 'rev_' + crypto.randomUUID(),
    name: data.name.trim(),
    email: data.email?.trim() || undefined,
    photoUrl: data.photoUrl || '',
    rating: Math.min(5, Math.max(1, Math.round(data.rating))),
    reviewText: data.reviewText.trim(),
    status: 'pending', // CRITICAL: NEVER automatically publish!
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.reviews.unshift(newReview);
  saveDb(db);
  return newReview;
}

export function updateReviewStatus(id: string, status: ReviewStatus): ReviewItem | null {
  const db = loadDb();
  const index = db.reviews.findIndex((r) => r._id === id);
  if (index === -1) return null;

  db.reviews[index].status = status;
  db.reviews[index].updatedAt = new Date().toISOString();
  saveDb(db);
  return db.reviews[index];
}

export function deleteReview(id: string): boolean {
  const db = loadDb();
  const initialLength = db.reviews.length;
  db.reviews = db.reviews.filter((r) => r._id !== id);
  if (db.reviews.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// ---------------- Enquiry Operations ----------------

export function getAllEnquiries(status?: EnquiryStatus): EnquiryItem[] {
  const db = loadDb();
  if (status) {
    return db.enquiries.filter((e) => e.status === status);
  }
  return [...db.enquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: string;
  projectType?: string;
  budget?: string;
  message: string;
}): EnquiryItem {
  const db = loadDb();
  const newEnquiry: EnquiryItem = {
    _id: 'enq_' + crypto.randomUUID(),
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim() || undefined,
    company: data.company?.trim() || undefined,
    businessType: data.businessType?.trim() || undefined,
    projectType: data.projectType?.trim() || undefined,
    budget: data.budget?.trim() || undefined,
    message: data.message.trim(),
    status: 'New',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.enquiries.unshift(newEnquiry);
  saveDb(db);
  return newEnquiry;
}

export function updateEnquiryStatus(id: string, status: EnquiryStatus): EnquiryItem | null {
  const db = loadDb();
  const index = db.enquiries.findIndex((e) => e._id === id);
  if (index === -1) return null;

  db.enquiries[index].status = status;
  db.enquiries[index].updatedAt = new Date().toISOString();
  saveDb(db);
  return db.enquiries[index];
}

export function deleteEnquiry(id: string): boolean {
  const db = loadDb();
  const initialLength = db.enquiries.length;
  db.enquiries = db.enquiries.filter((e) => e._id !== id);
  if (db.enquiries.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// ---------------- Dashboard Stats ----------------

export function getStats() {
  const db = loadDb();
  const totalReviews = db.reviews.length;
  const pendingReviews = db.reviews.filter((r) => r.status === 'pending').length;
  const approvedReviews = db.reviews.filter((r) => r.status === 'approved').length;
  const rejectedReviews = db.reviews.filter((r) => r.status === 'rejected').length;
  const totalEnquiries = db.enquiries.length;
  const newEnquiries = db.enquiries.filter((e) => e.status === 'New').length;

  return {
    totalReviews,
    pendingReviews,
    approvedReviews,
    rejectedReviews,
    totalEnquiries,
    newEnquiries
  };
}
