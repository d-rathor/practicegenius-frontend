"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import MainLayout from '@/components/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentDownloads from '@/components/dashboard/RecentDownloads';
import SubscriptionInfo from '@/components/dashboard/SubscriptionInfo';

export default function DashboardPage() {
  const { data: session } = useSession();
  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600">
              {session?.user?.name ? `Welcome ${session.user.name}!` : 'Welcome back!'} Manage your account and access your worksheets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Stats */}
              <DashboardStats />

              {/* Subscription Info */}
              <SubscriptionInfo />

              {/* Recent Downloads */}
              <RecentDownloads />

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Link
                    href="/worksheets"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                  >
                    <svg className="h-8 w-8 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium">Browse Worksheets</span>
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                  >
                    <svg className="h-8 w-8 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Edit Profile</span>
                  </Link>
                  <Link
                    href="/pricing"
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                  >
                    <svg className="h-8 w-8 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="font-medium">Upgrade Plan</span>
                  </Link>
                </div>
              </div>

              {/* Featured Worksheets */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recommended for You</h2>
                  <Link href="/worksheets" className="text-primary hover:text-primary-dark font-medium">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden flex">
                    <div className="w-1/3">
                      <div className="relative h-full">
                        <Image
                          src="/images/worksheets/math-grade3-multiplication.jpg"
                          alt="Multiplication Tables"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-2/3 p-4">
                      <div className="flex justify-between">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Essential
                        </span>
                        <span className="text-xs text-gray-500">Grade 3</span>
                      </div>
                      <h3 className="font-semibold mt-2">Multiplication Tables</h3>
                      <p className="text-sm text-gray-600 mt-1">Practice multiplication tables from 1 to 10.</p>
                      <Link href="/worksheets/4" className="text-primary text-sm font-medium mt-2 inline-block">
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden flex">
                    <div className="w-1/3">
                      <div className="relative h-full">
                        <Image
                          src="/images/worksheets/science-grade4-solar-system.jpg"
                          alt="Solar System"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-2/3 p-4">
                      <div className="flex justify-between">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          Premium
                        </span>
                        <span className="text-xs text-gray-500">Grade 4</span>
                      </div>
                      <h3 className="font-semibold mt-2">Solar System</h3>
                      <p className="text-sm text-gray-600 mt-1">Learn about planets, stars, and other celestial bodies.</p>
                      <Link href="/worksheets/5" className="text-primary text-sm font-medium mt-2 inline-block">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
