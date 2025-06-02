"use client";

import React from 'react';

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

const FixSubscriptionData: React.FC = () => {
  const resetSubscriptionData = () => {
    
    // Get user data to match subscriptions with actual users
    let users: any[] = [];
    try {
      const userData = localStorage.getItem('admin_users');
      if (userData) {
        users = JSON.parse(userData);
      }
    } catch (e) {
      console.error('Error parsing user data:', e);
    }
    
    // If no users found, we can't create matching subscriptions
    if (users.length === 0) {
      alert('Please fix user data first before fixing subscription data');
      return;
    }
    
    // Create sample subscriptions matching the users
    const sampleSubscriptions: Subscription[] = [
      {
        id: '1',
        userName: users[0]?.name || 'Priya Sharma',
        userEmail: users[0]?.email || 'priya.sharma@example.com',
        plan: 'premium',
        startDate: '2025-05-01T10:00:00',
        endDate: '2025-06-01T10:00:00',
        status: 'active',
        amount: 399
      },
      {
        id: '2',
        userName: users[1]?.name || 'Rahul Kumar',
        userEmail: users[1]?.email || 'rahul.kumar@example.com',
        plan: 'essential',
        startDate: '2025-04-15T14:30:00',
        endDate: '2025-05-15T14:30:00',
        status: 'active',
        amount: 199
      },
      {
        id: '3',
        userName: users[2]?.name || 'Anita Patel',
        userEmail: users[2]?.email || 'anita.patel@example.com',
        plan: 'premium',
        startDate: '2025-04-10T09:15:00',
        endDate: '2025-05-10T09:15:00',
        status: 'expired',
        amount: 399
      },
      {
        id: '4',
        userName: users[3]?.name || 'Vikram Singh',
        userEmail: users[3]?.email || 'vikram.singh@example.com',
        plan: 'premium',
        startDate: '2025-04-05T11:45:00',
        endDate: '2025-05-05T11:45:00',
        status: 'active',
        amount: 399
      },
      {
        id: '5',
        userName: users[4]?.name || 'Meera Patel',
        userEmail: users[4]?.email || 'meera.patel@example.com',
        plan: 'essential',
        startDate: '2025-03-20T16:00:00',
        endDate: '2025-04-20T16:00:00',
        status: 'cancelled',
        amount: 199
      }
    ];
    
    // Clear all localStorage keys that might contain subscription data
    const allKeys = Object.keys(localStorage);
    console.log('Checking keys for subscription data:', allKeys);
    
    allKeys.forEach(key => {
      if (key !== 'admin_subscriptions' && key !== 'pricing_data' && key !== 'admin_subscription_settings' && 
          (key.includes('subscription') || key.includes('Subscription') || key.toLowerCase().includes('pricing'))) {
        console.log(`Removing key: ${key}`);
        localStorage.removeItem(key);
      }
    });
    
    // Only use the primary key for subscriptions
    localStorage.setItem('admin_subscriptions', JSON.stringify(sampleSubscriptions));
    
    // Also create pricing data
    const pricingData = {
      essential: {
        monthly: 199,
        yearly: 1990,
        features: [
          'Access to 100+ worksheets',
          'Download up to 20 worksheets per month',
          'Basic analytics'
        ]
      },
      premium: {
        monthly: 399,
        yearly: 3990,
        features: [
          'Access to all worksheets',
          'Unlimited downloads',
          'Advanced analytics',
          'Priority support',
          'Custom worksheet requests'
        ]
      }
    };
    
    localStorage.setItem('pricing_data', JSON.stringify(pricingData));
    localStorage.setItem('admin_subscription_settings', JSON.stringify(pricingData));
    
    console.log('Subscription data reset with 5 sample subscriptions');
    console.log('Pricing data reset');
    
    // Refresh the page to see changes
    window.location.reload();
  };
  
  return (
    <div className="mt-4">
      <button
        onClick={resetSubscriptionData}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Fix Subscription Data
      </button>
      <p className="text-sm text-gray-500 mt-1">
        This will reset subscription data to match the current users.
      </p>
    </div>
  );
};

export default FixSubscriptionData;
