import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Render high-fidelity preview visuals matching the reference image projects
  const renderPreviewVisual = () => {
    switch (project.imageType) {
      case 'school':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 p-4 sm:p-5 flex items-center justify-between overflow-hidden">
            {/* Background image overlay */}
            <div 
              className="absolute inset-0 opacity-30 mix-blend-overlay bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80')` }}
            />
            <div className="relative z-10 max-w-[65%] space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Greenwood Academy
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                Learning Today for a <br className="hidden sm:inline" />
                <span className="text-emerald-300">Brighter Tomorrow</span>
              </h4>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded font-medium shadow-xs">
                  Admissions Open
                </span>
                <span className="text-[9px] text-emerald-200 border border-emerald-500/40 px-1.5 py-0.5 rounded">
                  Virtual Tour
                </span>
              </div>
            </div>
            {/* Student avatar photo circle */}
            <div className="relative z-10 w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-emerald-400/80 shadow-lg overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=200&auto=format&fit=crop&q=80" 
                alt="Student learning" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );

      case 'hospital':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-sky-950 via-blue-900 to-slate-900 p-4 sm:p-5 flex items-center justify-between overflow-hidden">
            <div 
              className="absolute inset-0 opacity-25 mix-blend-overlay bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80')` }}
            />
            <div className="relative z-10 max-w-[65%] space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 text-[10px] text-sky-300 font-semibold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400" /> City Care Clinic
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                Your Health <br className="hidden sm:inline" />
                <span className="text-sky-300">Our Priority</span>
              </h4>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[9px] bg-sky-600 text-white px-2 py-0.5 rounded font-medium shadow-xs">
                  Book Doctor
                </span>
                <span className="text-[9px] text-sky-200 border border-sky-500/40 px-1.5 py-0.5 rounded">
                  24/7 Helpline
                </span>
              </div>
            </div>
            {/* Doctor photo circle */}
            <div className="relative z-10 w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-sky-400/80 shadow-lg overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80" 
                alt="Doctor consultation" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );

      case 'restaurant':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-[#1c1208] via-[#2a1708] to-[#120a04] p-4 sm:p-5 flex items-center justify-between overflow-hidden">
            <div 
              className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80')` }}
            />
            <div className="relative z-10 max-w-[65%] space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Tasty Bites
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                Good Food <br className="hidden sm:inline" />
                <span className="text-amber-400">Good Mood</span>
              </h4>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[9px] bg-amber-600 text-white px-2 py-0.5 rounded font-medium shadow-xs">
                  Reserve Table
                </span>
                <span className="text-[9px] text-amber-200 border border-amber-500/40 px-1.5 py-0.5 rounded">
                  View Menu
                </span>
              </div>
            </div>
            {/* Gourmet dish photo circle */}
            <div className="relative z-10 w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-amber-500/80 shadow-lg overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop&q=80" 
                alt="Gourmet dish" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );

      case 'real-estate':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-4 sm:p-5 flex items-center justify-between overflow-hidden">
            <div 
              className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80')` }}
            />
            <div className="relative z-10 max-w-[65%] space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 text-[10px] text-teal-300 font-semibold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400" /> Dream Home
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                Find Your <br className="hidden sm:inline" />
                <span className="text-teal-300">Dream Home</span>
              </h4>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[9px] bg-teal-600 text-white px-2 py-0.5 rounded font-medium shadow-xs">
                  Browse Villas
                </span>
                <span className="text-[9px] text-teal-200 border border-teal-500/40 px-1.5 py-0.5 rounded">
                  Filter Price
                </span>
              </div>
            </div>
            {/* Modern architecture photo */}
            <div className="relative z-10 w-22 sm:w-28 h-18 sm:h-20 rounded-lg border border-teal-400/60 shadow-lg overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=250&auto=format&fit=crop&q=80" 
                alt="Luxury villa" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );

      case 'travel':
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-blue-900 via-sky-800 to-indigo-950 p-4 sm:p-5 flex items-center justify-between overflow-hidden">
            <div 
              className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80')` }}
            />
            <div className="relative z-10 max-w-[65%] space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 text-[10px] text-sky-200 font-semibold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-300" /> Global Escapes
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                Explore <br className="hidden sm:inline" />
                <span className="text-sky-300">The World</span>
              </h4>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded font-medium shadow-xs">
                  Tour Packages
                </span>
                <span className="text-[9px] text-sky-200 border border-sky-400/40 px-1.5 py-0.5 rounded">
                  Get Itinerary
                </span>
              </div>
            </div>
            {/* Landmark photo */}
            <div className="relative z-10 w-22 sm:w-28 h-18 sm:h-20 rounded-lg border border-sky-400/60 shadow-lg overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=250&auto=format&fit=crop&q=80" 
                alt="Tropical travel destination" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );

      case 'ecommerce':
      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 p-4 sm:p-5 flex items-center justify-between overflow-hidden">
            <div 
              className="absolute inset-0 opacity-35 mix-blend-overlay bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80')` }}
            />
            <div className="relative z-10 max-w-[65%] space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 text-[10px] text-purple-300 font-semibold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> StyleUp Store
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                New Style <br className="hidden sm:inline" />
                <span className="text-purple-300">New You</span>
              </h4>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[9px] bg-purple-600 text-white px-2 py-0.5 rounded font-medium shadow-xs">
                  Shop Collection
                </span>
                <span className="text-[9px] text-purple-200 border border-purple-500/40 px-1.5 py-0.5 rounded">
                  Summer Sale
                </span>
              </div>
            </div>
            {/* Fashion model photo */}
            <div className="relative z-10 w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-purple-400/80 shadow-lg overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                alt="Fashion model" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="group rounded-2xl overflow-hidden bg-[#0e1628] border border-slate-800/90 hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 flex flex-col">
      {/* Browser mockup window header */}
      <div className="h-7 bg-[#090e1a] px-3 border-b border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-rose-500/80 transition-colors" />
          <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-amber-500/80 transition-colors" />
          <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-emerald-500/80 transition-colors" />
        </div>
        <div className="text-[10px] text-slate-400 font-mono tracking-tight truncate max-w-[180px]">
          {project.slug}.devbyshukla.preview
        </div>
        <div className="w-6" />
      </div>

      {/* Interactive visual canvas */}
      <Link 
        to={`/portfolio/${project.slug}`}
        className="block relative aspect-[16/9.5] overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]">
          {renderPreviewVisual()}
        </div>

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-blue-600/90 shadow-lg backdrop-blur-xs">
            <span>View Project Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>

      {/* Card footer details matching reference */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-t border-slate-800/60 bg-[#0c1322]">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            {project.name}
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {project.categoryLabel}
          </p>
        </div>

        <Link
          to={`/portfolio/${project.slug}`}
          className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Open details for ${project.name}`}
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
