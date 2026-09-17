import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  title = "Ready to Build Your Business Website?",
  subtitle = "Let's turn your vision into a fast, responsive, and modern website that drives inquiries and builds customer trust.",
  primaryButtonText = "Get a Free Quote",
  primaryButtonLink = "/contact",
  secondaryButtonText = "View Portfolio",
  secondaryButtonLink = "/portfolio",
}) => {
  return (
    <section className="relative py-16 sm:py-20 bg-[#080d1a] border-t border-slate-800/80 overflow-hidden">
      {/* Blue gradient backdrop glow */}
      <div 
        className="absolute inset-0 bg-radial from-blue-600/10 via-transparent to-transparent opacity-80 pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START YOUR PROJECT</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
          {title}
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={primaryButtonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all duration-200"
          >
            <span>{primaryButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {secondaryButtonText && (
            <Link
              to={secondaryButtonLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all duration-200"
            >
              <span>{secondaryButtonText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
