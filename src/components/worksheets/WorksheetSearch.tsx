"use client";

import React from 'react';

const WorksheetSearch: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for worksheets by title, subject, or keywords..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-md px-4 py-1 text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-sm text-gray-500">Popular searches:</span>
        <button className="text-sm text-primary hover:text-primary-dark">Addition</button>
        <button className="text-sm text-primary hover:text-primary-dark">Fractions</button>
        <button className="text-sm text-primary hover:text-primary-dark">Grammar</button>
        <button className="text-sm text-primary hover:text-primary-dark">Plants</button>
        <button className="text-sm text-primary hover:text-primary-dark">Solar System</button>
      </div>
    </div>
  );
};

export default WorksheetSearch;
