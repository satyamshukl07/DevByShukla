import React, { useState } from 'react';
import { Search, HelpCircle, MessageSquare } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { FaqAccordion } from '../components/FaqAccordion';
import { CtaSection } from '../components/CtaSection';
import { faqsData } from '../data/faqs';

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'General', 'Pricing & Process', 'Technical', 'Support'];

  const filteredFaqs = faqsData.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#080d1a]">
      <PageHero
        badge="FREQUENTLY ASKED QUESTIONS"
        title="Everything You Need to Know"
        highlightText="About Working With Us"
        description="Got questions about pricing, project timelines, hosting, custom databases, or ongoing maintenance? Find answers below."
        breadcrumb="FAQ"
      />

      <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search & Category Pills */}
        <div className="space-y-6 mb-12">
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion Component */}
        {filteredFaqs.length > 0 ? (
          <FaqAccordion faqs={filteredFaqs} />
        ) : (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">
              No questions found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-blue-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Additional question box */}
        <div className="mt-14 p-6 rounded-2xl bg-blue-950/30 border border-blue-900/40 text-center space-y-3">
          <HelpCircle className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Have a Specific Question Not Listed Here?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            I am always happy to answer any questions regarding custom architectures, integrations, or quote breakdowns.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:satyamsuhkla0715@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Email: satyamsuhkla0715@gmail.com</span>
            </a>
            <a
              href="https://wa.me/919210042200"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
            >
              <span>WhatsApp: +91 92100 42200</span>
            </a>
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to Build Your Project?"
        subtitle="Let's discuss your requirements and provide you with a clear, fixed-price quote."
        primaryButtonText="Get a Free Quote"
        primaryButtonLink="/contact"
      />
    </div>
  );
};
