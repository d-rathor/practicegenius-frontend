"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWorksheets } from '@/contexts/WorksheetContext';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
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

  // Function to filter worksheets based on user's subscription plan and URL parameters
  const getFilteredWorksheets = () => {
    const worksheetsToFilter = adminWorksheets || worksheets;
    
    // Debug log to see what we're working with
    console.log('Filtering worksheets:', { 
      adminProvided: !!adminWorksheets,
      totalCount: worksheetsToFilter?.length || 0,
      adminCount: worksheetsToFilter?.filter(w => w.createdBy === 'admin')?.length || 0,
      userPlan: userPlan
    });
    
    if (!worksheetsToFilter || worksheetsToFilter.length === 0) return [];
    
    // First filter for admin worksheets if we're on the public page (adminWorksheets is provided)
    let filteredByAdmin = worksheetsToFilter;
    if (adminWorksheets) {
      // We're on the public worksheets page, so only show admin worksheets that are public
      filteredByAdmin = worksheetsToFilter.filter(worksheet => 
        worksheet.createdBy === 'admin' && worksheet.isPublic === true
      );
      
      // Log the filtered admin worksheets
      console.log('Admin worksheets after filtering:', filteredByAdmin.length);
      filteredByAdmin.forEach(w => console.log(`Worksheet: ${w.title}, Plan: ${w.plan}, Level: ${w.subscriptionLevel}`));
    }
    
    // Then filter based on user's subscription plan
    let planFiltered = [];
    
    // Log the user's plan for debugging
    console.log('Filtering worksheets for user plan:', userPlan);
    
    if (userPlan.toLowerCase() === 'free') {
      planFiltered = filteredByAdmin.filter(worksheet => {
        const worksheetPlan = worksheet.plan?.toLowerCase() || worksheet.subscriptionLevel?.toLowerCase() || '';
        return worksheetPlan === 'free';
      });
    } else if (userPlan.toLowerCase() === 'essential') {
      planFiltered = filteredByAdmin.filter(worksheet => {
        const worksheetPlan = worksheet.plan?.toLowerCase() || worksheet.subscriptionLevel?.toLowerCase() || '';
        return worksheetPlan === 'free' || worksheetPlan === 'essential';
      });
    } else if (userPlan.toLowerCase() === 'premium') {
      // Premium users can access all worksheets
      planFiltered = filteredByAdmin;
    } else {
      // Default to free plan if no subscription
      planFiltered = filteredByAdmin.filter(worksheet => {
        const worksheetPlan = worksheet.plan?.toLowerCase() || worksheet.subscriptionLevel?.toLowerCase() || '';
        return worksheetPlan === 'free';
      });
    }
    
    // Apply URL query parameter filters
    let result = planFiltered;
    
    // Apply search query filter
    const searchQuery = searchParams.get('query');
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(worksheet => {
        // Search in title
        if (worksheet.title.toLowerCase().includes(query)) return true;
        
        // Search in subject
        if (worksheet.subject.toLowerCase().includes(query)) return true;
        
        // Search in topic
        if (worksheet.topic.toLowerCase().includes(query)) return true;
        
        // Search in grade (e.g., "grade 3")
        if ((`grade ${worksheet.grade}`).toLowerCase().includes(query)) return true;
        
        // Search in subscription level
        const level = worksheet.plan || worksheet.subscriptionLevel || '';
        if (level.toLowerCase().includes(query)) return true;
        
        return false;
      });
      
      console.log(`Search results for "${query}": ${result.length} worksheets found`);
    }
    
    // Filter by grade
    const gradesParam = searchParams.get('grades');
    if (gradesParam) {
      const selectedGrades = gradesParam.split(',').map(Number);
      if (selectedGrades.length > 0) {
        result = result.filter(worksheet => selectedGrades.includes(worksheet.grade));
      }
    }
    
    // Filter by subject
    const subjectsParam = searchParams.get('subjects');
    if (subjectsParam) {
      const selectedSubjects = subjectsParam.split(',');
      if (selectedSubjects.length > 0) {
        result = result.filter(worksheet => {
          // Case-insensitive subject comparison
          const worksheetSubject = worksheet.subject.toLowerCase();
          return selectedSubjects.some(subject => subject.toLowerCase() === worksheetSubject);
        });
      }
    }
    
    // Filter by subscription level
    const levelsParam = searchParams.get('levels');
    if (levelsParam) {
      const selectedLevels = levelsParam.split(',');
      if (selectedLevels.length > 0) {
        result = result.filter(worksheet => {
          const worksheetPlan = worksheet.plan || worksheet.subscriptionLevel || '';
          return selectedLevels.some(level => level === worksheetPlan);
        });
      }
    }
    
    // Sort worksheets
    const sortByParam = searchParams.get('sortBy');
    if (sortByParam) {
      switch (sortByParam) {
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'oldest':
          result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        case 'popular':
          result.sort((a, b) => b.downloadCount - a.downloadCount);
          break;
        case 'alphabetical':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }
    }
    
    // Log the final filtered worksheets
    console.log('Final filtered worksheets after URL params:', result.length);
    
    return result;
  };

  // Handle worksheet download
  const handleDownload = (worksheetId: string) => {
    // Get user ID and plan from session
    let userId = 'guest';
    let userSubscriptionPlan = 'free';
    
    if (session && session.user && session.user.id) {
      userId = session.user.id;
      userSubscriptionPlan = session.user.subscriptionPlan || 'free';
    } else if (typeof window !== 'undefined') {
      try {
        const sessionData = localStorage.getItem('practicegenius_session');
        if (sessionData) {
          const localSession = JSON.parse(sessionData);
          if (localSession.user && localSession.user.id) {
            userId = localSession.user.id;
            userSubscriptionPlan = localSession.user.subscriptionPlan || 'free';
          }
        }
      } catch (error) {
        console.error('Error parsing session data:', error);
      }
    }
    
    // Find the worksheet
    const worksheet = worksheets.find(w => w.id === worksheetId);
    if (!worksheet) {
      alert('Worksheet not found!');
      return;
    }
    
    // Check if user has appropriate subscription for this worksheet
    const worksheetPlan = (worksheet.plan || worksheet.subscriptionLevel || 'free').toLowerCase();
    const userPlanLevel = userSubscriptionPlan.toLowerCase();
    
    console.log('Download attempt:', {
      worksheetTitle: worksheet.title,
      worksheetPlan: worksheetPlan,
      userPlan: userPlanLevel
    });
    
    // Verify user has access to this worksheet
    if (
      (worksheetPlan === 'premium' && userPlanLevel !== 'premium') ||
      (worksheetPlan === 'essential' && userPlanLevel !== 'essential' && userPlanLevel !== 'premium')
    ) {
      alert(`You need a ${worksheetPlan.charAt(0).toUpperCase() + worksheetPlan.slice(1)} subscription to download this worksheet. Please upgrade your plan.`);
      return;
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
