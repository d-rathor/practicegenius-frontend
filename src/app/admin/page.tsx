import React from 'react';
import MainLayout from '@/components/MainLayout';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminStats from '@/components/admin/AdminStats';
import RecentUsers from '@/components/admin/RecentUsers';
import RecentSubscriptions from '@/components/admin/RecentSubscriptions';
import RecentWorksheets from '@/components/admin/RecentWorksheets';
import FixDuplicateWorksheets from '@/components/admin/FixDuplicateWorksheets';

export default function AdminDashboardPage() {
  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Manage users, worksheets, and subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Stats */}
              <AdminStats />

              {/* Recent Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RecentUsers />
                <RecentSubscriptions />
              </div>

              {/* Recent Worksheets */}
              <RecentWorksheets />

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Link
                    href="/admin/worksheets/new"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                  >
                    <svg className="h-8 w-8 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="font-medium">Add Worksheet</span>
                  </Link>
                  <Link
                    href="/admin/users"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                  >
                    <svg className="h-8 w-8 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="font-medium">Manage Users</span>
                  </Link>
                  <Link
                    href="/admin/subscriptions"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                  >
                    <svg className="h-8 w-8 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="font-medium">Manage Subscriptions</span>
                  </Link>
                </div>
              </div>

              {/* Recent Worksheets */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Worksheets</h2>
                  <Link href="/admin/worksheets" className="text-primary hover:text-primary-dark font-medium">
                    View All
                  </Link>
                </div>
                <RecentWorksheets />
              </div>
              
              {/* Fix Duplicate Worksheets */}
              <div className="mt-6">
                <FixDuplicateWorksheets />
              </div>
            </div>
          </div>
          
          {/* End of admin dashboard content */}
        </div>
      </div>
    </MainLayout>
  );
}
