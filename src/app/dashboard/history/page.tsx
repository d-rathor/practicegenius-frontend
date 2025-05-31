"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

interface DownloadItem {
  id: string;
  name: string;
  date: string;
  link: string;
}

export default function DownloadHistoryPage() {
  const [downloadHistory, setDownloadHistory] = useState<DownloadItem[]>([]);

  useEffect(() => {
    // Simulate fetching download history from localStorage or an API
    const storedHistory = localStorage.getItem('download_history');
    if (storedHistory) {
      setDownloadHistory(JSON.parse(storedHistory));
    } else {
      // Mock data if no history is found
      const mockData: DownloadItem[] = [
        {
          id: '1',
          name: 'Algebra Worksheet - Linear Equations',
          date: '2023-10-26',
          link: '/worksheets/algebra-linear-equations.pdf',
        },
        {
          id: '2',
          name: 'Geometry Practice - Triangles',
          date: '2023-10-20',
          link: '/worksheets/geometry-triangles.pdf',
        },
        {
          id: '3',
          name: 'Calculus Review - Derivatives',
          date: '2023-10-15',
          link: '/worksheets/calculus-derivatives.pdf',
        },
      ];
      setDownloadHistory(mockData);
      localStorage.setItem('download_history', JSON.stringify(mockData));
    }
  }, []);

  const handleDownloadAgain = (item: DownloadItem) => {
    alert(`Simulating download of: ${item.name}`);
    // In a real application, you would trigger the actual download here
    // window.open(item.link, '_blank');
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
