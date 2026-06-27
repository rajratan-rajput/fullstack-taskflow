import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, LayoutGrid } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-theme shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 group rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 p-1 -ml-1"
          aria-label="Taskflow Home Dashboard"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:bg-slate-800 transition-colors">
            <CheckSquare className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-bold text-theme-primary tracking-tight text-base block leading-none">Taskflow</span>
            <span className="text-[10px] uppercase tracking-wider text-theme-secondary font-semibold block mt-1">Organize Your Work</span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <ThemeSwitcher />
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 min-h-[40px] focus:outline-none focus:ring-2 focus:ring-slate-900 ${location.pathname === '/'
                ? 'bg-subtle text-theme-primary font-bold shadow-inner'
                : 'text-theme-secondary hover:text-theme-primary hover:bg-subtle/60'
              }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden xs:inline">Dashboard</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
