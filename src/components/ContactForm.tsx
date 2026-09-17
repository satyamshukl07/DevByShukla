import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ContactFormData } from '../types';
import { submitContactInquiry } from '../services/contactService';

interface ContactFormProps {
  simplified?: boolean;
  onSuccessCallback?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ simplified = false, onSuccessCallback }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: 'Local Business',
    website: '',
    projectType: 'Business Website',
    budget: '₹20,000 - ₹50,000 / $250 - $600',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validate
    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError('Please provide a valid email address (e.g. name@company.com).');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError('Please share at least a few details about your project (min 10 characters).');
      return;
    }

    setLoading(true);
    try {
      const res = await submitContactInquiry(formData);
      setSuccessMessage(res.message);
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        businessType: 'Local Business',
        website: '',
        projectType: 'Business Website',
        budget: '₹20,000 - ₹50,000 / $250 - $600',
        message: '',
      });
      if (onSuccessCallback) onSuccessCallback();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
      {successMessage ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Inquiry Received!</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {successMessage}
          </p>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-colors mt-2"
          >
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-slate-50/50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Your Email <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-slate-50/50"
              />
            </div>
          </div>

          {/* If not simplified, show phone, business name, project type & budget */}
          {!simplified && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-slate-50/50"
                  />
                </div>

                <div>
                  <label htmlFor="businessName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Business / Organization Name
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Greenwood School"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectType" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-slate-50/50"
                  >
                    <option value="Business Website">Business Website</option>
                    <option value="E-commerce Store">E-commerce Store</option>
                    <option value="School / Education">School / Education</option>
                    <option value="Hospital / Clinic">Hospital / Clinic</option>
                    <option value="Restaurant / Food">Restaurant / Food</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Custom Web App">Custom Web App</option>
                    <option value="Website Redesign">Website Redesign</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Estimated Budget (INR ₹ / USD $)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-slate-50/50"
                  >
                    <option value="₹20,000 - ₹50,000 / $250 - $600">₹20,000 - ₹50,000 / $250 - $600 (Starter / Business)</option>
                    <option value="₹50,000 - ₹1,00,000 / $600 - $1,200">₹50,000 - ₹1,00,000 / $600 - $1,200 (Growth / E-commerce)</option>
                    <option value="₹1,00,000 - ₹2,00,000 / $1,200 - $2,500">₹1,00,000 - ₹2,00,000 / $1,200 - $2,500 (Custom Full-Stack)</option>
                    <option value="₹2,00,000+ / $2,500+">₹2,00,000+ / $2,500+ (Enterprise / Web App)</option>
                    <option value="Need Consultation">Need Consultation First</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Message field matching reference */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Message <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={simplified ? 4 : 4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project, goals, and any timeline requirements..."
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-slate-50/50 resize-y"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] shadow-lg shadow-blue-600/30 disabled:opacity-70 transition-all duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
