"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const [currentPlan, setCurrentPlan] = useState('free');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Check user authentication and subscription status on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Check for subscription info
        const subscriptionData = localStorage.getItem('user_subscription');
        if (subscriptionData) {
          const subscription = JSON.parse(subscriptionData);
          if (subscription.plan) {
            setCurrentPlan(subscription.plan.toLowerCase());
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
              setCurrentPlan(session.user.subscriptionPlan.toLowerCase());
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
    console.log(`Subscribing to ${plan} plan`);
    
    // If user is not logged in, redirect to cart with plan
    if (!isLoggedIn) {
      router.push(`/cart?plan=${plan}`);
      return;
    }
    
    // If user is logged in, directly update subscription
    try {
      // Create clean plan name
      const cleanPlanName = plan.toLowerCase();
      
      // Set user_subscription directly
      const subscriptionInfo = {
        plan: cleanPlanName,
        status: 'active',
        startDate: new Date().toISOString()
      };
      localStorage.setItem('user_subscription', JSON.stringify(subscriptionInfo));
      console.log('Set user_subscription directly:', subscriptionInfo);
      
      // Update session if it exists
      const sessionData = localStorage.getItem('practicegenius_session');
      if (sessionData) {
        const sessionObj = JSON.parse(sessionData);
        
        if (sessionObj.user) {
          sessionObj.user.subscriptionPlan = cleanPlanName;
          sessionObj.user.subscriptionDate = new Date().toISOString();
          sessionObj.user.subscriptionStatus = 'active';
          
          localStorage.setItem('practicegenius_session', JSON.stringify(sessionObj));
          console.log('Updated session with new plan:', cleanPlanName);
        }
      }
      
      // Force refresh to update UI
      localStorage.setItem('force_refresh', Date.now().toString());
      
      // Show success message and redirect to worksheets
      alert(`Successfully upgraded to ${plan} plan! You now have access to ${plan === 'premium' ? 'all' : plan} worksheets.`);
      router.push('/worksheets');
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription. Please try again.');
    }
  };

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
      buttonText: isLoggedIn ? 'Current Plan' : 'Get Started',
      planId: 'free',
      highlighted: false,
      disabled: currentPlan === 'free'
    },
    {
      name: 'Essential',
      price: billingCycle === 'monthly' ? '₹499' : '₹4,788',
      period: billingCycle === 'monthly' ? 'per month' : 'per year',
      description: 'Perfect for regular learning needs',
      features: [
        'Access to all Essential worksheets (Grades 1-5)',
        'Unlimited downloads',
        'Monthly new worksheets',
        'Email support',
        'Cancel anytime'
      ],
      limitations: [
        'No access to Premium worksheets',
        'Standard support response time'
      ],
      buttonText: currentPlan === 'essential' ? 'Current Plan' : 'Subscribe Now',
      planId: 'essential',
      highlighted: true,
      disabled: currentPlan === 'essential'
    },
    {
      name: 'Premium',
      price: billingCycle === 'monthly' ? '₹999' : '₹9,588',
      period: billingCycle === 'monthly' ? 'per month' : 'per year',
      description: 'Complete access to all resources',
      features: [
        'Access to ALL worksheets (Grades 1-5)',
        'Unlimited downloads',
        'Priority access to new worksheets',
        'Premium support',
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

        {/* Pricing Toggle (Monthly/Annual) */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 inline-flex shadow-sm">
            <button 
              className={`px-6 py-2 rounded-full ${billingCycle === 'monthly' ? 'bg-primary text-white' : 'text-gray-700'} font-medium`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`px-6 py-2 rounded-full ${billingCycle === 'annual' ? 'bg-primary text-white' : 'text-gray-700'} font-medium`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

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

        {/* CTA Section */}
        <div className="mt-16 text-center bg-primary text-white rounded-xl p-8 md:p-12 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of parents and teachers who trust PracticeGenius for quality educational worksheets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register" 
              className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
            >
              Create Free Account
            </Link>
            <Link 
              href="/contact" 
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingContent;
