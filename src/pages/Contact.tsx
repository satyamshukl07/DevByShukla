import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ContactForm } from '../components/ContactForm';
import { ContactInfoCards } from '../components/ContactInfoCards';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const refParam = searchParams.get('ref');

  return (
    <div className="min-h-screen bg-[#080d1a]">
      <PageHero
        badge="GET A FREE QUOTE"
        title="Let's Build Something"
        highlightText="Great Together"
        description="Have a project in mind? Tell me what you need and I'll get back to you with a detailed, transparent proposal and estimate."
        breadcrumb="Contact"
      />

      {/* Main Form & Info Section */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {(serviceParam || refParam) && (
            <div className="max-w-5xl mx-auto mb-8 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
              <span>
                Inquiring about: <strong>{serviceParam || refParam}</strong>. Please provide your business details below.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
            {/* Left: Complete Quote Form */}
            <div className="lg:col-span-7">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Project Details & Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Fill out the form below to receive a customized estimate and timeline for your website.
                </p>
              </div>

              <ContactForm simplified={false} />
            </div>

            {/* Right: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              <ContactInfoCards />

              {/* What Happens Next Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  What Happens Next?
                </h4>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      1
                    </span>
                    <span>I review your requirements, sitemap, and target audience within 24 hours.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      2
                    </span>
                    <span>We schedule a brief 15-minute discovery call or chat over WhatsApp/Email.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      3
                    </span>
                    <span>You receive an itemized proposal with clear milestone dates and a fixed price.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
