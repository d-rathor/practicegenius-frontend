"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const SubscriptionInfo: React.FC = () => {
  // Default subscription data
  const [subscription, setSubscription] = useState({
    plan: 'Free',
    status: 'active',
    startDate: new Date().toISOString(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    autoRenew: true,
    price: 0
  });

  // Function to load subscription data
  const loadSubscriptionData = () => {
    if (typeof window !== 'undefined') {
      try {
        // Try to get subscription from localStorage
        const subscriptionData = localStorage.getItem('user_subscription');
        const sessionData = localStorage.getItem('practicegenius_session');
        
        console.log('SubscriptionInfo: Loading subscription data');
        
        if (subscriptionData) {
          // Use data from user_subscription
          const userSubscription = JSON.parse(subscriptionData);
          const planName = userSubscription.plan;
          
          console.log('SubscriptionInfo: Found plan in user_subscription:', planName);
          
          // Set price based on plan
          let price = 0;
          if (planName.toLowerCase().includes('essential')) {
            price = 499;
          } else if (planName.toLowerCase().includes('premium')) {
            price = 999;
          }
          
          setSubscription({
            plan: planName.charAt(0).toUpperCase() + planName.slice(1),
            status: userSubscription.status || 'active',
            startDate: userSubscription.startDate || new Date().toISOString(),
            endDate: userSubscription.endDate || new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
            autoRenew: true,
            price: price
          });
        } else if (sessionData) {
          // Fallback to session data
          const session = JSON.parse(sessionData);
          if (session.user && session.user.subscriptionPlan) {
            const planName = session.user.subscriptionPlan;
            console.log('SubscriptionInfo: Found plan in session:', planName);
            
            // Set price based on plan
            let price = 0;
            if (planName === 'essential') {
              price = 499;
            } else if (planName === 'premium') {
              price = 999;
            }
            
            setSubscription({
              plan: planName.charAt(0).toUpperCase() + planName.slice(1),
              status: 'active',
              startDate: session.user.subscriptionDate || new Date().toISOString(),
              endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
              autoRenew: true,
              price: price
            });
          }
        }
      } catch (error) {
        console.error('Error loading subscription data:', error);
      }
    }
  };

  // Load subscription data on component mount and listen for updates
  useEffect(() => {
    // Load subscription data immediately
    loadSubscriptionData();
    
    // Listen for the custom subscription updated event
    const handleSubscriptionUpdate = (event: CustomEvent) => {
      console.log('SubscriptionInfo: Subscription update event received:', event.detail);
      loadSubscriptionData();
    };
    
    // Listen for storage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'practicegenius_session' || event.key === 'user_subscription') {
        console.log('SubscriptionInfo: Storage changed, updating subscription data');
        loadSubscriptionData();
      }
    };
    
    // Add event listeners
    window.addEventListener('practicegenius_subscription_updated', handleSubscriptionUpdate as EventListener);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('practicegenius_subscription_updated', handleSubscriptionUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
