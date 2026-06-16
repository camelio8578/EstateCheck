'use client';

import React from 'react';
import { Home } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Home className="w-8 h-8" />
          <h1 className="text-3xl font-bold">EstateCheck</h1>
        </div>
        <p className="text-blue-100 mt-2">Professional Estate Assessment & Reporting</p>
      </div>
    </header>
  );
};
