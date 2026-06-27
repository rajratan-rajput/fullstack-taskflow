import React from 'react';

export const PriorityBadge = ({ priority }) => {
  const styles = {
    Low: 'bg-slate-100 text-slate-600 border-slate-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    High: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <span
      className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border inline-flex items-center gap-1 ${
        styles[priority] || styles.Medium
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${
        priority === 'High' ? 'bg-red-500' : priority === 'Medium' ? 'bg-amber-500' : 'bg-slate-400'
      }`} />
      {priority}
    </span>
  );
};
