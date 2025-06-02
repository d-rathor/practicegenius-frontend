"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Worksheet {
  id: string;
  title: string;
  grade: string;
  subject: string;
  plan: string;
  downloads: number;
  dateAdded: string;
}

const RecentWorksheets: React.FC = () => {
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Check multiple possible localStorage keys for worksheets
        const possibleKeys = ['worksheets', 'admin_worksheets', 'practicegenius_worksheets'];
        let allWorksheets: any[] = [];
        
        // Log all localStorage keys for debugging
        console.log('All localStorage keys:', Object.keys(localStorage));
        
        // Try to get worksheets from all possible keys
        for (const key of possibleKeys) {
          const data = localStorage.getItem(key);
          if (data) {
            try {
              const parsedData = JSON.parse(data);
              if (Array.isArray(parsedData) && parsedData.length > 0) {
                console.log(`Found ${parsedData.length} worksheets in ${key}`);  
                allWorksheets = [...allWorksheets, ...parsedData];
              }
            } catch (e) {
              console.error(`Error parsing ${key}:`, e);
            }
          }
        }
        
        if (allWorksheets.length > 0) {
          // Sort worksheets by date added (newest first)
          const sortedWorksheets = [...allWorksheets].sort((a, b) => {
            return new Date(b.dateAdded || b.createdAt || '').getTime() - 
                   new Date(a.dateAdded || a.createdAt || '').getTime();
          });
          
          // Get only the 5 most recent worksheets
          const recentWorksheets = sortedWorksheets.slice(0, 5).map(worksheet => ({
            id: worksheet.id || String(Math.random()).substring(2, 8),
            title: worksheet.title || 'Untitled Worksheet',
            grade: worksheet.grade || 'Not specified',
            subject: worksheet.subject || 'General',
            plan: worksheet.plan || worksheet.subscriptionLevel || 'free',
            downloads: worksheet.downloads || 0,
            dateAdded: worksheet.dateAdded || worksheet.createdAt || new Date().toISOString()
          }));
          
          console.log('Recent worksheets:', recentWorksheets);
          setWorksheets(recentWorksheets);
        } else {
          console.log('No worksheets found in localStorage, using sample data');
          // If no worksheets found in localStorage, create some sample data
          const sampleWorksheets: Worksheet[] = [
            {
              id: '1',
              title: 'Addition and Subtraction',
              grade: 'Grade 1',
              subject: 'Math',
              plan: 'free',
              downloads: 1250,
              dateAdded: '2025-05-01T00:00:00'
            },
            {
              id: '2',
              title: 'Solar System',
              grade: 'Grade 4',
              subject: 'Science',
              plan: 'premium',
              downloads: 1820,
              dateAdded: '2025-05-05T00:00:00'
            }
          ];
          
          // Save sample data to localStorage for future use
          localStorage.setItem('worksheets', JSON.stringify(sampleWorksheets));
          setWorksheets(sampleWorksheets);
        }
      } catch (error) {
        console.error('Error fetching recent worksheets:', error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Function to get plan badge color
  const getPlanBadgeColor = (plan: string) => {
    const planLower = plan.toLowerCase();
    if (planLower.includes('premium')) {
      return 'bg-purple-100 text-purple-800';
    } else if (planLower.includes('essential')) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-green-100 text-green-800';
    }
  };

  // Function to format plan name
  const formatPlanName = (plan: string) => {
    const planLower = plan.toLowerCase();
    if (planLower.includes('premium')) {
      return 'Premium';
    } else if (planLower.includes('essential')) {
      return 'Essential';
    } else {
      return 'Free';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-2 text-gray-600">Loading worksheets...</p>
      </div>
    );
  }

  if (worksheets.length === 0) {
    return (
      <div className="text-center py-8">
        <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No worksheets yet</h3>
        <p className="text-gray-500">
          There are no worksheets available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grade/Subject
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Downloads
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Added
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {worksheets.map((worksheet, index) => (
            <tr key={`${worksheet.id}-${index}`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{worksheet.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{worksheet.grade} / {worksheet.subject}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPlanBadgeColor(worksheet.plan)}`}>
                  {formatPlanName(worksheet.plan)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {worksheet.downloads.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(worksheet.dateAdded)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link href={`/admin/worksheets/${worksheet.id}/edit`} className="text-primary hover:text-primary-dark mr-3">
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentWorksheets;
