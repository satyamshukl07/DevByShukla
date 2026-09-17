import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Monitor, 
  Globe2, 
  Briefcase, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { HeroMockup } from '../components/HeroMockup';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard } from '../components/ProjectCard';
import { ContactForm } from '../components/ContactForm';
import { ContactInfoCards } from '../components/ContactInfoCards';
import { TestimonialCard } from '../components/TestimonialCard';
import { servicesData } from '../data/services';
import { projectsData } from '../data/projects';
import { testimonialsData } from '../data/testimonials';
import { fetchPublicApprovedReviews } from '../services/adminApi';
import { ReviewItem, TestimonialItem } from '../types';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [approvedReviews, setApprovedReviews] = useState<ReviewItem[]>([]);

  React.useEffect(() => {
    fetchPublicApprovedReviews()
      .then((data) => setApprovedReviews(data))
      .catch((err) => console.warn('Could not fetch home reviews:', err));
  }, []);

  const homeTestimonials: TestimonialItem[] = approvedReviews.length > 0
    ? approvedReviews.slice(0, 3).map((r) => ({
        id: r._id,
        name: r.name,
        role: 'Verified Client',
        company: 'DevByShukla Project',
        avatarUrl: r.photoUrl,
        quote: r.reviewText,
        rating: r.rating,
        projectType: 'Website Development',
        isSample: false,
      }))
    : testimonialsData.slice(0, 3);


  // Filter categories matching the reference
  const categories = [
    'All',
    'School',
    'Hospital',
    'Restaurant',
    'Real Estate',
    'Business',
    'E-commerce'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData.slice(0, 6)
    : projectsData.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (DARK NAVY / BLACK BACKGROUND)                           */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 bg-[#080d1a] overflow-hidden">
        {/* Background radial gradient glow */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography, Features, CTA Buttons & Social Proof */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
              {/* Small Badge matching reference: "WE BUILD YOUR DIGITAL FUTURE" */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900/90 text-slate-300 border border-slate-700/80 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>WE BUILD YOUR DIGITAL FUTURE</span>
              </div>

              {/* Main Heading matching reference */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.12]">
                Modern Websites <br />
                for <span className="text-blue-500">Growing</span> Businesses
              </h1>

              {/* Description matching reference */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                I design and develop fast, responsive and professional websites that help you get more customers, build trust and grow your business.
              </p>

              {/* Feature Indicators matching reference */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-y-3 gap-x-5 text-xs sm:text-sm font-medium text-slate-200">
                {[
                  'Modern Design',
                  'Mobile Responsive',
                  'SEO Friendly',
                  'On-Time Delivery'
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons matching reference */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/35 active:scale-[0.98] transition-all duration-200"
                >
                  Get a Free Quote
                </Link>

                <Link
                  to="/portfolio"
                  className="px-7 py-3.5 rounded-full text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/90 transition-all duration-200"
                >
                  View Portfolio
                </Link>
              </div>

              {/* Social Proof matching reference: Avatars + 100+ Happy Clients */}
              <div className="pt-2 flex items-center gap-4">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#080d1a] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Client avatar"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#080d1a] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Client avatar"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#080d1a] object-cover"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Client avatar"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#080d1a] object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                    alt="Client avatar"
                  />
                </div>

                <div>
                  <div className="text-sm font-extrabold text-white">
                    100+
                  </div>
                  <div className="text-xs text-slate-400">
                    Happy Clients Worldwide
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Mockup (Laptop + Mobile with annotation) */}
            <div className="lg:col-span-6 relative mt-6 lg:mt-0">
              <HeroMockup />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* HERO STATS ROW matching reference: 4 cards at bottom of dark hero         */}
          {/* ========================================================================= */}
          <div className="mt-16 sm:mt-24 pt-10 border-t border-slate-800/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  value: '500+',
                  label: 'Websites Delivered',
                  sub: 'Concept & production builds',
                  icon: Monitor,
                  color: 'text-blue-400',
                  bg: 'bg-blue-600/10 border-blue-500/20'
                },
                {
                  value: '10+',
                  label: 'Countries Served',
                  sub: 'Worldwide business reach',
                  icon: Globe2,
                  color: 'text-sky-400',
                  bg: 'bg-sky-600/10 border-sky-500/20'
                },
                {
                  value: '20+',
                  label: 'Business Types',
                  sub: 'From schools to e-commerce',
                  icon: Briefcase,
                  color: 'text-cyan-400',
                  bg: 'bg-cyan-600/10 border-cyan-500/20'
                },
                {
                  value: '100%',
                  label: 'Client Satisfaction',
                  sub: 'Dedicated quality & code',
                  icon: ShieldCheck,
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-600/10 border-emerald-500/20'
                }
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#0b1222]/90 rounded-2xl p-5 border border-slate-800/80 flex items-center gap-4 hover:border-slate-700 transition duration-200"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SERVICES SECTION (LIGHT / WHITE BACKGROUND)                            */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#f8fafc] text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="OUR SERVICES"
            title="Everything You Need to Build"
            highlightText="Your Online Presence"
            description="From simple business websites to advanced web solutions, I provide complete services to help your business grow online."
            align="center"
            darkTheme={false}
          />

          {/* 8 Service Cards in Grid matching reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Bottom Button matching reference: "Discuss Your Project →" */}
          <div className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/25 active:scale-[0.98] transition-all duration-200"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PORTFOLIO SECTION (DARK NAVY / BLACK BACKGROUND)                       */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#080d1a] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="OUR WORK"
            title="Some of Our Recent Projects"
            description="Here are a few websites we have designed and developed for our clients across different industries."
            align="center"
            darkTheme={true}
          />

          {/* Category Filter Pills matching reference */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Project Preview Cards Grid (3x2) matching reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Bottom Button matching reference: "View All Projects →" */}
          <div className="mt-14 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/25 active:scale-[0.98] transition-all duration-200"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CONTACT SECTION (LIGHT / WHITE BACKGROUND)                             */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 bg-[#f8fafc] text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="GET IN TOUCH"
            title="Let's Build Something Great Together"
            description="Have a project in mind? Feel free to message me. I usually reply within a few hours."
            align="center"
            darkTheme={false}
          />

          {/* 2-Column Contact Layout matching reference */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm simplified={true} />
            </div>

            {/* Right: Contact Information Cards */}
            <div className="lg:col-span-5">
              <ContactInfoCards />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TESTIMONIALS SECTION (LIGHT / WHITE BACKGROUND)                        */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white text-slate-900 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="CLIENT FEEDBACK"
            title="What Clients Say"
            description="Real feedback from people I've worked with."
            align="center"
            darkTheme={false}
          />

          {/* 3 Testimonial cards matching reference */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {homeTestimonials.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/testimonials"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <span>Explore Client Guarantees & Expectations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
