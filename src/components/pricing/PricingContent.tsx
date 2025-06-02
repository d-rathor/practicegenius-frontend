"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Import syncSubscriptionData from AuthProvider
import { syncSubscriptionData } from '../../providers/AuthProvider';

// Create a simple CheckIcon component instead of using Heroicons
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
      clipRule="evenodd"
    />
  </svg>
);

const PricingContent: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<'free' | 'essential' | 'premium'>('free');
  // Monthly billing cycle only

  // Helper function to determine the effective current plan based on hierarchy
  const getEffectiveCurrentPlan = (plan: string): 'free' | 'essential' | 'premium' => {
    const lowerCasePlan = plan.toLowerCase();
    if (lowerCasePlan === 'premium') return 'premium';
    if (lowerCasePlan === 'essential') return 'essential';
    return 'free';
  };

  // Check user authentication and subscription status on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Check for subscription info
        const subscriptionData = localStorage.getItem('user_subscription');
        if (subscriptionData) {
          const subscription = JSON.parse(subscriptionData);
          if (subscription.plan) {
            setCurrentPlan(getEffectiveCurrentPlan(subscription.plan));
          }
        }
        
        // Check if user is logged in
        const sessionData = localStorage.getItem('practicegenius_session');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          if (session && session.user && new Date(session.expires) > new Date()) {
            setIsLoggedIn(true);
            
            // If no subscription info but user has plan in session
            if (!subscriptionData && session.user.subscriptionPlan) {
              setCurrentPlan(getEffectiveCurrentPlan(session.user.subscriptionPlan));
            }
          }
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    }
  }, []);

  // Handle direct subscription upgrade
  const handleSubscribe = (plan: string) => {
    console.log(`=== SUBSCRIPTION UPGRADE STARTED ===`);
    console.log(`Subscribing to ${plan} plan`);
    
    // If user is not logged in, redirect to cart with plan
    if (!isLoggedIn) {
      router.push(`/cart?plan=${plan}`);
      return;
    }
    
    // If user is logged in, directly update subscription
    try {
      // Create formatted plan name
      const formattedPlanName = plan.charAt(0).toUpperCase() + plan.slice(1) + ' Plan';
      console.log('Formatted plan name:', formattedPlanName);
      
      // Get the current user ID from session
      const sessionData = localStorage.getItem('practicegenius_session');
      if (!sessionData) {
        throw new Error('No session found, cannot update subscription');
      }
      
      const sessionObj = JSON.parse(sessionData);
      if (!sessionObj.user || !sessionObj.user.id) {
        throw new Error('No user found in session, cannot update subscription');
      }
      
      const userId = sessionObj.user.id;
      console.log('Updating subscription for user ID:', userId);
      
      // DIRECT APPROACH: Update all storage locations manually to ensure consistency
      
      // 1. Update user in practicegenius_users array
      const users = JSON.parse(localStorage.getItem('practicegenius_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === userId);
      
      if (userIndex !== -1) {
        users[userIndex].subscriptionPlan = formattedPlanName;
        users[userIndex].subscriptionDate = new Date().toISOString();
        users[userIndex].subscriptionStatus = 'active';
        localStorage.setItem('practicegenius_users', JSON.stringify(users));
        console.log(`DIRECT: Updated user in users array with plan: ${formattedPlanName}`);
      } else {
        console.error('User not found in users array, cannot update subscription plan');
      }
      
      // Get the current pricing from localStorage or use defaults
      let essentialPrice = 499;
      let premiumPrice = 999;
      try {
        const storedPricingData = localStorage.getItem('pricing_data');
        if (storedPricingData) {
          const parsedData = JSON.parse(storedPricingData);
          essentialPrice = parsedData.essential || essentialPrice;
          premiumPrice = parsedData.premium || premiumPrice;
        }
      } catch (error) {
        console.error('Error reading pricing data:', error);
      }
      
      // Create a new subscription record
      const newSubscription = {
        id: `sub_${Date.now()}`,
        userId: userId,
        userName: sessionObj.user.name,
        userEmail: sessionObj.user.email,
        plan: plan.toLowerCase(),
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        status: 'active',
        amount: plan.toLowerCase() === 'premium' ? premiumPrice : essentialPrice
      };
      
      // 2. Update user_subscription in localStorage
      localStorage.setItem('user_subscription', JSON.stringify(newSubscription));
      console.log(`DIRECT: Set user_subscription with plan: ${plan.toLowerCase()}`);
      
      // 3. Update session data
      sessionObj.user.subscriptionPlan = formattedPlanName;
      sessionObj.user.subscriptionDate = new Date().toISOString();
      sessionObj.user.subscriptionStatus = 'active';
      localStorage.setItem('practicegenius_session', JSON.stringify(sessionObj));
      console.log(`DIRECT: Updated session with plan: ${formattedPlanName}`);
      
      // 4. Also use the syncSubscriptionData helper as a backup
      syncSubscriptionData(userId, formattedPlanName);
      
      // 5. Verify all storage locations have been updated
      try {
        const verifyUsers = JSON.parse(localStorage.getItem('practicegenius_users') || '[]');
        const verifyUser = verifyUsers.find((u: any) => u.id === userId);
        const verifySession = JSON.parse(localStorage.getItem('practicegenius_session') || '{}');
        const verifySubscription = JSON.parse(localStorage.getItem('user_subscription') || '{}');
        
        console.log('VERIFICATION AFTER SUBSCRIPTION UPDATE:');
        console.log(`- User in users array: ${verifyUser?.subscriptionPlan || 'Not found'}`);
        console.log(`- User in session: ${verifySession?.user?.subscriptionPlan || 'Not found'}`);
        console.log(`- User subscription: ${verifySubscription?.plan || 'Not found'}`);
      } catch (verifyError) {
        console.error('Error during verification:', verifyError);
      }
      
      // Update the current plan state in the component
      // This ensures the UI reflects the new plan immediately
      setCurrentPlan(plan.toLowerCase() as "free" | "essential" | "premium");
      
      // Force refresh to update UI
      localStorage.setItem('force_refresh', Date.now().toString());
      
      console.log(`=== SUBSCRIPTION UPGRADE COMPLETED ===`);
      
      // Show success message and redirect to worksheets
      alert(`Successfully upgraded to ${plan} plan! You now have access to ${plan === 'premium' ? 'all' : plan} worksheets.`);
      router.push('/worksheets');
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription. Please try again.');
    }
  };

  // State for pricing data
  const [pricingData, setPricingData] = useState({
    essential: 499,
    premium: 999,
    trialDays: 7
  });

  // Load pricing data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedPricingData = localStorage.getItem('pricing_data');
        if (storedPricingData) {
          const parsedData = JSON.parse(storedPricingData);
          setPricingData({
            essential: parsedData.essential || 499,
            premium: parsedData.premium || 999,
            trialDays: parsedData.trialDays || 7
          });
        }
      } catch (error) {
        console.error('Error loading pricing data:', error);
      }
    }
  }, []);

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Basic access to limited worksheets',
      features: [
        'Access to 2 worksheets per grade and subject',
        'Preview all worksheets',
        'Basic support',
        'No credit card required'
      ],
      limitations: [
        'Limited worksheet access',
        'No new worksheet updates',
        'Basic support only'
      ],
      buttonText: currentPlan === 'free' || currentPlan === 'essential' || currentPlan === 'premium' ? 'Included' : 'Get Started',
      planId: 'free',
      highlighted: false,
      disabled: currentPlan === 'free'
    },
    {
      name: 'Essential',
      price: `₹${pricingData.essential}`,
      period: 'per month',
      description: 'Perfect for regular learning needs',
      features: [
        'Access to all Essential worksheets (Grades 1-5)',
        'Unlimited downloads',
        'Monthly new worksheets',
        'Email support',
        `${pricingData.trialDays}-day free trial`,
        'Cancel anytime'
      ],
      limitations: [
        'No access to Premium worksheets',
        'Standard support response time'
      ],
      buttonText: currentPlan === 'essential' || currentPlan === 'premium' ? 'Included' : 'Subscribe Now',
      planId: 'essential',
      highlighted: true,
      disabled: currentPlan === 'essential' || currentPlan === 'premium'
    },
    {
      name: 'Premium',
      price: `₹${pricingData.premium}`,
      period: 'per month',
      description: 'Complete access to all resources',
      features: [
        'Access to ALL worksheets (Grades 1-5)',
        'Unlimited downloads',
        'Priority access to new worksheets',
        'Premium support',
        `${pricingData.trialDays}-day free trial`,
        'Cancel anytime'
      ],
      limitations: [],
      buttonText: currentPlan === 'premium' ? 'Current Plan' : 'Subscribe Now',
      planId: 'premium',
      highlighted: false,
      disabled: currentPlan === 'premium'
    }
  ];

  return (
    <div className="bg-background min-h-screen pt-20">
      <div className="container-custom py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you and your child's educational needs.
            No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Monthly pricing only */}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-xl overflow-hidden transition-all ${
                plan.highlighted 
                  ? 'shadow-xl transform hover:-translate-y-2 border-2 border-primary relative' 
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 inset-x-0 bg-primary text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className={`p-8 bg-white ${plan.highlighted ? 'pt-10' : ''}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckIcon className={`h-5 w-5 ${plan.highlighted ? 'text-primary' : 'text-green-500'} mr-2 mt-0.5 flex-shrink-0`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {plan.limitations.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, i) => (
                        <li key={i} className="flex items-start text-gray-600">
                          <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {plan.planId === 'free' && !isLoggedIn ? (
                  <Link 
                    href="/register" 
                    className={`btn w-full ${
                      plan.highlighted ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                ) : (
                  <button 
                    onClick={() => !plan.disabled && handleSubscribe(plan.planId)}
                    disabled={plan.disabled}
                    className={`btn w-full ${
                      plan.highlighted ? 'btn-primary' : 'btn-outline'
                    } ${plan.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {plan.buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5">
                <h3 className="font-semibold text-lg">Can I switch between plans?</h3>
                <p className="mt-2 text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will take effect immediately.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5">
                <h3 className="font-semibold text-lg">How do I cancel my subscription?</h3>
                <p className="mt-2 text-gray-600">
                  You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5">
                <h3 className="font-semibold text-lg">Do you offer refunds?</h3>
                <p className="mt-2 text-gray-600">
                  We offer a 7-day money-back guarantee if you're not satisfied with your subscription. Contact our support team within 7 days of your purchase to request a refund.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5">
                <h3 className="font-semibold text-lg">Do you offer discounts for schools?</h3>
                <p className="mt-2 text-gray-600">
                  Yes, we offer special pricing for schools and educational institutions. Please contact our sales team for more information about bulk licensing options.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section removed */}
      </div>
    </div>
  );
};

export default PricingContent;
