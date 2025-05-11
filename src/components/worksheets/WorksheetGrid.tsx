"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWorksheets } from '@/contexts/WorksheetContext';
import { useSession } from 'next-auth/react';

// Import the Worksheet interface from the context
import { Worksheet } from '@/contexts/WorksheetContext';

// Ensure the Worksheet type includes all required properties
declare module '@/contexts/WorksheetContext' {
  interface Worksheet {
    plan: 'Free' | 'Essential' | 'Premium' | string;
    createdBy?: string;
    isPublic?: boolean;
  }
}

interface WorksheetGridProps {
  adminWorksheets?: Worksheet[];
}

const WorksheetGrid: React.FC<WorksheetGridProps> = ({ adminWorksheets }) => {
  const { worksheets, downloadWorksheet } = useWorksheets();
  const { data: session } = useSession();
  const [userPlan, setUserPlan] = useState<string>('Free');
  
  // Get user's subscription plan from session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const sessionData = localStorage.getItem('practicegenius_session');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          if (session.user && session.user.subscriptionPlan) {
            // Extract just the plan name (Free, Essential, Premium)
            const planName = session.user.subscriptionPlan.split(' ')[0];
            setUserPlan(planName);
          }
        }
      } catch (error) {
        console.error('Error parsing session data:', error);
      }
    }
  }, []);

  // Function to get subscription level badge color
  const getSubscriptionBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
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

  // Filter worksheets based on user's plan
  const getFilteredWorksheets = () => {
    // If adminWorksheets is provided, use only those (these are already filtered by the context)
    // Otherwise use worksheets from the context
    const worksheetsToFilter = adminWorksheets || worksheets;
    
    // Debug log to see what we're working with
    console.log('Filtering worksheets:', { 
      adminProvided: !!adminWorksheets,
      totalCount: worksheetsToFilter?.length || 0,
      adminCount: worksheetsToFilter?.filter(w => w.createdBy === 'admin')?.length || 0
    });
    
    if (!worksheetsToFilter || worksheetsToFilter.length === 0) return [];
    
    // First filter for admin worksheets if we're on the public page (adminWorksheets is provided)
    let filteredByAdmin = worksheetsToFilter;
    if (adminWorksheets) {
      // We're on the public worksheets page, so only show admin worksheets
      filteredByAdmin = worksheetsToFilter.filter(worksheet => 
        worksheet.createdBy === 'admin' && worksheet.isPublic === true
      );
    }
    
    // Then filter based on user's subscription plan
    if (userPlan === 'Free') {
      return filteredByAdmin.filter(worksheet => 
        worksheet.subscriptionLevel?.toLowerCase() === 'free' || 
        worksheet.plan?.toLowerCase() === 'free'
      );
    } else if (userPlan === 'Essential') {
      return filteredByAdmin.filter(worksheet => 
        worksheet.subscriptionLevel?.toLowerCase() === 'free' || 
        worksheet.subscriptionLevel?.toLowerCase() === 'essential' ||
        worksheet.plan?.toLowerCase() === 'free' || 
        worksheet.plan?.toLowerCase() === 'essential'
      );
    } else if (userPlan === 'Premium') {
      // Premium users can access all worksheets
      return filteredByAdmin;
    }
    
    // Default to showing free worksheets only
    return filteredByAdmin.filter(worksheet => 
      worksheet.subscriptionLevel?.toLowerCase() === 'free' ||
      worksheet.plan?.toLowerCase() === 'free'
    );
  };

  // Handle worksheet download
  const handleDownload = (worksheetId: string) => {
    // Get user ID from session
    let userId = 'guest';
    if (session && session.user && session.user.id) {
      userId = session.user.id;
    } else if (typeof window !== 'undefined') {
      try {
        const sessionData = localStorage.getItem('practicegenius_session');
        if (sessionData) {
          const localSession = JSON.parse(sessionData);
          if (localSession.user && localSession.user.id) {
            userId = localSession.user.id;
          }
        }
      } catch (error) {
        console.error('Error parsing session data:', error);
      }
    }
    
    // Record the download
    downloadWorksheet(worksheetId, userId);
    
    // Simulate download (in a real app, this would download the actual file)
    alert('Worksheet downloaded successfully! In a real app, this would download the actual PDF file.');
  };

  // When adminWorksheets is provided, use only those worksheets
  // This ensures the public worksheets page only shows admin-uploaded worksheets
  const worksheetsToDisplay = adminWorksheets || worksheets;
  const filteredWorksheets = getFilteredWorksheets();

  // Log for debugging
  console.log('Admin worksheets provided:', !!adminWorksheets);
  console.log('Number of worksheets to display:', worksheetsToDisplay?.length || 0);
  console.log('Number of filtered worksheets:', filteredWorksheets?.length || 0);

  return (
    <div>
      {/* Results count and view toggle */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Showing {filteredWorksheets.length} results</p>
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
      {filteredWorksheets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorksheets.map((worksheet) => (
            <div key={worksheet.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 relative">
                  {/* Use a placeholder for the image if no thumbnailUrl is available */}
                  <div className="h-40 bg-gray-100 relative flex items-center justify-center text-gray-400">
                    <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
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
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSubscriptionBadgeColor(worksheet.subscriptionLevel || worksheet.plan || 'free')}`}>
                    {(worksheet.subscriptionLevel || worksheet.plan || 'Free').charAt(0).toUpperCase() + (worksheet.subscriptionLevel || worksheet.plan || 'Free').slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{worksheet.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{worksheet.topic || 'Educational worksheet'}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {worksheet.downloadCount?.toLocaleString() || '0'} downloads
                  </span>
                  <button 
                    onClick={() => handleDownload(worksheet.id)}
                    className="text-primary hover:text-primary-dark font-medium text-sm"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No worksheets available</h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no worksheets available for your subscription plan.
          </p>
        </div>
      )}
    </div>
  );
};

export default WorksheetGrid;
