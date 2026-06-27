import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const ErrorComponent = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50/60 border border-red-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center my-6">
      <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-red-900 mb-1">Connection Error</h3>
      <p className="text-xs text-red-700 max-w-md mx-auto mb-4 leading-relaxed">
        {message || 'Failed to communicate with backend service. Ensure MongoDB and Express server are running.'}
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </Button>
      )}
    </div>
  );
};
