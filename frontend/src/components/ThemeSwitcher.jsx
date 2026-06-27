import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sun, Feather, Trees, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeSwitcher = () => {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const icons = {
    light: <Sun className="w-4 h-4 text-amber-500" />,
    beige: <Feather className="w-4 h-4 text-amber-700" />,
    forest: <Trees className="w-4 h-4 text-emerald-600" />,
    dark: <Moon className="w-4 h-4 text-sky-400" />,
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-surface border border-theme hover:bg-subtle text-theme-primary transition-all min-h-[40px] shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
        aria-label="Select color theme"
        aria-expanded={isOpen}
      >
        <Palette className="w-4 h-4 shrink-0 text-theme-secondary" />
        <span className="hidden sm:inline">{currentThemeObj.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-surface border border-theme rounded-2xl shadow-xl z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-theme-secondary border-b border-theme-subtle mb-1">
            Color Themes
          </div>
          <div className="space-y-1">
            {themes.map((t) => {
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-subtle text-theme-primary font-bold'
                      : 'text-theme-secondary hover:text-theme-primary hover:bg-subtle/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {icons[t.id]}
                    <div className="text-left">
                      <span className="block leading-tight">{t.name}</span>
                      <span className="text-[10px] text-theme-secondary font-normal block mt-0.5">{t.desc}</span>
                    </div>
                  </div>
                  {isActive && <Check className="w-4 h-4 shrink-0 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
