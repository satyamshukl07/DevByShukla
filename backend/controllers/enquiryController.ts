import { Request, Response } from 'express';
import * as dbService from '../services/databaseService.js';

/**
 * POST /api/enquiries
 * Public submission of project inquiries / contact forms.
 */
export async function submitEnquiry(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, phone, company, businessType, projectType, budget, message } = req.body;

    if (!name?.trim()) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    if (!email?.trim()) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    if (!message?.trim() || message.trim().length < 5) {
      res.status(400).json({ error: 'Please include a message or project description' });
      return;
    }

    const enquiry = await dbService.createEnquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      company: company ? company.trim() : undefined,
      businessType: businessType ? businessType.trim() : undefined,
      projectType: projectType ? projectType.trim() : undefined,
      budget: budget ? budget.trim() : undefined,
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: `Thank you, ${name}! Your inquiry has been sent directly to Satyam Shukla.`,
      enquiry,
    });
  } catch (err: any) {
    console.error('Error submitting enquiry:', err);
    res.status(500).json({ error: err.message || 'Failed to submit enquiry' });
  }
}

/**
 * GET /api/admin/enquiries
 * Admin view of inquiries with optional status filter (?status=New|Contacted|Resolved)
 */
export async function getAdminEnquiries(req: Request, res: Response): Promise<void> {
  try {
    const status = req.query.status as ('New' | 'Contacted' | 'Resolved') | undefined;
    const enquiries = await dbService.getAllEnquiries(status);
    res.json({ success: true, enquiries });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch enquiries' });
  }
}

/**
 * PATCH /api/admin/enquiries/:id/status
 * Admin updates the status of an inquiry ('New' | 'Contacted' | 'Resolved')
 */
export async function updateEnquiryStatus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['New', 'Contacted', 'Resolved'].includes(status)) {
      res.status(400).json({ error: 'Invalid status. Must be New, Contacted, or Resolved.' });
      return;
    }

    const enquiry = await dbService.updateEnquiryStatus(id, status);
    if (!enquiry) {
      res.status(404).json({ error: 'Enquiry not found' });
      return;
    }

    res.json({ success: true, message: `Enquiry marked as ${status}`, enquiry });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update enquiry status' });
  }
}

/**
 * DELETE /api/admin/enquiries/:id
 * Admin deletes an enquiry
 */
export async function deleteEnquiry(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await dbService.deleteEnquiry(id);
    if (!deleted) {
      res.status(404).json({ error: 'Enquiry not found' });
      return;
    }
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete enquiry' });
  }
}
