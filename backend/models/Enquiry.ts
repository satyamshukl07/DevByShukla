import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: string;
  projectType?: string;
  budget?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Resolved';
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    businessType: {
      type: String,
      trim: true,
    },
    projectType: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Resolved'],
      default: 'New',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry: Model<IEnquiry> =
  (mongoose.models.Enquiry as Model<IEnquiry>) ||
  mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
