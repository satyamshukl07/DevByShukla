import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShoppingCart, 
  GraduationCap, 
  HeartPulse, 
  UtensilsCrossed, 
  Building, 
  Terminal, 
  Sparkles, 
  Code2, 
  Server, 
  Layers, 
  Database,
  ArrowRight,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { CtaSection } from '../components/CtaSection';
import { servicesData } from '../data/services';

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Additional technical services
  const technicalServices = [
    {
      title: 'Frontend Development',
      desc: 'Pixel-perfect UI translation from Figma designs into clean, responsive React & Tailwind code.',
      icon: Code2,
      price: 'From ₹14,999 / $399',
      features: ['Figma to React conversion', 'Accessible WCAG compliance', 'Mobile-first responsiveness', 'Smooth micro-animations']
    },
    {
      title: 'Backend API Development',
      desc: 'Robust Node.js and Express REST APIs with secure token authentication and webhook processing.',
      icon: Server,
      price: 'From ₹19,999 / $499',
      features: ['Express / Node server endpoints', 'JWT & OAuth authentication', 'Rate limiting & input sanitization', 'Webhook receivers']
    },
    {
      title: 'Database Architecture',
      desc: 'Relational PostgreSQL or document database schema design with automated backups and indexing.',
      icon: Database,
      price: 'From ₹12,999 / $349',
      features: ['PostgreSQL & Supabase setup', 'Data modeling & migration scripts', 'Indexed search performance', 'Encrypted sensitive data']
    },
    {
      title: 'Third-Party API Integration',
      desc: 'Connect your website with payment gateways, WhatsApp, CRM systems, and marketing analytics.',
      icon: Layers,
      price: 'From ₹9,999 / $249',
      features: ['Stripe & Razorpay payment flows', 'Direct WhatsApp message hooks', 'HubSpot & Mailchimp sync', 'Google Analytics 4 & Meta Pixel']
    }
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        badge="SERVICES & CAPABILITIES"
        title="Web Solutions Engineered"
        highlightText="for Real Business Growth"
        description="Explore our specialized website development solutions for corporate brands, educational institutions, healthcare providers, hospitality, and custom web applications."
        breadcrumb="Services"
      />

      {/* Main Core Industry Services */}
      <section className="py-20 bg-[#f8fafc] text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Specialized Industry Websites
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Each website is custom engineered with the specific conversion features, booking mechanisms, and design aesthetics required by your industry.
            </p>
          </div>

          <div className="space-y-8">
            {servicesData.map((service, idx) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Title, Icon, Desc */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${service.iconBgColor}`}>
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                          {service.category}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {service.fullDesc}
                    </p>

                    <div className="pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Suitable For:
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                        {service.suitableFor}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Features, Pricing & CTA */}
                  <div className="lg:col-span-5 bg-slate-50/70 rounded-xl p-6 border border-slate-200/70 flex flex-col justify-between h-full space-y-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                        Key Features Included:
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                        {service.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                          Pricing Guidance
                        </div>
                        <div className="text-base font-extrabold text-slate-900">
                          {service.startingPrice}
                        </div>
                      </div>

                      <Link
                        to={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 active:scale-95 transition-all"
                      >
                        <span>Request Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Full-Stack Services */}
      <section className="py-20 bg-[#080d1a] border-t border-slate-800/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
              FULL-STACK ENGINEERING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              Technical Development & Integrations
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400">
              Need custom backend APIs, database connections, or payment processing? We offer modular technical development services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {technicalServices.map((tech) => (
              <div
                key={tech.title}
                className="bg-slate-900/90 rounded-2xl p-7 border border-slate-800 hover:border-slate-700 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/15 text-blue-400 flex items-center justify-center border border-blue-500/20">
                      <tech.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-800/40">
                      {tech.price}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {tech.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                    {tech.desc}
                  </p>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {tech.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <Link
                    to="/contact"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5"
                  >
                    <span>Discuss technical scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Have a Project with Unique Requirements?"
        subtitle="Schedule a free consultation call to discuss your specifications, sitemap, and custom quote."
        primaryButtonText="Request a Free Quote"
        primaryButtonLink="/contact"
      />
    </div>
  );
};
