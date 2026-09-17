import { Router } from 'express';
import * as enquiryController from '../controllers/enquiryController.js';

export const enquiryRouter = Router();

// POST /api/enquiries - Public enquiry submission
enquiryRouter.post('/', enquiryController.submitEnquiry);
