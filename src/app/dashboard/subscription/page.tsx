"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState('free');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // First check for NextAuth session data
      if (session && session.user) {
        console.log('Subscription page - Using NextAuth session:', session.user);
        // @ts-ignore - TypeScript doesn't know about the subscriptionPlan property
        if (session.user.subscriptionPlan) {
          // Extract just the plan name and convert to lowercase
          const planName = session.user.subscriptionPlan.split(' ')[0].toLowerCase();
          console.log('Setting current plan from session:', planName);
          setCurrentPlan(planName);
        }
      } else {
        // Fall back to localStorage session if NextAuth session is not available
        const sessionData = localStorage.getItem('practicegenius_session');
        if (sessionData) {
          const sessionObj = JSON.parse(sessionData);
          if (sessionObj.user && sessionObj.user.subscriptionPlan) {
            console.log('Subscription page - Using localStorage session:', sessionObj.user);
            // Extract just the plan name (Free, Essential, Premium) and convert to lowercase
            const planName = sessionObj.user.subscriptionPlan.split(' ')[0].toLowerCase();
            console.log('Setting current plan from localStorage:', planName);
            setCurrentPlan(planName);
          }
        }
      }
    } catch (error) {
      console.error('Error parsing session data in subscription page:', error);
    }
  }, [session]);

  const handleSubscribe = (plan: string) => {
    router.push(`/pricing?plan=${plan}`);
  };
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
                <h2 className="text-xl font-semibold mb-4">Your Current Subscription</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Free Plan */} 
                  <div className={`border rounded-lg p-6 ${currentPlan === 'free' ? 'border-primary-dark border-2' : 'border-gray-200'}`}>
                    <h3 className="text-lg font-semibold mb-2">Free Plan</h3>
                    <p className="text-gray-600 mb-4">Limited access to worksheets</p>
                    <p className="text-xl font-bold mb-4">₹0<span className="text-sm font-normal text-gray-500">/month</span></p>
                    {currentPlan === 'free' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                        Current Plan
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSubscribe('free')}
                        className="mt-4 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Downgrade to Free
                      </button>
                    )}
                  </div>

                  {/* Essential Plan */} 
                  <div className={`border rounded-lg p-6 ${currentPlan === 'essential' ? 'border-primary-dark border-2' : 'border-gray-200'}`}>
                    <h3 className="text-lg font-semibold mb-2">Essential Plan</h3>
                    <p className="text-gray-600 mb-4">Access to all essential worksheets</p>
                    <p className="text-xl font-bold mb-4">₹499<span className="text-sm font-normal text-gray-500">/month</span></p>
                    {currentPlan === 'essential' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                        Current Plan
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSubscribe('essential')}
                        className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        {currentPlan === 'free' ? 'Upgrade to Essential' : 'Downgrade to Essential'}
                      </button>
                    )}
                  </div>

                  {/* Premium Plan */} 
                  <div className={`border rounded-lg p-6 ${currentPlan === 'premium' ? 'border-primary-dark border-2' : 'border-gray-200'}`}>
                    <h3 className="text-lg font-semibold mb-2">Premium Plan</h3>
                    <p className="text-gray-600 mb-4">Full access to all worksheets</p>
                    <p className="text-xl font-bold mb-4">₹999<span className="text-sm font-normal text-gray-500">/month</span></p>
                    {currentPlan === 'premium' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                        Current Plan
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSubscribe('premium')}
                        className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Upgrade to Premium
                      </button>
                    )}
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
