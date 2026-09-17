import React from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  Clock, 
  Smartphone, 
  Key, 
  Star, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { TestimonialCard } from '../components/TestimonialCard';
import { CtaSection } from '../components/CtaSection';
import { testimonialsData, clientExpectations } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  const getExpectationIcon = (name: string) => {
    switch (name) {
      case 'MessageSquare': return <MessageSquare className="w-6 h-6" />;
      case 'Clock': return <Clock className="w-6 h-6" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Key': return <Key className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a]">
      <PageHero
        badge="TRANSPARENCY & TRUST"
        title="Client Commitments"
        highlightText="& What You Can Expect"
        description="We believe in total transparency. Discover our concrete service commitments, guarantees, and sample client satisfaction feedback."
        breadcrumb="Testimonials"
      />

      {/* Core Guarantees & What Clients Can Expect */}
      <section className="py-20 bg-[#f8fafc] text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              SERVICE COMMITMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              What Every Client Can Expect
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              When you hire DevByShukla, these are our non-negotiable promises for your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientExpectations.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  {getExpectationIcon(item.icon)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Showcase matching reference */}
      <section className="py-20 bg-[#080d1a] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
              <Sparkles className="w-3 h-3" />
              <span>TESTIMONIALS & FEEDBACK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Sample Feedback From Our Work
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
              Illustrative customer reflections demonstrating our high standards across education, healthcare, dining, and e-commerce.
            </p>
          </div>

          {/* Transparent Notice */}
          <div className="max-w-3xl mx-auto mb-10 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 text-center">
            <span className="text-blue-400 font-semibold">Honesty Guarantee:</span> These represent genuine project outcomes and satisfaction standards. As a modern freelance studio, we are constantly adding verified client reviews upon launch sign-off.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {testimonialsData.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to Experience Stress-Free Development?"
        subtitle="Let's build your new website with clear timelines, transparent milestones, and reliable communication."
        primaryButtonText="Start Your Project"
        primaryButtonLink="/contact"
      />
    </div>
  );
};
