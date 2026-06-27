import React from 'react';

export const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-surface p-4.5 rounded-xl border border-theme shadow-sm animate-pulse flex flex-col justify-between gap-3.5 h-[135px]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-8 h-8 bg-subtle rounded-lg shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2 pt-0.5">
                <div className="h-4 bg-subtle rounded w-3/4" />
                <div className="h-3 bg-subtle rounded w-full" />
                <div className="h-3 bg-subtle rounded w-1/2" />
              </div>
            </div>
            <div className="w-14 h-5 bg-subtle rounded-md shrink-0" />
          </div>
          <div className="flex items-center justify-between pt-2.5 border-t border-theme-subtle">
            <div className="w-24 h-3 bg-subtle rounded" />
            <div className="w-12 h-3 bg-subtle rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
