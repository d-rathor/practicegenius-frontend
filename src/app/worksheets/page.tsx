import React, { Suspense } from 'react';
import MainLayout from '@/components/MainLayout';
import dynamic from 'next/dynamic';

// Dynamically import client components with no SSR
const WorksheetFilters = dynamic(
  () => import('@/components/worksheets/WorksheetFilters'),
  { ssr: false }
);

const WorksheetSearch = dynamic(
  () => import('@/components/worksheets/WorksheetSearch'),
  { ssr: false }
);

const WorksheetGridClient = dynamic(
  () => import('@/components/worksheets/WorksheetGrid'),
  { ssr: false }
);

export default function WorksheetsPage() {
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
          </div>

          {/* Search and Filters - Client Components */}
          <Suspense fallback={<div>Loading search...</div>}>
            <div className="mb-8">
              <WorksheetSearch />
            </div>
          </Suspense>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar - Client Component */}
            <Suspense fallback={<div>Loading filters...</div>}>
              <div className="lg:col-span-1">
                <WorksheetFilters />
              </div>
            </Suspense>

            {/* Worksheets Grid - Client Component */}
            <Suspense fallback={<div>Loading worksheets...</div>}>
              <div className="lg:col-span-3">
                <WorksheetGridClient />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
