import { Router } from 'express';
import * as enquiryController from '../controllers/enquiryController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

export const adminEnquiryRouter = Router();

// Protect all admin enquiry routes with requireAdminAuth
adminEnquiryRouter.use(requireAdminAuth);

// GET /api/admin/enquiries - All enquiries with optional ?status= query
adminEnquiryRouter.get('/', enquiryController.getAdminEnquiries);

// PATCH /api/admin/enquiries/:id/status - Update enquiry status ('New' | 'Contacted' | 'Resolved')
adminEnquiryRouter.patch('/:id/status', enquiryController.updateEnquiryStatus);

// DELETE /api/admin/enquiries/:id - Delete enquiry
adminEnquiryRouter.delete('/:id', enquiryController.deleteEnquiry);
