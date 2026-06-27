import React from 'react';
import { Search, X } from 'lucide-react';
import { useTodoContext } from '../context/TodoContext';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useTodoContext();

  return (
    <div className="relative flex-1 min-w-[200px]">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-secondary">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-9 pr-8 py-2.5 bg-surface border border-theme rounded-xl text-xs sm:text-sm text-theme-primary placeholder:text-theme-secondary/60 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-sm"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-theme-secondary hover:text-theme-primary"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
