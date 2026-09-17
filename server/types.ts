export type ReviewStatus = 'pending' | 'approved' | 'rejected';
export type EnquiryStatus = 'New' | 'Contacted' | 'Resolved';

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  updatedAt: string;
}

export interface ReviewItem {
  _id: string;
  name: string;
  email?: string;
  photoUrl: string;
  rating: number; // strictly 1 | 2 | 3 | 4 | 5
  reviewText: string;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: string;
  projectType?: string;
  budget?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseSchema {
  admin: AdminUser;
  reviews: ReviewItem[];
  enquiries: EnquiryItem[];
}
