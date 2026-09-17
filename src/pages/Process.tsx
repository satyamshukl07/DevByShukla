import React from 'react';
import { 
  Compass, 
  Layers, 
  Palette, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { CtaSection } from '../components/CtaSection';
import { processStepsData } from '../data/process';

export const Process: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Palette': return <Palette className="w-6 h-6" />;
      case 'Code2': return <Code2 className="w-6 h-6" />;
      case 'Rocket': return <Rocket className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      default: return <Code2 className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a]">
      <PageHero
        badge="TRANSPARENT WORKFLOW"
        title="Our 6-Step Development Process"
        highlightText="From Concept to Launch"
        description="A structured, collaborative approach designed to eliminate guesswork, deliver on time, and craft a high-performance website tailored to your business."
        breadcrumb="Process"
      />

      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Timeline representation */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-sky-500 before:to-slate-800">
          {processStepsData.map((step) => (
            <div key={step.stepNumber} className="relative flex items-start gap-6 sm:gap-10">
              
              {/* Step number badge circle */}
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center font-extrabold text-base sm:text-xl shrink-0 shadow-lg shadow-blue-600/30 ring-4 ring-[#080d1a] relative z-10">
                {step.stepNumber}
              </div>

              {/* Step card */}
              <div className="flex-1 bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700 transition duration-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {step.subtitle}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Estimated: {step.duration}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Deliverables checklist */}
                <div className="bg-slate-950/60 rounded-xl p-4 sm:p-5 border border-slate-800/80">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Deliverables & Milestones:
                  </div>
                  <ul className="space-y-2">
                    {step.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaSection
        title="Ready to Begin Step 1?"
        subtitle="Schedule a free discovery session to review your goals, competitor landscape, and timeline."
        primaryButtonText="Start Your Project"
        primaryButtonLink="/contact"
      />
    </div>
  );
};
