import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlightText?: string;
  description?: string;
  align?: 'left' | 'center';
  darkTheme?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightText,
  description,
  align = 'center',
  darkTheme = false,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} mb-12 sm:mb-16`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3.5 ${
          darkTheme 
            ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm' 
            : 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
        }`}>
          <span>{badge}</span>
        </div>
      )}

      <h2 className={`text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-tight sm:leading-tight ${
        darkTheme ? 'text-white' : 'text-slate-900'
      }`}>
        {title}
        {highlightText && (
          <span className="text-blue-600 block sm:inline sm:ml-2">
            {highlightText}
          </span>
        )}
      </h2>

      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          darkTheme ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
};
