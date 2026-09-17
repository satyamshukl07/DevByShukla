import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
      <div>
        {/* Author header matching reference */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
            <img
              src={testimonial.avatarUrl}
              alt={testimonial.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              {testimonial.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {testimonial.role} • {testimonial.company}
            </p>
          </div>
        </div>

        {/* Quote text */}
        <p className="text-sm text-slate-700 leading-relaxed italic">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Star ratings & honest disclaimer badge */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
          {testimonial.isSample ? 'Sample Feedback' : 'Verified Review'}
        </span>
      </div>
    </div>
  );
};
