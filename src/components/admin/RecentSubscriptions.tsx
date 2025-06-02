"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Subscription {
  id: string;
  userName: string;
  userEmail: string;
  plan: 'essential' | 'premium';
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
  amount: number;
}

const RecentSubscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Only use the primary key for subscriptions
        const subscriptionsData = localStorage.getItem('admin_subscriptions');
        if (subscriptionsData) {
          const allSubscriptions = JSON.parse(subscriptionsData);
          console.log(`RecentSubscriptions: Found ${allSubscriptions.length} subscriptions in admin_subscriptions key`);
          
          // Sort subscriptions by start date (newest first)
          const sortedSubscriptions = [...allSubscriptions].sort((a, b) => {
            const dateA = a.startDate || '';
            const dateB = b.startDate || '';
            return new Date(dateB).getTime() - new Date(dateA).getTime();
          });
          
          // Get only the 5 most recent subscriptions
          const recentSubscriptions = sortedSubscriptions.slice(0, 5);
          
          // Ensure correct types
          const typedSubscriptions = recentSubscriptions.map(sub => ({
            ...sub,
            plan: (['essential', 'premium'].includes(sub.plan?.toLowerCase()) 
              ? sub.plan.toLowerCase() 
              : 'essential') as 'essential' | 'premium',
            status: (['active', 'expired', 'cancelled'].includes(sub.status?.toLowerCase()) 
              ? sub.status.toLowerCase() 
              : 'active') as 'active' | 'expired' | 'cancelled'
          }));
          
          setSubscriptions(typedSubscriptions as Subscription[]);
        } else {
          console.log('RecentSubscriptions: No subscriptions found in admin_subscriptions key');
          // If no subscriptions found in localStorage, create some sample data
          const sampleSubscriptions: Subscription[] = [
            {
              id: '1',
              userName: 'Priya Sharma',
              userEmail: 'priya.sharma@example.com',
              plan: 'premium',
              startDate: '2025-05-01T00:00:00',
              endDate: '2025-06-01T00:00:00',
              status: 'active',
              amount: 399
            },
            {
              id: '2',
              userName: 'Rahul Kumar',
              userEmail: 'rahul.kumar@example.com',
              plan: 'essential',
              startDate: '2025-04-15T00:00:00',
              endDate: '2025-05-15T00:00:00',
              status: 'active',
              amount: 199
            }
          ];
          
          // Save sample data to localStorage for future use
          localStorage.setItem('admin_subscriptions', JSON.stringify(sampleSubscriptions));
          setSubscriptions(sampleSubscriptions);
        }
      } catch (error) {
        console.error('Error fetching recent subscriptions:', error);
      }
    }
  }, []);

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get plan badge color
  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'essential':
        return 'bg-blue-100 text-blue-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Subscriptions</h2>
        <Link href="/admin/subscriptions" className="text-primary hover:text-primary-dark font-medium text-sm">
          View All
        </Link>
      </div>

      {subscriptions.length > 0 ? (
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <div key={subscription.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{subscription.userName}</h3>
                  <p className="text-sm text-gray-600">{subscription.userEmail}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPlanBadgeColor(subscription.plan)}`}>
                    {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(subscription.status)}`}>
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Amount:</span>
                  <span className="ml-1 font-medium">₹{subscription.amount}</span>
                </div>
                <div>
                  <span className="text-gray-500">Start:</span>
                  <span className="ml-1">{formatDate(subscription.startDate)}</span>
                </div>
                <div>
                  <span className="text-gray-500">End:</span>
                  <span className="ml-1">{formatDate(subscription.endDate)}</span>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <Link
                  href={`/admin/subscriptions/${subscription.id}`}
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No subscriptions yet</h3>
          <p className="text-gray-500">
            There are no active subscriptions yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentSubscriptions;
