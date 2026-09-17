import React from 'react';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeroMockup: React.FC = () => {
  return (
    <div className="relative w-full max-w-[560px] mx-auto lg:max-w-none">
      {/* Glow aura behind the devices */}
      <div 
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/25 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      {/* Handwritten Annotation with curved arrow matching reference */}
      <div className="absolute -top-14 right-8 sm:right-16 z-20 flex flex-col items-center pointer-events-none select-none">
        <div className="font-handwriting text-cyan-300 text-xl sm:text-2xl font-bold leading-tight drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)] transform -rotate-6 text-center">
          <span>Your Business</span>
          <br />
          <span className="text-white">Our Expertise</span>
        </div>
        {/* Curved hand-drawn style arrow pointing down to screen */}
        <svg
          className="w-12 h-10 text-cyan-400 mt-1 transform -rotate-12"
          viewBox="0 0 50 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2 C 18 12, 28 22, 34 32"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1 0"
          />
          <path
            d="M24 30 L 34 33 L 33 22"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Main Composition Container */}
      <div className="relative pt-6 sm:pt-8 pb-4">
        {/* LAPTOP CONTAINER */}
        <div className="relative mx-auto w-[90%] sm:w-[85%] lg:w-[92%] transition-transform duration-500 hover:scale-[1.01]">
          {/* Laptop Top Lid / Display Screen */}
          <div className="relative bg-[#0d1424] rounded-t-2xl p-2.5 sm:p-3 pb-2 sm:pb-3 border border-slate-700/80 shadow-2xl shadow-blue-950/80 ring-1 ring-white/10">
            {/* Webcam / Notch dot */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-700 border border-slate-600" />

            {/* Screen Inner Bezel & Display */}
            <div className="relative aspect-[16/10] bg-[#090e1a] rounded-lg overflow-hidden border border-slate-800 flex flex-col justify-between">
              {/* Fake Website Header inside Laptop */}
              <div className="h-8 bg-[#0f172a]/90 border-b border-slate-800/80 px-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[10px] font-bold text-blue-400">DevByShukla Agency</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-[9px] text-slate-400">
                  <span>Solutions</span>
                  <span>Work</span>
                  <span>About</span>
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[8px]">Inquire</span>
                </div>
              </div>

              {/* Laptop Screen Content - "Better Solutions For A Brighter Tomorrow" matching reference */}
              <div className="relative flex-1 p-4 sm:p-6 flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0a1226] via-[#090f1f] to-[#040813]">
                {/* Background cityscape / abstract architecture overlay */}
                <div 
                  className="absolute inset-0 opacity-25 mix-blend-screen bg-cover bg-center pointer-events-none"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80')`
                  }}
                />

                <div className="relative z-10 max-w-[70%]">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[8px] sm:text-[10px] font-semibold border border-blue-500/30 mb-1.5">
                    <Sparkles className="w-2.5 h-2.5" /> High Performance
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl font-extrabold text-white leading-tight tracking-tight">
                    Better Solutions <br />
                    <span className="text-blue-400">For A Brighter Tomorrow</span>
                  </h3>
                  <p className="hidden sm:block text-[10px] text-slate-300 mt-1 line-clamp-2">
                    Architecting high-converting digital platforms with responsive precision and clean code.
                  </p>
                  <div className="mt-2.5 sm:mt-3 flex items-center gap-2">
                    <div className="px-2.5 py-1 bg-blue-600 text-white text-[9px] sm:text-[10px] font-semibold rounded shadow">
                      Get Started
                    </div>
                    <div className="hidden sm:block px-2 py-1 bg-slate-800/80 text-slate-300 text-[9px] rounded border border-slate-700">
                      Learn More
                    </div>
                  </div>
                </div>

                {/* Subtle cards preview row in screen bottom */}
                <div className="relative z-10 mt-3 pt-2 border-t border-slate-800/70 grid grid-cols-3 gap-2 max-w-[85%]">
                  <div className="bg-slate-800/50 p-1.5 rounded border border-slate-700/40">
                    <div className="text-[8px] text-slate-400">Page Speed</div>
                    <div className="text-[10px] font-bold text-emerald-400">99/100</div>
                  </div>
                  <div className="bg-slate-800/50 p-1.5 rounded border border-slate-700/40">
                    <div className="text-[8px] text-slate-400">Uptime</div>
                    <div className="text-[10px] font-bold text-blue-400">99.9%</div>
                  </div>
                  <div className="bg-slate-800/50 p-1.5 rounded border border-slate-700/40">
                    <div className="text-[8px] text-slate-400">Security</div>
                    <div className="text-[10px] font-bold text-cyan-400">SSL A+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Bottom Aluminum Base / Hinge */}
          <div className="relative h-3 sm:h-4 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 rounded-b-xl border-t border-slate-500/50 shadow-xl">
            {/* Notch cutout to open lid */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 sm:h-1.5 bg-slate-900 rounded-b-md" />
          </div>
          {/* Laptop Base Stand / Under shadow */}
          <div className="mx-auto w-[96%] h-2 bg-slate-900/60 rounded-b-full blur-sm" />
        </div>

        {/* OVERLAPPING SMARTPHONE MOCKUP ON RIGHT SIDE matching reference */}
        <div className="absolute -bottom-2 sm:-bottom-4 right-1 sm:right-4 md:right-8 z-30 w-28 sm:w-36 md:w-44 transition-transform duration-300 hover:scale-105">
          {/* Smartphone Frame */}
          <div className="relative bg-[#0f172a] rounded-[24px] sm:rounded-[28px] p-2 border-[3px] border-slate-700 shadow-2xl shadow-black ring-1 ring-cyan-500/20">
            {/* Top speaker notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-1 bg-slate-800 rounded-full z-10" />

            {/* Screen */}
            <div className="relative bg-[#090d1a] rounded-[18px] sm:rounded-[22px] overflow-hidden aspect-[9/18.5] p-2.5 sm:p-3 flex flex-col justify-between border border-slate-800">
              {/* Header */}
              <div className="pt-2 flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <div className="text-[9px] sm:text-[10px] font-bold text-white tracking-tight">
                  Dev<span className="text-blue-500">ByShukla</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Mobile Hero Body matching reference ("Modern Design Business" + "Launch Your Site" CTA) */}
              <div className="my-auto py-1 space-y-1.5 text-center">
                <span className="inline-block text-[7px] sm:text-[8px] font-medium text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded-full border border-cyan-800/50">
                  Mobile First
                </span>
                <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                  Modern Design <br />
                  <span className="text-blue-400">Business</span>
                </h4>
                <p className="text-[8px] text-slate-400 line-clamp-2">
                  Fast responsive experience on every phone.
                </p>
                <div className="pt-1">
                  <div className="w-full py-1.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-[9px] sm:text-[10px] font-extrabold rounded-lg shadow-md shadow-blue-600/40 flex items-center justify-center gap-1 cursor-pointer">
                    <span>Launch Your Site</span>
                    <span className="text-[10px]">🚀</span>
                  </div>
                </div>
              </div>

              {/* Bottom Nav / Indicator */}
              <div className="pt-1 border-t border-slate-800/60 flex items-center justify-around text-slate-400">
                <div className="w-5 h-1 bg-slate-700 rounded-full mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
