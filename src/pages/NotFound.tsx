import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Layers } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen pt-36 pb-20 bg-[#080d1a] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-block text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Page Not Found
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          The page you are looking for might have been moved, renamed, or does not exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
          >
            <Layers className="w-4 h-4" />
            <span>View Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
