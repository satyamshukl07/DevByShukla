import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '../types';

interface FaqAccordionProps {
  faqs: FaqItem[];
  allowMultiple?: boolean;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs, allowMultiple = false }) => {
  const [openIds, setOpenIds] = useState<string[]>([faqs[0]?.id || '']);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="space-y-3.5 max-w-3xl mx-auto">
      {faqs.map((faq) => {
        const isOpen = openIds.includes(faq.id);

        return (
          <div
            key={faq.id}
            className={`rounded-xl transition-all duration-200 border ${
              isOpen
                ? 'bg-slate-900/90 border-blue-500/50 shadow-md shadow-blue-950/40'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
            }`}
          >
            <button
              onClick={() => toggleItem(faq.id)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
              aria-expanded={isOpen}
            >
              <span className={`text-base font-semibold transition-colors ${
                isOpen ? 'text-blue-400' : 'text-slate-200'
              }`}>
                {faq.question}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                isOpen ? 'bg-blue-600/20 text-blue-400 rotate-180' : 'bg-slate-800 text-slate-400'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
