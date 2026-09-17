import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  TrendingUp, 
  MessageSquare, 
  ShieldCheck, 
  Cpu, 
  Search, 
  Zap, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { CtaSection } from '../components/CtaSection';

export const About: React.FC = () => {
  const whyWorkCards = [
    {
      title: 'Modern Design',
      desc: 'Clean typography, balanced white space, and visually engaging layouts that reflect the highest caliber of design.',
      icon: Layers,
      color: 'text-blue-400 bg-blue-600/10 border-blue-500/20'
    },
    {
      title: 'Clean Development',
      desc: 'Handcrafted with modern React, TypeScript, and semantic CSS. No clunky bloated builders or spaghetti code.',
      icon: Code2,
      color: 'text-sky-400 bg-sky-600/10 border-sky-500/20'
    },
    {
      title: 'Responsive Websites',
      desc: 'Flawless presentation on every viewport—from small 360px smartphones to 4K ultra-wide desktop monitors.',
      icon: Smartphone,
      color: 'text-emerald-400 bg-emerald-600/10 border-emerald-500/20'
    },
    {
      title: 'Business-Focused Approach',
      desc: 'A website is a commercial tool. Every button, heading, and form is engineered to convert visitors into paying clients.',
      icon: TrendingUp,
      color: 'text-amber-400 bg-amber-600/10 border-amber-500/20'
    },
    {
      title: 'Clear Direct Communication',
      desc: 'Work directly with your developer. Transparent updates, milestone demos, and honest project timelines.',
      icon: MessageSquare,
      color: 'text-purple-400 bg-purple-600/10 border-purple-500/20'
    },
    {
      title: 'Post-Launch Support',
      desc: '30 days of free post-launch support and full handover of your source code, domain, and deployment credentials.',
      icon: ShieldCheck,
      color: 'text-cyan-400 bg-cyan-600/10 border-cyan-500/20'
    },
  ];

  const technologies = [
    { name: 'React 19 & Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Type Safety' },
    { name: 'Tailwind CSS', category: 'Modern Styling' },
    { name: 'Node.js & Express', category: 'Backend APIs' },
    { name: 'PostgreSQL & Supabase', category: 'Database' },
    { name: 'Stripe & PayPal', category: 'Payment Gateways' },
    { name: 'Vercel & Cloudflare', category: 'Hosting & CDN' },
    { name: 'Technical SEO', category: 'Search Visibility' },
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        badge="ABOUT DEVBYSHUKLA"
        title="Building Digital Experiences"
        highlightText="That Help Businesses Grow"
        description="DevByShukla is an independent web development agency founded by Satyam Shukla, dedicated to crafting fast, responsive, and high-converting websites for businesses worldwide."
        breadcrumb="About"
      />

      {/* Philosophy / Story Section */}
      <section className="py-20 bg-[#080d1a] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <span>OUR MISSION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Websites engineered for credibility, speed, and real customer inquiries.
              </h2>
              <p>
                In today’s competitive marketplace, your website is frequently the very first impression a potential client or customer will ever have of your organization. An outdated, slow, or poorly structured website immediately drives potential buyers away to your competitors.
              </p>
              <p>
                At <strong>DevByShukla</strong>, we bridge the gap between aesthetic sophistication and commercial function. Whether you are an educational institution requiring streamlined student admissions, a clinic needing seamless appointment scheduling, or an e-commerce shop scaling sales, our websites are custom-built to deliver results.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm font-semibold text-white">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span>Frontend & Full-Stack Capabilities</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span>Google Core Web Vitals Optimized</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span>WhatsApp & CRM Lead Routing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span>100% Code & Asset Ownership</span>
                </div>
              </div>
            </div>

            {/* Visual card */}
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-br from-slate-900 via-[#0b1325] to-[#080e1c] rounded-3xl p-8 border border-slate-700/80 shadow-2xl">
                <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">
                  // THE DEVBYSHUKLA STANDARD
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  What Sets Our Work Apart
                </h3>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">Sub-Second Load Speeds</div>
                      <div className="text-xs text-slate-400 mt-0.5">Optimized bundles & CDN asset caching for maximum conversion.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3">
                    <Search className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">Built-In Technical SEO</div>
                      <div className="text-xs text-slate-400 mt-0.5">Semantic schema, OpenGraph tags, and mobile-friendly architecture.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">Custom Engineering</div>
                      <div className="text-xs text-slate-400 mt-0.5">Built with modern React and TypeScript for effortless scaling.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Me? Section */}
      <section className="py-20 sm:py-28 bg-[#f8fafc] text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full">
              WHY CHOOSE DEVBYSHUKLA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Why Work With Me?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              When you hire DevByShukla, you collaborate directly with Satyam Shukla, an experienced developer committed to your business success, not an aloof corporate agency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whyWorkCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${card.color}`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Bar */}
      <section className="py-16 bg-[#080d1a] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-lg font-bold text-white">
              Modern Technology Stack
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Production-grade technologies chosen for speed, reliability, and security
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 text-center"
              >
                <div className="text-sm font-bold text-white">{tech.name}</div>
                <div className="text-xs text-blue-400 mt-0.5">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to Take Your Business to the Next Level?"
        subtitle="Let's build a fast, high-converting website tailored to your exact industry requirements."
        primaryButtonText="Start Your Project"
        primaryButtonLink="/contact"
      />
    </div>
  );
};
