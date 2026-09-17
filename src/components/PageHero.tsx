import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

interface PageHeroProps {
  badge?: string;
  title: string;
  highlightText?: string;
  description: string;
  breadcrumb?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  highlightText,
  description,
  breadcrumb,
}) => {
  return (
    <div className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-[#080d1a] border-b border-slate-800/80 overflow-hidden">
      {/* Ambient background glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-600/15 via-sky-500/5 to-transparent blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {breadcrumb && (
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200">{breadcrumb}</span>
          </nav>
        )}

        <div className="max-w-3xl">
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600/15 text-blue-400 border border-blue-500/30 mb-4">
              <Sparkles className="w-3 h-3" />
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {title}
            {highlightText && (
              <span className="text-blue-500 block sm:inline sm:ml-3">
                {highlightText}
              </span>
            )}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
