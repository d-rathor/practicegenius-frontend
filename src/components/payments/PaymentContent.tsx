"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentDetails {
  planName: string;
  amount: number;
  currency: string;
  description: string;
}

// Function to check if user is authenticated
const checkUserAuthentication = () => {
  if (typeof window !== 'undefined') {
    try {
      const sessionData = localStorage.getItem('practicegenius_session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        // Check if session is valid and not expired
        if (session && session.user && new Date(session.expires) > new Date()) {
          return { isAuthenticated: true, user: session.user };
        }
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  }
  return { isAuthenticated: false, user: null };
};

const PaymentContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');
  const [userAuth, setUserAuth] = useState({ isAuthenticated: false, user: null });

  useEffect(() => {
    // Check if user is authenticated
    const auth = checkUserAuthentication();
    setUserAuth(auth);
    
    if (!auth.isAuthenticated) {
      router.push('/login?returnUrl=/payments');
      return;
    }

    // Get plan from URL or localStorage
    const planParam = searchParams.get('plan');
    let plan = planParam || '';

    // If no plan in URL, check localStorage for pending checkout
    if (!plan && typeof window !== 'undefined') {
      try {
        const pendingCheckout = localStorage.getItem('pendingCheckout');
        if (pendingCheckout) {
          const checkoutData = JSON.parse(pendingCheckout);
          plan = checkoutData.plan;
        }
      } catch (error) {
        console.error('Error parsing pending checkout data:', error);
      }
    }

    // Set payment details based on plan
    if (plan === 'essential' || plan === 'essential-plan') {
      setPaymentDetails({
        planName: 'Essential Plan',
        amount: 99,
        currency: 'USD',
        description: 'Essential Plan - Annual Subscription'
      });
    } else if (plan === 'premium' || plan === 'premium-plan') {
      setPaymentDetails({
        planName: 'Premium Plan',
        amount: 199,
        currency: 'USD',
        description: 'Premium Plan - Annual Subscription'
      });
    } else {
      // Default to free plan
      setPaymentDetails({
        planName: 'Free Plan',
        amount: 0,
        currency: 'USD',
        description: 'Free Plan'
      });
    }
  }, [searchParams, router]);

  // Handle payment simulation
  const handlePayNow = () => {
    if (!paymentDetails) return;
    
    console.log('Starting payment process for:', paymentDetails.planName);
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Update user's subscription in localStorage
      if (typeof window !== 'undefined') {
        try {
          // Extract clean plan name
          const cleanPlanName = paymentDetails.planName.toLowerCase().replace(' plan', '');
          console.log('Clean plan name:', cleanPlanName);
          
          // First, directly set the user_subscription for immediate access
          const subscriptionInfo = {
            plan: cleanPlanName,
            status: 'active',
            startDate: new Date().toISOString()
          };
          localStorage.setItem('user_subscription', JSON.stringify(subscriptionInfo));
          console.log('Set user_subscription directly:', subscriptionInfo);
          
          // Then update the session if it exists
          const sessionData = localStorage.getItem('practicegenius_session');
          if (sessionData) {
            const sessionObj = JSON.parse(sessionData);
            
            // Update user's subscription plan
            if (sessionObj.user) {
              sessionObj.user.subscriptionPlan = cleanPlanName;
              sessionObj.user.subscriptionDate = new Date().toISOString();
              sessionObj.user.subscriptionStatus = 'active';
              
              // Save updated session
              localStorage.setItem('practicegenius_session', JSON.stringify(sessionObj));
              console.log('Updated existing session with plan:', cleanPlanName);
            }
          } else {
            // Create a mock session if none exists
            const mockUser = {
              id: 'temp-' + Date.now(),
              name: 'Guest User',
              email: 'guest@example.com',
              subscriptionPlan: cleanPlanName,
              subscriptionDate: new Date().toISOString(),
              subscriptionStatus: 'active'
            };
            
            const mockSession = {
              user: mockUser,
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
            };
            
            localStorage.setItem('practicegenius_session', JSON.stringify(mockSession));
            console.log('Created new session with plan:', cleanPlanName);
          }
          
          // Clear pending checkout
          localStorage.removeItem('pendingCheckout');
          
          // Force a reload to ensure all components pick up the new subscription
          window.localStorage.setItem('force_refresh', Date.now().toString());
        } catch (error) {
          console.error('Error updating subscription:', error);
        }
      }
      
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Redirect to dashboard after successful payment
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }, 1500);
  };

  if (!paymentDetails) {
    return <div className="text-center py-12">Loading payment details...</div>;
  }

  if (paymentSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">Thank you for subscribing to the {paymentDetails.planName}.</p>
        <p className="text-gray-600 mb-6">You will be redirected to your dashboard shortly.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Payment Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        
        <div className="mb-6">
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600">Plan</span>
            <span className="font-medium">{paymentDetails.planName}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600">Billing Cycle</span>
            <span className="font-medium">Annual</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600">Amount</span>
            <span className="font-medium">${paymentDetails.amount}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold text-lg">${paymentDetails.amount}</span>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
      </div>
      
      {/* Payment Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Card Number</label>
          <input
            type="text"
            placeholder="4111 1111 1111 1111"
            className="w-full p-3 border rounded-lg"
            disabled={isProcessing}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full p-3 border rounded-lg"
              disabled={isProcessing}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">CVV</label>
            <input
              type="text"
              placeholder="123"
              className="w-full p-3 border rounded-lg"
              disabled={isProcessing}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Name on Card</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full p-3 border rounded-lg"
            disabled={isProcessing}
          />
        </div>
        
        <button
          onClick={handlePayNow}
          disabled={isProcessing}
          className={`w-full py-3 rounded-lg font-medium text-white ${
            isProcessing ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'
          } transition-colors`}
        >
          {isProcessing ? 'Processing...' : `Pay $${paymentDetails.amount}`}
        </button>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>This is a simulated payment for demonstration purposes.</p>
          <p>No actual payment will be processed.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentContent;
