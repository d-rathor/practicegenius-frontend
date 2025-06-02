"use client";

import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  subscriptionPlan: 'free' | 'essential' | 'premium';
  registeredAt: string;
  lastLogin: string;
  status: 'active' | 'inactive' | 'suspended';
  worksheetDownloads: number;
}

const FixUserData: React.FC = () => {
  const resetUserData = () => {
    // Create sample users
    const sampleUsers: User[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        avatarUrl: '/avatars/user1.jpg',
        subscriptionPlan: 'premium',
        registeredAt: '2025-04-15T10:30:00',
        lastLogin: '2025-05-09T08:45:00',
        status: 'active',
        worksheetDownloads: 28
      },
      {
        id: '2',
        name: 'Rahul Kumar',
        email: 'rahul.kumar@example.com',
        avatarUrl: '/avatars/user2.jpg',
        subscriptionPlan: 'essential',
        registeredAt: '2025-04-10T14:20:00',
        lastLogin: '2025-05-08T16:30:00',
        status: 'active',
        worksheetDownloads: 15
      },
      {
        id: '3',
        name: 'Anita Patel',
        email: 'anita.patel@example.com',
        avatarUrl: '/avatars/user3.jpg',
        subscriptionPlan: 'free',
        registeredAt: '2025-04-05T09:45:00',
        lastLogin: '2025-05-07T11:20:00',
        status: 'active',
        worksheetDownloads: 5
      },
      {
        id: '4',
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        avatarUrl: '/avatars/user4.jpg',
        subscriptionPlan: 'premium',
        registeredAt: '2025-04-01T11:15:00',
        lastLogin: '2025-05-09T10:15:00',
        status: 'active',
        worksheetDownloads: 32
      },
      {
        id: '5',
        name: 'Meera Patel',
        email: 'meera.patel@example.com',
        avatarUrl: '/avatars/user5.jpg',
        subscriptionPlan: 'essential',
        registeredAt: '2025-03-25T16:30:00',
        lastLogin: '2025-05-06T09:10:00',
        status: 'inactive',
        worksheetDownloads: 8
      }
    ];
    
    // Clear all localStorage keys that might contain user data
    const allKeys = Object.keys(localStorage);
    console.log('Checking keys for user data:', allKeys);
    
    allKeys.forEach(key => {
      if (key !== 'admin_users' && (key.includes('user') || key.includes('User'))) {
        console.log(`Removing key: ${key}`);
        localStorage.removeItem(key);
      }
    });
    
    // Only use the primary key for users
    localStorage.setItem('admin_users', JSON.stringify(sampleUsers));
    
    console.log('User data reset with 5 sample users');
    
    // Refresh the page to see changes
    window.location.reload();
  };
  
  return (
    <div className="mt-4">
      <button
        onClick={resetUserData}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Fix User Data
      </button>
      <p className="text-sm text-gray-500 mt-1">
        This will reset user data to 5 sample users.
      </p>
    </div>
  );
};

export default FixUserData;
