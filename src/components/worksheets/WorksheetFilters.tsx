"use client";

import React, { useState } from 'react';

const WorksheetFilters: React.FC = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const grades = [1, 2, 3, 4, 5];
  const subjects = ['Math', 'Science', 'English'];
  const subscriptionLevels = ['Free', 'Essential', 'Premium'];

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
                />
                <span className="ml-2">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Sort By</h4>
          <select className="form-input">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>

        {/* Apply/Reset Buttons */}
        <div className="flex space-x-2">
          <button className="btn btn-primary py-2 flex-1">Apply Filters</button>
          <button className="btn btn-outline py-2 flex-1">Reset</button>
        </div>
      </div>
    </>
  );
};

export default WorksheetFilters;
