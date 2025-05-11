"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Worksheet {
  id: string;
  title: string;
  description: string;
  grade: number;
  subject: string;
  subscriptionLevel: 'free' | 'essential' | 'premium';
  thumbnailUrl: string;
  downloadCount: number;
}

const WorksheetGrid: React.FC = () => {
  // Mock data for worksheets
  const worksheets: Worksheet[] = [
    {
      id: '1',
      title: 'Addition and Subtraction',
      description: 'Practice basic addition and subtraction with numbers 1-20.',
      grade: 1,
      subject: 'Math',
      subscriptionLevel: 'free',
      thumbnailUrl: '/images/worksheets/math-grade1-addition.jpg',
      downloadCount: 1250
    },
    {
      id: '2',
      title: 'Identifying Plants',
      description: 'Learn to identify common plants and their parts.',
      grade: 2,
      subject: 'Science',
      subscriptionLevel: 'free',
      thumbnailUrl: '/images/worksheets/science-grade2-plants.jpg',
      downloadCount: 980
    },
    {
      id: '3',
      title: 'Basic Grammar Rules',
      description: 'Practice using nouns, verbs, and adjectives correctly.',
      grade: 3,
      subject: 'English',
      subscriptionLevel: 'essential',
      thumbnailUrl: '/images/worksheets/english-grade3-grammar.jpg',
      downloadCount: 1540
    },
    {
      id: '4',
      title: 'Multiplication Tables',
      description: 'Practice multiplication tables from 1 to 10.',
      grade: 3,
      subject: 'Math',
      subscriptionLevel: 'essential',
      thumbnailUrl: '/images/worksheets/math-grade3-multiplication.jpg',
      downloadCount: 2100
    },
    {
      id: '5',
      title: 'Solar System',
      description: 'Learn about planets, stars, and other celestial bodies.',
      grade: 4,
      subject: 'Science',
      subscriptionLevel: 'premium',
      thumbnailUrl: '/images/worksheets/science-grade4-solar-system.jpg',
      downloadCount: 1820
    },
    {
      id: '6',
      title: 'Creative Writing',
      description: 'Develop creative writing skills with fun prompts and exercises.',
      grade: 5,
      subject: 'English',
      subscriptionLevel: 'premium',
      thumbnailUrl: '/images/worksheets/english-grade5-creative-writing.jpg',
      downloadCount: 1350
    }
  ];

  // Function to get subscription level badge color
  const getSubscriptionBadgeColor = (level: string) => {
    switch (level) {
      case 'free':
        return 'bg-green-100 text-green-800';
      case 'essential':
        return 'bg-blue-100 text-blue-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Results count and view toggle */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Showing {worksheets.length} results</p>
        <div className="flex space-x-2">
          <button className="p-2 bg-white rounded border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="p-2 bg-primary rounded border border-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Worksheets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {worksheets.map((worksheet) => (
          <div key={worksheet.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 relative">
                <Image
                  src={worksheet.thumbnailUrl}
                  alt={worksheet.title}
                  width={400}
                  height={300}
                  className="object-cover"
                />
              </div>
              <div className="absolute top-2 left-2 flex space-x-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                  Grade {worksheet.grade}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                  {worksheet.subject}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSubscriptionBadgeColor(worksheet.subscriptionLevel)}`}>
                  {worksheet.subscriptionLevel.charAt(0).toUpperCase() + worksheet.subscriptionLevel.slice(1)}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{worksheet.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{worksheet.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {worksheet.downloadCount.toLocaleString()} downloads
                </span>
                <Link 
                  href={`/worksheets/${worksheet.id}`} 
                  className="text-primary hover:text-primary-dark font-medium text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="px-4 py-2 rounded-md bg-primary text-white">1</button>
          <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
          <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
          <span className="px-4 py-2 text-gray-600">...</span>
          <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">10</button>
          <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default WorksheetGrid;
