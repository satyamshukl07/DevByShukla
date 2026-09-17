import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  Clock, 
  Smartphone, 
  Key, 
  Star, 
  Sparkles, 
  CheckCircle2,
  PenTool,
  Loader2
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { TestimonialCard } from '../components/TestimonialCard';
import { CtaSection } from '../components/CtaSection';
import { WriteReviewModal } from '../components/WriteReviewModal';
import { clientExpectations, testimonialsData } from '../data/testimonials';
import { fetchPublicApprovedReviews } from '../services/adminApi';
import { ReviewItem, TestimonialItem } from '../types';

export const Testimonials: React.FC = () => {
  const [approvedReviews, setApprovedReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadApprovedReviews = async () => {
    try {
      setLoading(true);
      const data = await fetchPublicApprovedReviews();
      setApprovedReviews(data);
    } catch (err) {
      console.warn('Could not fetch approved reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApprovedReviews();
  }, []);

  const getExpectationIcon = (name: string) => {
    switch (name) {
      case 'MessageSquare': return <MessageSquare className="w-6 h-6" />;
      case 'Clock': return <Clock className="w-6 h-6" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Key': return <Key className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  // Convert approved database reviews to the card display structure if available
  const displayItems: TestimonialItem[] = approvedReviews.length > 0
    ? approvedReviews.map((r) => ({
        id: r._id,
        name: r.name,
        role: 'Verified Client',
        company: 'DevByShukla Project',
        avatarUrl: r.photoUrl,
        quote: r.reviewText,
        rating: r.rating,
        projectType: 'Website Development',
        isSample: false,
      }))
    : testimonialsData;

  return (
    <div className="min-h-screen bg-[#080d1a]">
      <PageHero
        badge="TRANSPARENCY & TRUST"
        title="Client Commitments"
        highlightText="& Verified Reviews"
        description="We believe in total transparency. Discover our concrete service commitments, guarantees, and verified customer reflections."
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

      {/* Testimonials Showcase */}
      <section className="py-20 bg-[#080d1a] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
                <Sparkles className="w-3 h-3" />
                <span>TESTIMONIALS & FEEDBACK</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Client Experiences With Our Studio
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
                Real customer feedback demonstrating our high standards across education, healthcare, dining, and modern web applications.
              </p>
            </div>

            {/* Write a review button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                <PenTool className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>

          {/* Database vs Sample Badge Notice */}
          <div className="max-w-3xl mx-auto mb-10 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 text-center">
            <span className="text-blue-400 font-semibold">Live Moderation Guarantee:</span>{' '}
            {approvedReviews.length > 0 ? (
              <span>Showing {approvedReviews.length} verified client reviews approved by Satyam Shukla.</span>
            ) : (
              <span>All submitted customer reviews are moderated by admin before publication.</span>
            )}
          </div>

          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
              <p className="text-xs">Loading client reviews...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {displayItems.map((item) => (
                <TestimonialCard key={item.id} testimonial={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Write a Review Modal */}
      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitted={() => {
          // Re-fetch approved reviews (even though new ones stay pending until admin approves)
          loadApprovedReviews();
        }}
      />

      <CtaSection
        title="Ready to Experience Stress-Free Development?"
        subtitle="Let's build your new website with clear timelines, transparent milestones, and reliable communication."
        primaryButtonText="Start Your Project"
        primaryButtonLink="/contact"
      />
    </div>
  );
};
