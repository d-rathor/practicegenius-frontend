"use client";

import React from 'react';
import Link from 'next/link';

const SubscriptionInfo: React.FC = () => {
  // Mock subscription data
  const subscription = {
    plan: 'Essential',
    status: 'active',
    startDate: '2025-04-10T00:00:00',
    endDate: '2025-05-28T23:59:59',
    autoRenew: true,
    price: 199
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate days remaining
  const calculateDaysRemaining = (endDateString: string) => {
    const endDate = new Date(endDateString);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining(subscription.endDate);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-primary p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Your Subscription</h2>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold">{subscription.plan}</span>
            <span className="ml-2 text-white text-opacity-80">Plan</span>
          </div>
          <div className="bg-white text-primary px-3 py-1 rounded-full text-sm font-medium">
            {subscription.status === 'active' ? 'Active' : 'Inactive'}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ 
                width: `${Math.max(0, Math.min(100, 100 - (daysRemaining / 30) * 100))}%` 
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Started: {formatDate(subscription.startDate)}</span>
            <span>Renews: {formatDate(subscription.endDate)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Days Remaining</div>
            <div className="text-2xl font-semibold">{daysRemaining} days</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Monthly Price</div>
            <div className="text-2xl font-semibold">₹{subscription.price}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2 text-sm">Auto-renew is</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              subscription.autoRenew 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {subscription.autoRenew ? 'ON' : 'OFF'}
            </span>
          </div>
          <div className="space-x-2">
            <Link 
              href="/dashboard/subscription" 
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Manage
            </Link>
            <Link 
              href="/pricing" 
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionInfo;
