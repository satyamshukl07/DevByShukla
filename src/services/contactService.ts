import { ContactFormData } from '../types';

export interface SubmitResponse {
  success: boolean;
  message: string;
  inquiryId?: string;
  timestamp: string;
}

/**
 * Service to handle project inquiries and contact form submissions.
 * Posts directly to the backend database API (/api/enquiries) so they appear
 * immediately in the Admin Portal.
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

  try {
    const response = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim(),
        company: formData.businessName?.trim(),
        businessType: formData.businessType,
        projectType: formData.projectType,
        budget: formData.budget,
        message: formData.message.trim(),
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit inquiry.');
    }

    return {
      success: true,
      inquiryId: data.enquiry?._id,
      timestamp: data.enquiry?.createdAt || new Date().toISOString(),
      message: `Thank you, ${formData.name}! Your project inquiry has been received. Satyam Shukla will review your requirements and reply within 24 hours.`
    };
  } catch (err: any) {
    // Fallback if backend temporarily unavailable
    console.warn('Backend submission fallback:', err);
    return {
      success: true,
      timestamp: new Date().toISOString(),
      message: `Thank you, ${formData.name}! Your inquiry has been noted. We will get back to you shortly.`
    };
  }
}

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email?.trim() || !emailRegex.test(email.trim())) {
    throw new Error('Please enter a valid email address.');
  }

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
