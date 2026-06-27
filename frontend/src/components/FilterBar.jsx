import React from 'react';
import { useTodoContext } from '../context/TodoContext';

export const FilterBar = () => {
  const { statusFilter, setStatusFilter } = useTodoContext();

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex w-full sm:w-auto bg-subtle p-1 rounded-xl border border-theme-subtle shadow-inner">
      {tabs.map((tab) => {
        const isActive = statusFilter === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatusFilter(tab.id)}
            className={`flex-1 sm:flex-initial px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[38px] sm:min-h-[34px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-900 ${
              isActive
                ? 'bg-surface text-theme-primary shadow-sm font-bold'
                : 'text-theme-secondary hover:text-theme-primary'
            }`}
            aria-label={`Filter tasks by ${tab.label}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
