"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const WorksheetSearch: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize search query from URL on component mount
  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new URLSearchParams object based on current params
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or remove the query parameter based on search input
    if (searchQuery.trim()) {
      params.set('query', searchQuery.trim());
    } else {
      params.delete('query');
    }
    
    // Navigate to the worksheets page with the updated query
    router.push(`/worksheets?${params.toString()}`);
  };
  
  // Handle popular search term click
  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    
    // Create new URLSearchParams object based on current params
    const params = new URLSearchParams(searchParams.toString());
    params.set('query', term);
    
    // Navigate to the worksheets page with the updated query
    router.push(`/worksheets?${params.toString()}`);
  };
  
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for worksheets by title, subject, or keywords..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button 
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-md px-4 py-1 text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Search
        </button>
      </form>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-sm text-gray-500">Popular searches:</span>
        <button type="button" onClick={() => handlePopularSearch('Addition')} className="text-sm text-primary hover:text-primary-dark">Addition</button>
        <button type="button" onClick={() => handlePopularSearch('Fractions')} className="text-sm text-primary hover:text-primary-dark">Fractions</button>
        <button type="button" onClick={() => handlePopularSearch('Grammar')} className="text-sm text-primary hover:text-primary-dark">Grammar</button>
        <button type="button" onClick={() => handlePopularSearch('Plants')} className="text-sm text-primary hover:text-primary-dark">Plants</button>
        <button type="button" onClick={() => handlePopularSearch('Solar System')} className="text-sm text-primary hover:text-primary-dark">Solar System</button>
      </div>
    </div>
  );
};

export default WorksheetSearch;
