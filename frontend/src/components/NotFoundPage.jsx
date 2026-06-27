import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Button } from './Button';

export const NotFoundPage = ({ message = 'Page Not Found', submessage = 'The page or resource you are looking for does not exist or has been removed.' }) => {
  return (
    <div className="bg-surface rounded-2xl border border-theme p-12 text-center flex flex-col items-center justify-center my-12 shadow-sm max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-subtle text-theme-secondary flex items-center justify-center mb-4">
        <FileQuestion className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h2 className="text-xl font-bold text-theme-primary mb-2">{message}</h2>
      <p className="text-xs text-theme-secondary max-w-xs mx-auto mb-6 leading-relaxed">
        {submessage}
      </p>
      <Link to="/">
        <Button variant="primary">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>
      </Link>
    </div>
  );
};
