"use client";

import React from 'react';
import MainLayout from '@/components/MainLayout';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function SubscriptionPage() {
  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Subscription</h1>
            <p className="text-gray-600">
              Manage your subscription plan.
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
                <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
                <p className="text-gray-600 mb-6">
                  This is a placeholder for the subscription management page. In a production environment, 
                  this would display your current plan details and options to upgrade or change your subscription.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Free Plan</h3>
                    <p className="text-gray-600 mb-4">Limited access to worksheets</p>
                    <p className="text-xl font-bold mb-4">₹0<span className="text-sm font-normal text-gray-500">/month</span></p>
                  </div>
                  <div className="border-2 border-primary rounded-lg p-6 relative">
                    <div className="absolute top-0 inset-x-0 bg-primary text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                    <h3 className="text-lg font-semibold mb-2 mt-4">Essential Plan</h3>
                    <p className="text-gray-600 mb-4">Access to all essential worksheets</p>
                    <p className="text-xl font-bold mb-4">₹499<span className="text-sm font-normal text-gray-500">/month</span></p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">Premium Plan</h3>
                    <p className="text-gray-600 mb-4">Full access to all worksheets</p>
                    <p className="text-xl font-bold mb-4">₹999<span className="text-sm font-normal text-gray-500">/month</span></p>
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
