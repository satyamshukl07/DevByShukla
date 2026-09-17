export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  iconBgColor: string;
  iconTextColor: string;
  features: string[];
  suitableFor: string;
  startingPrice: string;
  turnaround: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  category: 'School' | 'Hospital' | 'Restaurant' | 'Real Estate' | 'Travel' | 'Business' | 'E-commerce';
  categoryLabel: string;
  shortDesc: string;
  clientGoal: string;
  solution: string;
  heroHeading: string;
  heroSubheading: string;
  primaryColor: string;
  accentColor: string;
  isDemo: boolean;
  livePreviewUrl?: string;
  technologies: string[];
  keyFeatures: string[];
  resultsDelivered: string[];
  imageType: 'school' | 'hospital' | 'restaurant' | 'real-estate' | 'travel' | 'ecommerce';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
  rating: number;
  projectType: string;
  isSample: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Pricing & Process' | 'Technical' | 'Support';
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: string;
  duration: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  website?: string;
  projectType?: string;
  budget?: string;
  message: string;
}

export type ReviewStatus = 'pending' | 'approved' | 'rejected';
export type EnquiryStatus = 'New' | 'Contacted' | 'Resolved';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  updatedAt?: string;
}

export interface ReviewItem {
  _id: string;
  name: string;
  email?: string;
  photoUrl: string;
  rating: number;
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

export interface AdminStats {
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
  rejectedReviews: number;
  totalEnquiries: number;
  newEnquiries: number;
}

