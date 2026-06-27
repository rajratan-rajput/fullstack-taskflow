import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useTodoContext } from '../context/TodoContext';

export const SortDropdown = () => {
  const { sortBy, setSortBy } = useTodoContext();

  return (
    <div className="relative inline-flex items-center w-full sm:w-auto">
      <ArrowUpDown className="w-4 h-4 absolute left-3.5 pointer-events-none text-theme-secondary" />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        aria-label="Sort tasks"
        className="w-full sm:w-auto pl-9 pr-8 py-2.5 sm:py-2 bg-surface border border-theme rounded-xl sm:rounded-lg text-xs font-semibold text-theme-primary hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 appearance-none shadow-sm cursor-pointer min-h-[40px] sm:min-h-[36px]"
      >
        <option value="latest">Sort: Latest First</option>
        <option value="oldest">Sort: Oldest First</option>
      </select>
    </div>
  );
};
