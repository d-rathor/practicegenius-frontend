"use client";

import React from 'react';
import MainLayout from '@/components/MainLayout';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function SupportPage() {
  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
            <p className="text-gray-600">
              Get help with using PracticeGenius.
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
                <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">How do I download worksheets?</h3>
                    <p className="text-gray-600">
                      Navigate to the "My Worksheets" section in your dashboard. Browse the available worksheets for your subscription plan and click the "Download" button on any worksheet you'd like to use.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">How do I upgrade my subscription?</h3>
                    <p className="text-gray-600">
                      Go to the "Subscription" section in your dashboard. There, you can view the available plans and choose to upgrade to either the Essential or Premium plan.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">What's the difference between the plans?</h3>
                    <p className="text-gray-600">
                      The Free plan gives you limited access to basic worksheets. The Essential plan (₹199/month) provides access to all essential worksheets across all grades and subjects. The Premium plan (₹399/month) gives you full access to all worksheets, including advanced content.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
                <p className="text-gray-600 mb-6">
                  This is a placeholder for the support contact form. In a production environment, 
                  you would be able to submit support requests here.
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="What is your question about?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => alert('This is a demo. In a production environment, this would submit your support request.')}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
