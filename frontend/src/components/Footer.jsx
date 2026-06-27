import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-auto py-8 border-t border-theme text-center text-xs text-theme-secondary">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-semibold text-theme-primary">Built with React • Node.js • Express • MongoDB</p>
        <p className="text-theme-secondary opacity-80">Taskflow © 2026</p>
      </div>
    </footer>
  );
};
