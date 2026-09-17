import React, { useState } from 'react';
import { Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ProjectCard } from '../components/ProjectCard';
import { CtaSection } from '../components/CtaSection';
import { projectsData } from '../data/projects';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'School',
    'Hospital',
    'Restaurant',
    'Real Estate',
    'Travel',
    'Business',
    'E-commerce'
  ];

  const filtered = projectsData.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      project.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#080d1a]">
      <PageHero
        badge="OUR WORK & PROTOTYPES"
        title="Recent Client Projects"
        highlightText="& Concept Builds"
        description="Explore our interactive website builds across schools, healthcare clinics, luxury dining, real estate, and digital commerce."
        breadcrumb="Portfolio"
      />

      {/* Main Content Area */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or industries..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Honest transparency note */}
          <div className="mb-10 p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-300 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                <strong>Portfolio Notice:</strong> Projects shown include production-ready concepts and client architectures engineered to illustrate industry-specific features.
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] text-blue-400 font-semibold bg-blue-900/60 px-2.5 py-1 rounded-full border border-blue-700/50 shrink-0">
              Ready for Custom Deployment
            </span>
          </div>

          {/* Projects Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
              <p className="text-slate-400 text-sm">
                No projects matched "{searchQuery}" in category "{selectedCategory}".
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-full text-xs font-semibold text-blue-400 hover:text-white bg-blue-600/20 hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <CtaSection
        title="Need a Website Designed for Your Specific Industry?"
        subtitle="Let's build a tailored solution that matches your brand identity and drives conversions."
        primaryButtonText="Discuss Your Project"
        primaryButtonLink="/contact"
      />
    </div>
  );
};
