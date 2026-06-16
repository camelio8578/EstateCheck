'use client';

import React from 'react';
import { Building2, BarChart3, FileText } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Estate Assessment</h2>
          <p className="text-xl text-gray-600">Capture, track, and report on your property with professional tools</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-blue-500">
            <Building2 className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Snapshots</h3>
            <p className="text-gray-600">Create detailed property snapshots in minutes with our intuitive form</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-purple-500">
            <BarChart3 className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600">Track property value trends and condition changes over time</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-green-500">
            <FileText className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reports</h3>
            <p className="text-gray-600">Generate comprehensive reports for documentation and analysis</p>
          </div>
        </div>
      </div>
    </section>
  );
};
