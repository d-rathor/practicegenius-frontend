"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import MainLayout from '@/components/MainLayout';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useWorksheets } from '@/contexts/WorksheetContext';

interface DownloadItem {
  id: string;
  name: string;
  date: string;
  link: string;
  worksheetId: string;
}

export default function DownloadHistoryPage() {
  const { data: session } = useSession();
  const { userDownloads, worksheets, downloadWorksheet } = useWorksheets();
  const [downloadHistory, setDownloadHistory] = useState<DownloadItem[]>([]);
  const [userId, setUserId] = useState<string>('guest');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // First check for NextAuth session data
      if (session && session.user) {
        console.log('History page - Using NextAuth session:', session.user);
        // Use the email as the user ID if no specific ID is available
        const userIdValue = session.user.id || session.user.email || 'guest';
        setUserId(userIdValue);
      } else {
        // Fall back to localStorage session if NextAuth session is not available
        const sessionData = localStorage.getItem('practicegenius_session');
        if (sessionData) {
          const sessionObj = JSON.parse(sessionData);
          if (sessionObj.user) {
            console.log('History page - Using localStorage session:', sessionObj.user);
            // Set user ID
            if (sessionObj.user.id || sessionObj.user.email) {
              setUserId(sessionObj.user.id || sessionObj.user.email);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error parsing session data in history page:', error);
    }
  }, [session]);

  // Process user downloads when userId or userDownloads change
  useEffect(() => {
    if (userId === 'guest' || !userDownloads.length) return;
    
    // Filter downloads for the current user
    const currentUserDownloads = userDownloads.filter(download => download.userId === userId);
    
    // Map to the format needed for display
    const formattedDownloads = currentUserDownloads.map(download => {
      // Find the corresponding worksheet
      const worksheet = worksheets.find(w => w.id === download.worksheetId);
      
      if (!worksheet) return null;
      
      return {
        id: download.worksheetId + '-' + download.downloadedAt,
        worksheetId: download.worksheetId,
        name: worksheet.title,
        date: new Date(download.downloadedAt).toLocaleDateString(),
        link: worksheet.downloadUrl || `/worksheets/${worksheet.fileName}`
      };
    }).filter(Boolean) as DownloadItem[];
    
    // Sort by date (newest first)
    formattedDownloads.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    setDownloadHistory(formattedDownloads);
  }, [userId, userDownloads, worksheets]);

  const handleDownloadAgain = (item: DownloadItem) => {
    // Trigger the download through the context to increment counter
    downloadWorksheet(item.worksheetId, userId);
    
    // Open the download link
    if (typeof window !== 'undefined' && item.link) {
      window.open(item.link, '_blank');
    }
  };
  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Download History</h1>
            <p className="text-gray-600">
              View your worksheet download history.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Downloads</h2>
                {downloadHistory.length === 0 ? (
                  <p className="text-gray-600">No download history found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Worksheet Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date Downloaded
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {downloadHistory.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleDownloadAgain(item)}
                                className="text-primary hover:text-primary-dark"
                              >
                                Download Again
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
