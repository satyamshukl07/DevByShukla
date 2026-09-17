import { isMongoConnected } from '../config/db.js';
import { Review } from '../models/Review.js';
import { Enquiry } from '../models/Enquiry.js';
import { AdminUser } from '../models/AdminUser.js';
import * as localDb from '../../server/db.js';

export interface UnifiedReview {
  _id: string;
  name: string;
  email?: string;
  photoUrl: string;
  rating: number;
  reviewText: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface UnifiedEnquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: string;
  projectType?: string;
  budget?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Resolved';
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
  rejectedReviews: number;
  totalEnquiries: number;
  newEnquiries: number;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

function mapMongoReview(doc: any): UnifiedReview {
  return {
    _id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    photoUrl: doc.photoUrl,
    rating: doc.rating,
    reviewText: doc.reviewText,
    status: doc.status,
    createdAt: doc.createdAt?.toISOString?.() || new Date(doc.createdAt).toISOString(),
    updatedAt: doc.updatedAt?.toISOString?.() || new Date(doc.updatedAt).toISOString(),
  };
}

function mapMongoEnquiry(doc: any): UnifiedEnquiry {
  return {
    _id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    company: doc.company,
    businessType: doc.businessType,
    projectType: doc.projectType,
    budget: doc.budget,
    message: doc.message,
    status: doc.status,
    createdAt: doc.createdAt?.toISOString?.() || new Date(doc.createdAt).toISOString(),
    updatedAt: doc.updatedAt?.toISOString?.() || new Date(doc.updatedAt).toISOString(),
  };
}

// ======================== REVIEWS ========================

export async function getApprovedReviews(): Promise<UnifiedReview[]> {
  if (isMongoConnected()) {
    const list = await (Review as any).find({ status: 'approved' }).sort({ createdAt: -1 }).lean();
    return list.map(mapMongoReview);
  }
  return localDb.getApprovedReviews();
}

export async function createReview(data: {
  name: string;
  email?: string;
  photoUrl: string;
  rating: number;
  reviewText: string;
}): Promise<UnifiedReview> {
  // CRITICAL RULE: All incoming customer reviews must start with status: 'pending'
  if (isMongoConnected()) {
    const newDoc = new Review({
      ...data,
      status: 'pending',
    });
    const saved = await newDoc.save();
    return mapMongoReview(saved);
  }
  return localDb.createReview(data);
}

export async function getAllReviews(status?: 'pending' | 'approved' | 'rejected'): Promise<UnifiedReview[]> {
  if (isMongoConnected()) {
    const filter = status ? { status } : {};
    const list = await (Review as any).find(filter).sort({ createdAt: -1 }).lean();
    return list.map(mapMongoReview);
  }
  return localDb.getAllReviews(status);
}

export async function updateReviewStatus(
  id: string,
  newStatus: 'pending' | 'approved' | 'rejected'
): Promise<UnifiedReview | null> {
  if (isMongoConnected()) {
    const updated = await (Review as any).findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );
    if (!updated) return null;
    return mapMongoReview(updated);
  }
  return localDb.updateReviewStatus(id, newStatus);
}

export async function deleteReview(id: string): Promise<boolean> {
  if (isMongoConnected()) {
    const res = await (Review as any).findByIdAndDelete(id);
    return !!res;
  }
  return localDb.deleteReview(id);
}

// ======================== ENQUIRIES ========================

export async function createEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: string;
  projectType?: string;
  budget?: string;
  message: string;
}): Promise<UnifiedEnquiry> {
  if (isMongoConnected()) {
    const newDoc = new Enquiry({
      ...data,
      status: 'New',
    });
    const saved = await newDoc.save();
    return mapMongoEnquiry(saved);
  }
  return localDb.createEnquiry(data);
}

export async function getAllEnquiries(status?: 'New' | 'Contacted' | 'Resolved'): Promise<UnifiedEnquiry[]> {
  if (isMongoConnected()) {
    const filter = status ? { status } : {};
    const list = await (Enquiry as any).find(filter).sort({ createdAt: -1 }).lean();
    return list.map(mapMongoEnquiry);
  }
  return localDb.getAllEnquiries(status);
}

export async function updateEnquiryStatus(
  id: string,
  newStatus: 'New' | 'Contacted' | 'Resolved'
): Promise<UnifiedEnquiry | null> {
  if (isMongoConnected()) {
    const updated = await (Enquiry as any).findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );
    if (!updated) return null;
    return mapMongoEnquiry(updated);
  }
  return localDb.updateEnquiryStatus(id, newStatus);
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (isMongoConnected()) {
    const res = await (Enquiry as any).findByIdAndDelete(id);
    return !!res;
  }
  return localDb.deleteEnquiry(id);
}

// ======================== STATS ========================

export async function getDashboardStats(): Promise<DashboardStats> {
  if (isMongoConnected()) {
    const [
      totalReviews,
      pendingReviews,
      approvedReviews,
      rejectedReviews,
      totalEnquiries,
      newEnquiries,
    ] = await Promise.all([
      (Review as any).countDocuments(),
      (Review as any).countDocuments({ status: 'pending' }),
      (Review as any).countDocuments({ status: 'approved' }),
      (Review as any).countDocuments({ status: 'rejected' }),
      (Enquiry as any).countDocuments(),
      (Enquiry as any).countDocuments({ status: 'New' }),
    ]);

    return {
      totalReviews,
      pendingReviews,
      approvedReviews,
      rejectedReviews,
      totalEnquiries,
      newEnquiries,
    };
  }

  return localDb.getStats();
}

// ======================== ADMIN USER ========================

export async function getAdminByEmail(email: string): Promise<AdminUserRecord> {
  if (isMongoConnected()) {
    const user = await (AdminUser as any).findOne({ email: email.toLowerCase() }).lean();
    if (user) {
      return {
        id: (user as any)._id.toString(),
        name: (user as any).name,
        email: (user as any).email,
        passwordHash: (user as any).password,
      };
    }
  }
  const local = localDb.getAdminUser();
  return {
    id: local.id,
    name: local.name,
    email: local.email,
    passwordHash: local.passwordHash,
  };
}

export async function updateAdminUser(data: { name?: string; email?: string; password?: string }) {
  if (isMongoConnected()) {
    const updateObj: any = {};
    if (data.name) updateObj.name = data.name;
    if (data.email) updateObj.email = data.email.toLowerCase();
    if (data.password) updateObj.password = data.password;

    const user = await (AdminUser as any).findOneAndUpdate(
      {},
      updateObj,
      { new: true, upsert: true }
    ).lean();

    return {
      id: (user as any)._id.toString(),
      name: user.name,
      email: user.email,
    };
  }
  return localDb.updateAdminUser(data);
}
