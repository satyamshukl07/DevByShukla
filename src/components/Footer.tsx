import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Heart, CheckCircle2, ArrowRight, Loader2, Mail, Phone, MessageSquare, Linkedin, Github, Instagram, Twitter } from 'lucide-react';
import { subscribeNewsletter } from '../services/contactService';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await subscribeNewsletter(email);
      setStatus('success');
      setMessage(res.message);
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <footer className="bg-[#060a14] border-t border-slate-800/80 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-400 p-0.5 shadow-lg shadow-blue-600/30 flex items-center justify-center">
                <div className="w-full h-full bg-[#0b1120] rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-extrabold tracking-tight text-white">Dev</span>
                <span className="text-xl font-extrabold tracking-tight text-blue-500">ByShukla</span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Modern Websites for Growing Businesses. Clean code, responsive design, and high conversion.
            </p>

            {/* Direct Quick Contact Links */}
            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <a
                href="mailto:satyamsuhkla0715@gmail.com"
                className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>satyamsuhkla0715@gmail.com</span>
              </a>
              <a
                href="https://wa.me/919210042200"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +91 92100 42200</span>
              </a>
            </div>

            {/* Social Media Icons with real user URLs */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { name: 'X (Twitter)', href: 'https://x.com/SatyamShukl07', icon: Twitter },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/satyam-shukla07', icon: Linkedin },
                { name: 'GitHub', href: 'https://github.com/satyamshukl07', icon: Github },
                { name: 'Instagram', href: 'https://www.instagram.com/samratshukla07', icon: Instagram }
              ].map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/60 hover:text-white hover:bg-slate-800 text-slate-400 flex items-center justify-center transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Process', path: '/process' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Business Websites', path: '/services' },
                { name: 'E-commerce Stores', path: '/services' },
                { name: 'School Websites', path: '/services' },
                { name: 'Hospital Websites', path: '/services' },
                { name: 'Hotel & Restaurant', path: '/services' },
                { name: 'Real Estate Websites', path: '/services' },
                { name: 'Custom Development', path: '/services' }
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get tips, updates and offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-1.5"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </div>
              {status === 'success' && (
                <p className="text-[11px] text-emerald-400 leading-tight flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  {message}
                </p>
              )}
              {status === 'error' && (
                <p className="text-[11px] text-rose-400 leading-tight mt-1">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar matching reference */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>© 2026 DevByShukla. All rights reserved.</span>
            <span className="text-slate-700">•</span>
            <Link to="/admin" className="text-slate-600 hover:text-slate-400 transition-colors">
              Admin Portal
            </Link>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for your success.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
