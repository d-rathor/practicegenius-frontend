"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useWorksheets, Worksheet } from '@/contexts/WorksheetContext';

export default function ViewWorksheetPage() {
  const params = useParams();
  const router = useRouter();
  const { worksheets, deleteWorksheet } = useWorksheets();
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const foundWorksheet = worksheets.find(w => w.id === params.id);
      if (foundWorksheet) {
        setWorksheet(foundWorksheet);
      } else {
        // Worksheet not found, redirect to worksheets list
        router.push('/admin/worksheets');
      }
      setLoading(false);
    }
  }, [params.id, worksheets, router]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get subject display name
  const getSubjectName = (subject: string) => {
    switch (subject) {
      case 'math':
        return 'Mathematics';
      case 'science':
        return 'Science';
      case 'english':
        return 'English';
      default:
        return subject;
    }
  };

  // Get subscription level display name
  const getSubscriptionName = (level: string) => {
    switch (level) {
      case 'free':
        return 'Free';
      case 'essential':
        return 'Essential';
      case 'premium':
        return 'Premium';
      default:
        return level;
    }
  };

  // Get subject badge color
  const getSubjectBadgeColor = (subject: string) => {
    switch (subject) {
      case 'math':
        return 'bg-blue-100 text-blue-800';
      case 'science':
        return 'bg-green-100 text-green-800';
      case 'english':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get subscription level badge color
  const getSubscriptionBadgeColor = (level: string) => {
    switch (level) {
      case 'free':
        return 'bg-gray-100 text-gray-800';
      case 'essential':
        return 'bg-yellow-100 text-yellow-800';
      case 'premium':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle worksheet deletion
  const handleDelete = () => {
    if (worksheet && window.confirm('Are you sure you want to delete this worksheet?')) {
      deleteWorksheet(worksheet.id);
      router.push('/admin/worksheets');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <AdminSidebar />
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-6 flex justify-center items-center">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!worksheet) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <AdminSidebar />
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-center text-gray-600">Worksheet not found.</p>
                <div className="mt-4 text-center">
                  <Link
                    href="/admin/worksheets"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
                  >
                    Back to Worksheets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <AdminSidebar />
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h2 className="text-xl font-semibold mb-4 md:mb-0">View Worksheet</h2>
                  <div className="flex space-x-2">
                    <Link
                      href="/admin/worksheets"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Back to List
                    </Link>
                    <Link
                      href={`/admin/worksheets/${worksheet.id}/edit`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                    >
                      <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Worksheet Details</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Title</p>
                        <p className="mt-1 text-lg font-medium">{worksheet.title}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Topic</p>
                        <p className="mt-1">{worksheet.topic || 'Not specified'}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Subject</p>
                          <span className={`inline-flex mt-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubjectBadgeColor(worksheet.subject)}`}>
                            {getSubjectName(worksheet.subject)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Grade</p>
                          <span className="inline-flex mt-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Grade {worksheet.grade}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Subscription Plan</p>
                          <span className={`inline-flex mt-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionBadgeColor(worksheet.subscriptionLevel)}`}>
                            {getSubscriptionName(worksheet.subscriptionLevel)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Statistics</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Download Count</p>
                        <p className="mt-1 text-lg font-medium">{worksheet.downloadCount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Added On</p>
                        <p className="mt-1">{formatDate(worksheet.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Filename</p>
                        <p className="mt-1 text-sm font-mono bg-gray-50 p-2 rounded">{worksheet.fileName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Worksheet Preview</h3>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center min-h-[300px]">
                    <svg className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-center text-gray-500 mb-4">
                      This is a preview placeholder for the PDF file: <span className="font-medium">{worksheet.fileName}</span>
                    </p>
                    <button
                      onClick={() => alert('In a production environment, this would download the actual PDF file.')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
                    >
                      <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
