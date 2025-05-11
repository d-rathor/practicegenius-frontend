"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Download {
  id: string;
  title: string;
  subject: string;
  grade: number;
  thumbnailUrl: string;
  downloadedAt: string;
}

const RecentDownloads: React.FC = () => {
  // Mock data for recent downloads
  const downloads: Download[] = [
    {
      id: '1',
      title: 'Addition and Subtraction',
      subject: 'Math',
      grade: 1,
      thumbnailUrl: '/images/worksheets/math-grade1-addition.jpg',
      downloadedAt: '2025-05-08T14:30:00'
    },
    {
      id: '3',
      title: 'Basic Grammar Rules',
      subject: 'English',
      grade: 3,
      thumbnailUrl: '/images/worksheets/english-grade3-grammar.jpg',
      downloadedAt: '2025-05-07T09:15:00'
    },
    {
      id: '5',
      title: 'Solar System',
      subject: 'Science',
      grade: 4,
      thumbnailUrl: '/images/worksheets/science-grade4-solar-system.jpg',
      downloadedAt: '2025-05-05T16:45:00'
    }
  ];

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Downloads</h2>
        <Link href="/dashboard/history" className="text-primary hover:text-primary-dark font-medium text-sm">
          View All
        </Link>
      </div>

      {downloads.length > 0 ? (
        <div className="space-y-4">
          {downloads.map((download) => (
            <div key={download.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 relative flex-shrink-0">
                <Image
                  src={download.thumbnailUrl}
                  alt={download.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-medium">{download.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <span className="mr-3">{download.subject}</span>
                  <span>Grade {download.grade}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block mb-1">Downloaded</span>
                <span className="text-sm">{formatDate(download.downloadedAt)}</span>
              </div>
              <Link
                href={`/worksheets/${download.id}`}
                className="ml-4 p-2 text-gray-500 hover:text-primary"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
              <a
                href="#"
                className="ml-2 p-2 text-gray-500 hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  // Download logic would go here
                  alert(`Re-downloading ${download.title}`);
                }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No downloads yet</h3>
          <p className="text-gray-500">
            You haven't downloaded any worksheets yet.
          </p>
          <Link href="/worksheets" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark">
            Browse Worksheets
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentDownloads;
