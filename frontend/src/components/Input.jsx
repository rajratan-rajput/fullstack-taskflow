import React from 'react';

export const Input = ({
  label,
  error,
  id,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-theme-primary tracking-tight">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3.5 py-2.5 bg-surface border rounded-xl text-sm text-theme-primary placeholder:text-theme-secondary/60 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-theme'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};
