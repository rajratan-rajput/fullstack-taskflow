import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toast } from './Toast';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-app text-theme-primary transition-colors duration-300">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
      <Footer />
      <Toast />
    </div>
  );
};
