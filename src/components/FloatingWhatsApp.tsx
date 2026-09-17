import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '919210042200';
  const defaultMessage = encodeURIComponent('Hi Satyam, I would like to discuss a website project for my business!');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-auto">
      {/* Tooltip badge */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0b1222] text-white text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-700/80 animate-in fade-in slide-in-from-right duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Chat on WhatsApp: <strong className="text-emerald-400">9210042200</strong></span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-white ml-1.5 focus:outline-none"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct chat on WhatsApp with Satyam Shukla"
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-lg shadow-emerald-600/40 hover:shadow-emerald-600/60 hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
      >
        <MessageSquare className="w-7 h-7 fill-white/20 group-hover:scale-105 transition-transform" />
        {/* Pulsing indicator ring */}
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#080d1a] rounded-full animate-ping" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#080d1a] rounded-full" />
      </a>
    </div>
  );
};
