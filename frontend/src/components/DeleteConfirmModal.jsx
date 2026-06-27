import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface rounded-2xl shadow-2xl border border-theme max-w-sm w-full p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
        </div>
        <h3 className="text-base font-bold text-theme-primary mb-1">Delete Task?</h3>
        <p className="text-xs text-theme-secondary mb-6 leading-relaxed">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={onClose} className="w-full">
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading} className="w-full">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
