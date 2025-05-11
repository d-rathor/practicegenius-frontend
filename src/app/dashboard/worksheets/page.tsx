"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Worksheet {
  id: string;
  title: string;
  subject: string;
  grade: number;
  plan: 'Free' | 'Essential' | 'Premium';
  thumbnailUrl: string;
  downloadUrl: string;
  description: string;
}

export default function WorksheetsPage() {
  const router = useRouter();
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [userPlan, setUserPlan] = useState<string>('Free');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    subject: 'all',
    grade: 'all',
  });
  
  // Navigation functions
  const navigateToDashboard = () => router.push('/dashboard');
  const navigateToWorksheets = () => router.push('/dashboard/worksheets');
  const navigateToHistory = () => router.push('/dashboard/history');
  const navigateToSubscription = () => router.push('/dashboard/subscription');
  const navigateToPayments = () => router.push('/dashboard/payments');
  const navigateToProfile = () => router.push('/dashboard/profile');
  const navigateToSupport = () => router.push('/dashboard/support');

  // Sample worksheets data - in a real app, this would come from an API
  const sampleWorksheets: Worksheet[] = [
    {
      id: '1',
      title: 'Addition and Subtraction',
      subject: 'Mathematics',
      grade: 1,
      plan: 'Free',
      thumbnailUrl: '/images/worksheets/math-grade1-1.jpg',
      downloadUrl: '/worksheets/math-grade1-addition.pdf',
      description: 'Practice basic addition and subtraction with numbers 1-20.'
    },
    {
      id: '2',
      title: 'Shapes and Patterns',
      subject: 'Mathematics',
      grade: 1,
      plan: 'Free',
      thumbnailUrl: '/images/worksheets/math-grade1-2.jpg',
      downloadUrl: '/worksheets/math-grade1-shapes.pdf',
      description: 'Learn to identify and draw basic shapes and patterns.'
    },
    {
      id: '3',
      title: 'Multiplication Tables (1-5)',
      subject: 'Mathematics',
      grade: 2,
      plan: 'Essential',
      thumbnailUrl: '/images/worksheets/math-grade2-1.jpg',
      downloadUrl: '/worksheets/math-grade2-multiplication.pdf',
      description: 'Practice multiplication tables from 1 to 5.'
    },
    {
      id: '4',
      title: 'Fractions Introduction',
      subject: 'Mathematics',
      grade: 3,
      plan: 'Essential',
      thumbnailUrl: '/images/worksheets/math-grade3-1.jpg',
      downloadUrl: '/worksheets/math-grade3-fractions.pdf',
      description: 'Introduction to basic fractions and their representations.'
    },
    {
      id: '5',
      title: 'Advanced Problem Solving',
      subject: 'Mathematics',
      grade: 5,
      plan: 'Premium',
      thumbnailUrl: '/images/worksheets/math-grade5-1.jpg',
      downloadUrl: '/worksheets/math-grade5-problems.pdf',
      description: 'Complex word problems requiring multiple mathematical operations.'
    },
    {
      id: '6',
      title: 'Plants and Animals',
      subject: 'Science',
      grade: 1,
      plan: 'Free',
      thumbnailUrl: '/images/worksheets/science-grade1-1.jpg',
      downloadUrl: '/worksheets/science-grade1-plants.pdf',
      description: 'Learn about different plants and animals and their basic characteristics.'
    },
    {
      id: '7',
      title: 'Weather and Seasons',
      subject: 'Science',
      grade: 2,
      plan: 'Essential',
      thumbnailUrl: '/images/worksheets/science-grade2-1.jpg',
      downloadUrl: '/worksheets/science-grade2-weather.pdf',
      description: 'Understand different weather patterns and seasons.'
    },
    {
      id: '8',
      title: 'Solar System',
      subject: 'Science',
      grade: 4,
      plan: 'Premium',
      thumbnailUrl: '/images/worksheets/science-grade4-1.jpg',
      downloadUrl: '/worksheets/science-grade4-solarsystem.pdf',
      description: 'Explore the planets and other objects in our solar system.'
    },
    {
      id: '9',
      title: 'Alphabet Practice',
      subject: 'English',
      grade: 1,
      plan: 'Free',
      thumbnailUrl: '/images/worksheets/english-grade1-1.jpg',
      downloadUrl: '/worksheets/english-grade1-alphabet.pdf',
      description: 'Practice writing uppercase and lowercase letters.'
    },
    {
      id: '10',
      title: 'Reading Comprehension',
      subject: 'English',
      grade: 3,
      plan: 'Essential',
      thumbnailUrl: '/images/worksheets/english-grade3-1.jpg',
      downloadUrl: '/worksheets/english-grade3-reading.pdf',
      description: 'Short stories with comprehension questions to improve reading skills.'
    },
    {
      id: '11',
      title: 'Grammar Essentials',
      subject: 'English',
      grade: 4,
      plan: 'Premium',
      thumbnailUrl: '/images/worksheets/english-grade4-1.jpg',
      downloadUrl: '/worksheets/english-grade4-grammar.pdf',
      description: 'Advanced grammar exercises including parts of speech and sentence structure.'
    }
  ];

  // Get user data from session
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
      
      // In a real app, you would fetch worksheets from an API
      // For now, we'll use the sample data and filter it based on the user's plan
      setLoading(false);
    }
  }, []);

  // Filter worksheets based on user's plan and selected filters
  useEffect(() => {
    let filteredWorksheets = [...sampleWorksheets];
    
    // Filter by user's subscription plan
    if (userPlan === 'Free') {
      filteredWorksheets = filteredWorksheets.filter(worksheet => worksheet.plan === 'Free');
    } else if (userPlan === 'Essential') {
      filteredWorksheets = filteredWorksheets.filter(worksheet => 
        worksheet.plan === 'Free' || worksheet.plan === 'Essential'
      );
    } else if (userPlan === 'Premium') {
      // Premium users can access all worksheets
      filteredWorksheets = filteredWorksheets;
    }
    
    // Apply subject filter if not 'all'
    if (filter.subject !== 'all') {
      filteredWorksheets = filteredWorksheets.filter(
        worksheet => worksheet.subject === filter.subject
      );
    }
    
    // Apply grade filter if not 'all'
    if (filter.grade !== 'all') {
      filteredWorksheets = filteredWorksheets.filter(
        worksheet => worksheet.grade === parseInt(filter.grade)
      );
    }
    
    setWorksheets(filteredWorksheets);
  }, [userPlan, filter, sampleWorksheets]);

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get plan badge color
  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'Free':
        return 'bg-gray-100 text-gray-800';
      case 'Essential':
        return 'bg-blue-100 text-blue-800';
      case 'Premium':
        return 'bg-primary-light text-primary-dark';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Worksheets</h1>
            <p className="text-gray-600">
              Browse and download worksheets available in your {userPlan} plan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* User info */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                      <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">User</h3>
                      <p className="text-sm text-gray-600">user@example.com</p>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {userPlan} Plan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                  <ul className="space-y-1">
                    <li>
                      <a 
                        href="/dashboard"
                        className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                      >
                        <span className="mr-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </span>
                        <span>Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/dashboard/worksheets"
                        className="flex items-center px-4 py-3 rounded-lg transition-colors bg-primary text-white"
                      >
                        <span className="mr-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </span>
                        <span>My Worksheets</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/dashboard/history"
                        className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                      >
                        <span className="mr-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </span>
                        <span>Download History</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/dashboard/subscription"
                        className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                      >
                        <span className="mr-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </span>
                        <span>Subscription</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/dashboard/payments"
                        className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                      >
                        <span className="mr-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </span>
                        <span>Payment History</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/dashboard/profile"
                        className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                      >
                        <span className="mr-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        <span>Profile Settings</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/dashboard/support"
                        className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                      >
                        <span className="mr-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <span>Help & Support</span>
                      </a>
                    </li>
                  </ul>
                </nav>

                {/* Logout button */}
                <div className="p-4 border-t border-gray-200">
                  <a 
                    href="/"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.removeItem('practicegenius_session');
                      }
                    }}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-xl font-semibold">Filter Worksheets</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={filter.subject}
                        onChange={handleFilterChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      >
                        <option value="all">All Subjects</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="English">English</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                        Grade
                      </label>
                      <select
                        id="grade"
                        name="grade"
                        value={filter.grade}
                        onChange={handleFilterChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      >
                        <option value="all">All Grades</option>
                        <option value="1">Grade 1</option>
                        <option value="2">Grade 2</option>
                        <option value="3">Grade 3</option>
                        <option value="4">Grade 4</option>
                        <option value="5">Grade 5</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Worksheets Grid */}
              {loading ? (
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <p>Loading worksheets...</p>
                </div>
              ) : worksheets.length > 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {worksheets.map((worksheet) => (
                      <div key={worksheet.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                        {/* Worksheet thumbnail - in a real app, use actual thumbnails */}
                        <div className="h-40 bg-gray-100 relative">
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          
                          {/* Plan badge */}
                          <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${getPlanBadgeColor(worksheet.plan)}`}>
                            {worksheet.plan}
                          </div>
                        </div>
                        
                        <div className="p-4 flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{worksheet.title}</h3>
                          </div>
                          <div className="text-sm text-gray-500 mb-2">
                            {worksheet.subject} | Grade {worksheet.grade}
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            {worksheet.description}
                          </p>
                          <button
                            onClick={() => alert(`This is a demo. In a production environment, this would download the ${worksheet.title} worksheet.`)}
                            className="mt-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <div className="py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No worksheets found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No worksheets match your current filters or subscription plan.
                    </p>
                    {userPlan !== 'Premium' && (
                      <div className="mt-6">
                        <button
                          onClick={() => alert('This is a demo. In a production environment, this would take you to the subscription upgrade page.')}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Upgrade Your Plan
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
