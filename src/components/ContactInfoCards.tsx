import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Linkedin, Github, Instagram, Twitter } from 'lucide-react';

export const ContactInfoCards: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Contact Information
      </h3>

      {/* Email Card */}
      <a
        href="mailto:satyamsuhkla0715@gmail.com"
        className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200"
      >
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Email
          </div>
          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            satyamsuhkla0715@gmail.com
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Direct client responses within 2-4 hours
          </div>
        </div>
      </a>

      {/* WhatsApp Card */}
      <a
        href="https://wa.me/919210042200"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-200"
      >
        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            WhatsApp Direct Chat
          </div>
          <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
            +91 92100 42200
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
            Tap to chat instantly on WhatsApp • Fast reply
          </div>
        </div>
      </a>

      {/* Location Card */}
      <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
        <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Location
          </div>
          <div className="text-sm font-bold text-slate-900">
            India
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Serving businesses & clients across India & Worldwide
          </div>
        </div>
      </div>

      {/* Working Hours Card */}
      <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Working Hours
          </div>
          <div className="text-sm font-bold text-slate-900">
            Mon - Sat : 9:00 AM - 8:00 PM IST
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Flexible for international client timezone calls
          </div>
        </div>
      </div>

      {/* Connect on Social Profiles */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          Connect With Me
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href="https://www.linkedin.com/in/satyam-shukla07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-semibold truncate">LinkedIn</span>
          </a>
          <a
            href="https://github.com/satyamshukl07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-800 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <Github className="w-4 h-4 text-slate-800 shrink-0" />
            <span className="font-semibold truncate">GitHub</span>
          </a>
          <a
            href="https://x.com/SatyamShukl07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 hover:border-sky-500 text-slate-700 hover:text-sky-600 transition-colors"
          >
            <Twitter className="w-4 h-4 text-sky-500 shrink-0" />
            <span className="font-semibold truncate">X (Twitter)</span>
          </a>
          <a
            href="https://www.instagram.com/samratshukla07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 hover:border-pink-500 text-slate-700 hover:text-pink-600 transition-colors"
          >
            <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
            <span className="font-semibold truncate">Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};
