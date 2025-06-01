"use client";

import React, { Suspense } from 'react';
import MainLayout from '@/components/MainLayout';
import WorksheetFilters from '@/components/worksheets/WorksheetFilters';
import WorksheetGrid from '@/components/worksheets/WorksheetGrid';
import WorksheetSearch from '@/components/worksheets/WorksheetSearch';
import { useWorksheets } from '@/contexts/WorksheetContext';

export default function WorksheetsPage() {
  // Get the worksheets context with the getAdminWorksheets function
  const { getAdminWorksheets } = useWorksheets();
  
  // Get only admin-uploaded worksheets for the public page
  const adminWorksheets = getAdminWorksheets();
  
  // Log for debugging
  console.log('Admin worksheets count:', adminWorksheets?.length || 0);
  
  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Educational <span className="text-primary">Worksheets</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our collection of high-quality worksheets for grades 1-5 in Math, Science, and English.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Showing {adminWorksheets.length} admin-curated worksheets available for download.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
              <Suspense fallback={<div className="p-4 bg-gray-100 rounded-lg">Loading search...</div>}>
                <WorksheetSearch />
              </Suspense>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<div className="p-4 bg-gray-100 rounded-lg">Loading filters...</div>}>
                <WorksheetFilters />
              </Suspense>
            </div>

            {/* Worksheets Grid - Pass only admin worksheets */}
            <div className="lg:col-span-3">
              <Suspense fallback={<div className="p-4 bg-gray-100 rounded-lg">Loading worksheets...</div>}>
                <WorksheetGrid adminWorksheets={adminWorksheets} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
