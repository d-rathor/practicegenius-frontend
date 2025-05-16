"use client";

import React, { useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import WorksheetFilters from '@/components/worksheets/WorksheetFilters';
import WorksheetGrid from '@/components/worksheets/WorksheetGrid';
import WorksheetSearch from '@/components/worksheets/WorksheetSearch';
import { useWorksheets } from '@/contexts/WorksheetContext';

export default function WorksheetsPage() {
  // Get worksheets from context
  const { worksheets, getAdminWorksheets } = useWorksheets();
  
  // Log worksheets for debugging
  useEffect(() => {
    console.log('Total worksheets in context:', worksheets.length);
    console.log('Admin worksheets:', getAdminWorksheets().length);
    console.log('Admin worksheet details:', getAdminWorksheets().map(w => ({
      title: w.title,
      plan: w.plan || w.subscriptionLevel,
      createdBy: w.createdBy,
      isPublic: w.isPublic
    })));
  }, [worksheets, getAdminWorksheets]);
  
  // Get admin worksheets to display on public page
  const adminWorksheets = getAdminWorksheets();
  
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

          {/* Search and Filters */}
          <div className="mb-8">
            <WorksheetSearch />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <WorksheetFilters />
            </div>

            {/* Worksheets Grid */}
            <div className="lg:col-span-3">
              <WorksheetGrid adminWorksheets={adminWorksheets} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
