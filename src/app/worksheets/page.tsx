import React, { Suspense } from 'react';
import MainLayout from '@/components/MainLayout';
import WorksheetFiltersWrapper from '@/components/worksheets/WorksheetFiltersWrapper';
import WorksheetSearchWrapper from '@/components/worksheets/WorksheetSearchWrapper';
import WorksheetGridClientWrapper from '@/components/worksheets/WorksheetGridClientWrapper';

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
          <div className="mb-8">
              <WorksheetSearchWrapper />
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar - Client Component */}
            <div className="lg:col-span-1">
                <WorksheetFiltersWrapper />
              </div>

            {/* Worksheets Grid - Client Component */}
            <div className="lg:col-span-3">
                <WorksheetGridClientWrapper />
              </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
