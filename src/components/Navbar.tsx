import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Code2, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Process', path: '/process' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080d1a]/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/20 py-3.5'
          : 'bg-[#080d1a]/80 backdrop-blur-sm border-b border-slate-800/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            aria-label="DevByShukla Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 p-0.5 shadow-lg shadow-blue-600/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#0b1120] rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-extrabold tracking-tight text-white">Dev</span>
              <span className="text-xl font-extrabold tracking-tight text-blue-500">ByShukla</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-slate-800/80 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 active:scale-[0.98] transition-all duration-200"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/contact"
              className="sm:hidden px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500"
            >
              Get Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                      : 'text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-800">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
