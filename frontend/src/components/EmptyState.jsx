import React from 'react';
import { ClipboardList, Plus } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({ onAddClick, isSearchResult = false }) => {
  return (
    <div className="bg-surface rounded-2xl border border-theme p-12 text-center flex flex-col items-center justify-center my-6 shadow-sm">
      <div className="w-16 h-16 rounded-2xl bg-subtle border border-theme-subtle flex items-center justify-center text-theme-secondary mb-4 shadow-inner">
        <ClipboardList className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h3 className="text-base font-bold text-theme-primary mb-1">
        {isSearchResult ? 'No tasks matched your search' : 'No tasks found'}
      </h3>
      <p className="text-xs text-theme-secondary max-w-sm mx-auto mb-6 leading-relaxed">
        {isSearchResult
          ? 'Try adjusting your search query or filter settings to find what you are looking for.'
          : 'Organize your workflow by creating your first task. Keep track of deadlines and priorities easily.'}
      </p>
      {onAddClick && !isSearchResult && (
        <Button variant="primary" onClick={onAddClick}>
          <Plus className="w-4 h-4" />
          <span>Create New Task</span>
        </Button>
      )}
    </div>
  );
};
