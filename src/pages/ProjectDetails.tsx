import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { CtaSection } from '../components/CtaSection';

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen pt-40 pb-20 bg-[#080d1a] text-center px-4">
        <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
        <p className="text-slate-400 mb-6">The requested portfolio project could not be found.</p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  // Next & previous projects
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100">
      {/* Header Bar */}
      <div className="pt-32 pb-12 sm:pt-36 sm:pb-16 border-b border-slate-800/80 bg-gradient-to-b from-[#0a1224] to-[#080d1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-blue-400 transition-colors bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>

            <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Concept Project Demo</span>
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
              {project.categoryLabel}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {project.name}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {project.shortDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Device Preview Canvas */}
      <section className="py-12 bg-[#050811] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Device Switcher Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
            <div className="text-xs font-semibold text-slate-400">
              Interactive Viewport Simulation:
            </div>
            
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  deviceView === 'desktop'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Desktop view"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDeviceView('tablet')}
                className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  deviceView === 'tablet'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Tablet view"
              >
                <Tablet className="w-4 h-4" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  deviceView === 'mobile'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Mobile view"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          </div>

          {/* Interactive Simulated Web Frame */}
          <div className="flex justify-center transition-all duration-300">
            <div
              className={`transition-all duration-300 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-[#090e1a] ${
                deviceView === 'desktop'
                  ? 'w-full max-w-5xl'
                  : deviceView === 'tablet'
                  ? 'w-full max-w-[720px]'
                  : 'w-full max-w-[375px]'
              }`}
            >
              {/* Browser bar */}
              <div className="h-9 bg-[#0e1628] border-b border-slate-800 px-4 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[11px] font-mono text-slate-400 truncate max-w-md px-3 py-0.5 rounded bg-slate-900 border border-slate-800">
                  https://preview.devbyshukla.com/{project.slug}
                </div>
                <div className="w-6" />
              </div>

              {/* Simulated Website UI */}
              <div className="p-6 sm:p-10 space-y-8 bg-gradient-to-b from-[#0d1527] to-[#080d19]">
                {/* Hero section */}
                <div className="p-8 sm:p-12 rounded-2xl border border-slate-700/60 relative overflow-hidden bg-gradient-to-r from-slate-900/90 to-[#0c1426]">
                  <div className="relative z-10 max-w-xl space-y-4">
                    <span 
                      className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                      style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, backgroundColor: `${project.primaryColor}20` }}
                    >
                      {project.categoryLabel}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                      {project.heroHeading}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300">
                      {project.heroSubheading}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-3">
                      <button 
                        type="button"
                        className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-md transition-transform active:scale-95"
                        style={{ backgroundColor: project.primaryColor }}
                      >
                        Book / Inquire Now
                      </button>
                      <button 
                        type="button"
                        className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-slate-300 bg-slate-800/80 border border-slate-700"
                      >
                        Explore Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Simulated features highlight row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.keyFeatures.slice(0, 3).map((feat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-bold text-white mb-1">Feature 0{i + 1}</div>
                      <div className="text-xs text-slate-400">{feat}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Case Study Details */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Narrative, Goal, Solution */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Client Goal & Challenge
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                {project.clientGoal}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Our Engineering & UI Solution
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Key Features Delivered
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Results & Performance Metrics
              </h2>
              <div className="space-y-3">
                {project.resultsDelivered.map((res, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 text-sm text-blue-200 flex items-center gap-3"
                  >
                    <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Meta Specs & Inquiry Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Project Overview
              </h3>

              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Category
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {project.categoryLabel}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status
                </div>
                <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Production Ready Concept</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Technologies Used
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  to={`/contact?ref=${encodeURIComponent(project.name)}`}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all"
                >
                  <span>Build a Website Like This</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <Link
                to={`/portfolio/${prevProject.slug}`}
                className="hover:text-white flex items-center gap-1.5 truncate max-w-[45%]"
              >
                <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Prev: {prevProject.name}</span>
              </Link>
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="hover:text-white flex items-center gap-1.5 truncate max-w-[45%] text-right"
              >
                <span className="truncate">Next: {nextProject.name}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title={`Want a Website Similar to ${project.name}?`}
        subtitle="We will customize the architecture, layout, color palette, and lead capture funnels to match your business."
        primaryButtonText="Request a Free Quote"
        primaryButtonLink={`/contact?ref=${encodeURIComponent(project.name)}`}
      />
    </div>
  );
};
