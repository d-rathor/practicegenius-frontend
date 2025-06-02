"use client";

import React, { useState, useEffect } from 'react';

const AdminStats: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalWorksheets, setTotalWorksheets] = useState(0);
  const [activeSubscriptions, setActiveSubscriptions] = useState(0);

  // Function to count all worksheets in localStorage and ensure consistency
  const countAllWorksheets = () => {
    // Check both possible localStorage keys for worksheets
    try {
      // First check the primary key used by the admin dashboard
      const worksheetsData = localStorage.getItem('worksheets');
      // Then check the key used by the WorksheetContext
      const practiceGeniusWorksheets = localStorage.getItem('practicegenius_worksheets');
      
      let worksheets = [];
      let pgWorksheets = [];
      
      // Parse the data from both sources
      if (worksheetsData) {
        worksheets = JSON.parse(worksheetsData);
        console.log(`Found ${worksheets.length} worksheets in 'worksheets' key`);
      }
      
      if (practiceGeniusWorksheets) {
        pgWorksheets = JSON.parse(practiceGeniusWorksheets);
        console.log(`Found ${pgWorksheets.length} worksheets in 'practicegenius_worksheets' key`);
      }
      
      // If the counts don't match, synchronize them
      if (worksheets.length !== pgWorksheets.length && (worksheets.length > 0 || pgWorksheets.length > 0)) {
        console.log('Worksheet counts don\'t match, synchronizing...');
        
        // Use the source with more worksheets
        const sourceToUse = worksheets.length >= pgWorksheets.length ? worksheets : pgWorksheets;
        
        // Save to both keys
        localStorage.setItem('worksheets', JSON.stringify(sourceToUse));
        localStorage.setItem('practicegenius_worksheets', JSON.stringify(sourceToUse));
        
        console.log(`Synchronized ${sourceToUse.length} worksheets to both localStorage keys`);
        return sourceToUse.length;
      }
      
      // Return the count from the primary key
      return worksheets.length;
    } catch (e) {
      console.error('Error parsing worksheets:', e);
      return 0;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get actual data from localStorage
      try {
        // Get users count - combine from all possible sources
        let totalUserCount = 0;
        const userSources = ['admin_users', 'practicegenius_users'];
        
        for (const source of userSources) {
          try {
            const data = localStorage.getItem(source);
            if (data) {
              const users = JSON.parse(data);
              if (Array.isArray(users) && users.length > totalUserCount) {
                totalUserCount = users.length;
              }
            }
          } catch (e) {
            console.error(`Error parsing ${source}:`, e);
          }
        }
        setTotalUsers(totalUserCount);
        console.log('Total users:', totalUserCount);

        // Get worksheets count - directly count all worksheets
        const worksheetCount = countAllWorksheets();
        setTotalWorksheets(worksheetCount);
        console.log('Total worksheets (direct count):', worksheetCount);

        // Get subscriptions count - combine from all possible sources
        let activeSubCount = 0;
        const subscriptionSources = ['admin_subscriptions', 'user_subscription'];
        
        for (const source of subscriptionSources) {
          try {
            const data = localStorage.getItem(source);
            if (data) {
              const subscriptions = JSON.parse(data);
              if (Array.isArray(subscriptions)) {
                // Count active subscriptions
                const active = subscriptions.filter((sub: any) => sub.status === 'active');
                activeSubCount += active.length;
              } else if (subscriptions && subscriptions.status === 'active') {
                // Single subscription object
                activeSubCount += 1;
              }
            }
          } catch (e) {
            console.error(`Error parsing ${source}:`, e);
          }
        }
        setActiveSubscriptions(activeSubCount);
        console.log('Active subscriptions:', activeSubCount);
        
        // Dump all localStorage keys for debugging
        console.log('All localStorage keys:', Object.keys(localStorage));
        
        // Try to directly check worksheets data
        try {
          const worksheetsRaw = localStorage.getItem('worksheets');
          if (worksheetsRaw) {
            console.log('Raw worksheets data:', worksheetsRaw.substring(0, 100) + '...');
            const worksheets = JSON.parse(worksheetsRaw);
            console.log('Parsed worksheets:', worksheets.length, 'items');
          } else {
            console.log('No worksheets data found');
          }
        } catch (e) {
          console.error('Error inspecting worksheets:', e);
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    }
  }, []);

  const stats = [
    {
      name: 'Total Users',
      value: totalUsers.toString(),
      icon: (
        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      change: 'Total registered users',
      trend: 'info'
    },
    {
      name: 'Total Worksheets',
      value: totalWorksheets.toString(),
      icon: (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      change: 'Available worksheets',
      trend: 'info'
    },
    {
      name: 'Active Subscriptions',
      value: activeSubscriptions.toString(),
      icon: (
        <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      change: 'Current active subscriptions',
      trend: 'info'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gray-100 mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.name}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <div className="flex items-center mt-1">
                {stat.trend === 'up' && (
                  <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {stat.trend === 'down' && (
                  <svg className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                <span className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-500' : 
                  stat.trend === 'down' ? 'text-red-500' : 
                  stat.trend === 'info' ? 'text-blue-500' :
                  'text-gray-500'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
