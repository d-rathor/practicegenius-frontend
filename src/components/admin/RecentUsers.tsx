"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  subscriptionPlan: 'free' | 'essential' | 'premium';
  registeredAt: string;
}

const RecentUsers: React.FC = () => {
  // Mock data for recent users
  const users: User[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      avatarUrl: '/avatars/user1.jpg',
      subscriptionPlan: 'premium',
      registeredAt: '2025-05-08T14:30:00'
    },
    {
      id: '2',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@example.com',
      avatarUrl: '/avatars/user2.jpg',
      subscriptionPlan: 'essential',
      registeredAt: '2025-05-07T09:15:00'
    },
    {
      id: '3',
      name: 'Anita Patel',
      email: 'anita.patel@example.com',
      avatarUrl: '/avatars/user3.jpg',
      subscriptionPlan: 'free',
      registeredAt: '2025-05-05T16:45:00'
    },
    {
      id: '4',
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      avatarUrl: '/avatars/user4.jpg',
      subscriptionPlan: 'premium',
      registeredAt: '2025-05-04T11:20:00'
    }
  ];

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Function to get subscription badge color
  const getSubscriptionBadgeColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-100 text-gray-800';
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
        <h2 className="text-xl font-semibold">Recent Users</h2>
        <Link href="/admin/users" className="text-primary hover:text-primary-dark font-medium text-sm">
          View All
        </Link>
      </div>

      {users.length > 0 ? (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="ml-3 flex-grow">
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSubscriptionBadgeColor(user.subscriptionPlan)}`}>
                  {user.subscriptionPlan.charAt(0).toUpperCase() + user.subscriptionPlan.slice(1)}
                </span>
                <span className="text-xs text-gray-500 mt-1">{formatDate(user.registeredAt)}</span>
              </div>
              <Link
                href={`/admin/users/${user.id}`}
                className="ml-4 p-2 text-gray-500 hover:text-primary"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No users yet</h3>
          <p className="text-gray-500">
            There are no registered users yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentUsers;
