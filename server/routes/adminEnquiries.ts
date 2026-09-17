import { Router, Request, Response } from 'express';
import {
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} from '../db.js';
import { requireAdminAuth } from '../auth.js';
import { EnquiryStatus } from '../types.js';

export const adminEnquiriesRouter = Router();

// Protect ALL admin enquiry routes with authentication middleware
adminEnquiriesRouter.use(requireAdminAuth);

// GET /api/admin/enquiries
adminEnquiriesRouter.get('/', (req: Request, res: Response) => {
  const status = req.query.status as EnquiryStatus | undefined;
  const enquiries = getAllEnquiries(status);
  res.json({ success: true, enquiries });
});

// PATCH /api/admin/enquiries/:id/status
adminEnquiriesRouter.patch('/:id/status', (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses: EnquiryStatus[] = ['New', 'Contacted', 'Resolved'];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ error: 'Invalid status. Must be New, Contacted, or Resolved.' });
    return;
  }

  const updated = updateEnquiryStatus(id, status);
  if (!updated) {
    res.status(404).json({ error: 'Enquiry not found.' });
    return;
  }

  res.json({ success: true, message: 'Status updated successfully.', enquiry: updated });
});

// DELETE /api/admin/enquiries/:id
adminEnquiriesRouter.delete('/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const deleted = deleteEnquiry(id);
  if (!deleted) {
    res.status(404).json({ error: 'Enquiry not found.' });
    return;
  }

  res.json({ success: true, message: 'Enquiry deleted successfully.' });
});
