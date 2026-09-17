import React from 'react';
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
  ArrowRight
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'ShoppingCart': return <ShoppingCart className="w-6 h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6" />;
      case 'Building': return <Building className="w-6 h-6" />;
      case 'Terminal': return <Terminal className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      default: return <Building2 className="w-6 h-6" />;
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Icon square matching reference */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${service.iconBgColor}`}>
          {getIcon(service.iconName)}
        </div>

        {/* Card Title */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
          {service.shortDesc}
        </p>
      </div>

      {/* Card Action Link */}
      <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
        <Link 
          to="/services" 
          className="inline-flex items-center gap-1.5 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
          aria-label={`Learn more about ${service.title}`}
        >
          <span>View Details & Pricing</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <span className="text-[11px] font-medium text-slate-400">
          {service.turnaround}
        </span>
      </div>
    </div>
  );
};
