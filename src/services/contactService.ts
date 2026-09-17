import { ContactFormData } from '../types';

export interface SubmitResponse {
  success: boolean;
  message: string;
  inquiryId?: string;
  timestamp: string;
}

/**
 * Service to handle project inquiries and contact form submissions.
 * In a production backend, this connects to `/api/contact` or an email dispatch service (e.g. Resend / SendGrid).
 * Here, we provide client-side validation, simulate realistic network latency, store in localStorage for offline testing,
 * and return structured responses.
 */
export async function submitContactInquiry(formData: ContactFormData): Promise<SubmitResponse> {
  // Validate required fields
  if (!formData.name?.trim()) {
    throw new Error('Please provide your name.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email?.trim() || !emailRegex.test(formData.email.trim())) {
    throw new Error('Please provide a valid email address.');
  }

  if (!formData.message?.trim() || formData.message.trim().length < 10) {
    throw new Error('Please provide a project description of at least 10 characters.');
  }

  // Simulate network dispatch
  await new Promise((resolve) => setTimeout(resolve, 800));

  const inquiryId = `INQ-${Date.now().toString(36).toUpperCase()}`;
  const record = {
    ...formData,
    id: inquiryId,
    timestamp: new Date().toISOString(),
    status: 'received'
  };

  try {
    const existing = JSON.parse(localStorage.getItem('devbyshukla_inquiries') || '[]');
    existing.unshift(record);
    localStorage.setItem('devbyshukla_inquiries', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

  return {
    success: true,
    inquiryId,
    timestamp: record.timestamp,
    message: `Thank you, ${formData.name}! Your project inquiry has been received. Satyam Shukla will review your requirements and reply within 24 hours.`
  };
}

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email?.trim() || !emailRegex.test(email.trim())) {
    throw new Error('Please enter a valid email address.');
  }

  await new Promise((resolve) => setTimeout(resolve, 600));

  try {
    const subs = JSON.parse(localStorage.getItem('devbyshukla_newsletter') || '[]');
    if (!subs.includes(email.trim().toLowerCase())) {
      subs.push(email.trim().toLowerCase());
      localStorage.setItem('devbyshukla_newsletter', JSON.stringify(subs));
    }
  } catch (e) {
    console.warn('Newsletter storage:', e);
  }

  return {
    success: true,
    message: 'Thanks for subscribing! You will receive modern web design tips & insights.'
  };
}
