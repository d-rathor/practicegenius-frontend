"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Define filter state interface
interface FilterState {
  grades: number[];
  subjects: string[];
  subscriptionLevels: string[];
  sortBy: string;
}

const WorksheetFilters: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Available filter options
  const grades = [1, 2, 3, 4, 5];
  const subjects = ['Math', 'Science', 'English'];
  const subscriptionLevels = ['Free', 'Essential', 'Premium'];
  
  // Initialize filter state from URL params or defaults
  const [filters, setFilters] = useState<FilterState>({
    grades: [],
    subjects: [],
    subscriptionLevels: [],
    sortBy: 'newest'
  });
  
  // Load filters from URL on initial render
  useEffect(() => {
    const gradesParam = searchParams.get('grades');
    const subjectsParam = searchParams.get('subjects');
    const levelsParam = searchParams.get('levels');
    const sortByParam = searchParams.get('sortBy');
    
    setFilters({
      grades: gradesParam ? gradesParam.split(',').map(Number) : [],
      subjects: subjectsParam ? subjectsParam.split(',') : [],
      subscriptionLevels: levelsParam ? levelsParam.split(',') : [],
      sortBy: sortByParam || 'newest'
    });
  }, [searchParams]);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
        >
          <span className="font-medium">Filters</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${showMobileFilters ? 'transform rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filters */}
      <div className={`bg-white rounded-lg shadow-sm p-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
        <h3 className="text-lg font-semibold mb-4">Filter Worksheets</h3>

        {/* Grade Filter */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Grade Level</h4>
          <div className="space-y-2">
            {grades.map((grade) => (
              <label key={grade} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-primary rounded"
                  checked={filters.grades.includes(grade)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setFilters(prev => ({
                      ...prev,
                      grades: isChecked 
                        ? [...prev.grades, grade] 
                        : prev.grades.filter(g => g !== grade)
                    }));
                  }}
                />
                <span className="ml-2">Grade {grade}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Subject Filter */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Subject</h4>
          <div className="space-y-2">
            {subjects.map((subject) => (
              <label key={subject} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-primary rounded"
                  checked={filters.subjects.includes(subject)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setFilters(prev => ({
                      ...prev,
                      subjects: isChecked 
                        ? [...prev.subjects, subject] 
                        : prev.subjects.filter(s => s !== subject)
                    }));
                  }}
                />
                <span className="ml-2">{subject}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Subscription Level Filter */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Subscription Level</h4>
          <div className="space-y-2">
            {subscriptionLevels.map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-primary rounded"
                  checked={filters.subscriptionLevels.includes(level)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setFilters(prev => ({
                      ...prev,
                      subscriptionLevels: isChecked 
                        ? [...prev.subscriptionLevels, level] 
                        : prev.subscriptionLevels.filter(l => l !== level)
                    }));
                  }}
                />
                <span className="ml-2">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Sort By</h4>
          <select 
            className="form-input w-full p-2 border rounded"
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>

        {/* Apply/Reset Buttons */}
        <div className="flex space-x-2">
          <button 
            className="btn btn-primary py-2 flex-1"
            onClick={() => {
              // Build query string from filters
              const params = new URLSearchParams();
              
              if (filters.grades.length > 0) {
                params.set('grades', filters.grades.join(','));
              }
              
              if (filters.subjects.length > 0) {
                params.set('subjects', filters.subjects.join(','));
              }
              
              if (filters.subscriptionLevels.length > 0) {
                params.set('levels', filters.subscriptionLevels.join(','));
              }
              
              if (filters.sortBy) {
                params.set('sortBy', filters.sortBy);
              }
              
              // Navigate to the same page with new query params
              router.push(`/worksheets?${params.toString()}`);
            }}
          >
            Apply Filters
          </button>
          <button 
            className="btn btn-outline py-2 flex-1"
            onClick={() => {
              // Reset filters to default
              setFilters({
                grades: [],
                subjects: [],
                subscriptionLevels: [],
                sortBy: 'newest'
              });
              
              // Navigate to the page without query params
              router.push('/worksheets');
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default WorksheetFilters;
