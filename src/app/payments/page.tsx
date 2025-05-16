"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
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
          return true;
        }
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  }
  return false;
};

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isLoggedIn = checkUserAuthentication();
    if (!isLoggedIn) {
      // Store the current URL in localStorage for redirect after login
      if (typeof window !== 'undefined') {
        localStorage.setItem('pendingCheckout', JSON.stringify({
          plan: searchParams.get('plan')
        }));
      }
      // Redirect to login page
      router.push(`/register?returnUrl=${encodeURIComponent('/payments')}`);
      return;
    }
    
    // Get plan from URL query parameter
    const planParam = searchParams.get('plan');
    
    // Set payment details based on plan
    if (planParam === 'essential') {
      setPaymentDetails({
        planName: 'Essential Plan',
        amount: 50000, // In paise (₹500.00)
        currency: 'INR',
        description: 'PracticeGenius Essential Plan Subscription'
      });
    } else if (planParam === 'premium') {
      setPaymentDetails({
        planName: 'Premium Plan',
        amount: 99900, // In paise (₹999.00)
        currency: 'INR',
        description: 'PracticeGenius Premium Plan Subscription'
      });
    } else {
      // Redirect back to cart if no plan is specified
      router.push('/cart');
    }

    // In a real implementation, you would make an API call to your backend to create an order
    // For demo purposes, we're creating a mock order ID
    setOrderId('order_' + Math.random().toString(36).substring(2, 15));
  }, [searchParams, router]);

  const handlePaymentSuccess = (planName: string) => {
    // Simulate a successful payment by updating the user's subscription in localStorage
    console.log('Payment successful for plan:', planName);
    
    if (typeof window !== 'undefined') {
      try {
        // Get current session
        const sessionData = localStorage.getItem('practicegenius_session');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          
          // Update the user's subscription plan
          if (session && session.user) {
            session.user.subscriptionPlan = planName.toLowerCase();
            
            // Save updated session
            localStorage.setItem('practicegenius_session', JSON.stringify(session));
            
            // Also update the user in the users array
            const usersData = localStorage.getItem('practicegenius_users');
            if (usersData) {
              const users = JSON.parse(usersData);
              const userIndex = users.findIndex((u: any) => u.id === session.user.id);
              
              if (userIndex !== -1) {
                users[userIndex].subscriptionPlan = planName.toLowerCase();
                localStorage.setItem('practicegenius_users', JSON.stringify(users));
              }
            }
          }
        }
      } catch (error) {
        console.error('Error updating subscription:', error);
      }
    }
    
    // Redirect to dashboard with success message
    router.push('/dashboard/worksheets?payment=success');
  };

  const handlePaymentError = (error: any) => {
    // Handle payment error
    console.error('Payment failed', error);
    alert('Payment failed: ' + (error.error?.description || 'Unknown error'));
  };

  const initializeRazorpay = () => {
    if (!paymentDetails || !orderId) return;
    
    // Get user information from session for prefill
    let userInfo = {
      name: '',
      email: '',
      contact: ''
    };
    
    if (typeof window !== 'undefined') {
      try {
        const sessionData = localStorage.getItem('practicegenius_session');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          if (session && session.user) {
            userInfo.name = session.user.name || '';
            userInfo.email = session.user.email || '';
          }
        }
      } catch (error) {
        console.error('Error getting user info:', error);
      }
    }
    
    const options = {
      key: 'rzp_test_iGz0m4gBDdtNdZ', // Razorpay test key
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
      name: 'PracticeGenius',
      description: paymentDetails.description,
      order_id: orderId,
      handler: handlePaymentSuccess,
      prefill: userInfo,
      notes: {
        plan: paymentDetails.planName
      },
      theme: {
        color: '#FF6B00'
      },
      modal: {
        ondismiss: () => {
          console.log('Payment modal closed');
        }
      }
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Failed to initialize Razorpay', err);
      alert('Failed to initialize payment gateway. Please try again.');
    }
  };

  const handleScriptLoad = () => {
    setIsRazorpayLoaded(true);
  };

  const handlePayNow = () => {
    // Simulate payment processing
    setIsSubmitting(true);
    
    // Add a delay to simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Get the plan name from payment details
      if (paymentDetails) {
        // Extract the plan name (Essential or Premium)
        const planName = paymentDetails.planName.split(' ')[0];
        
        // Simulate successful payment and update subscription
        handlePaymentSuccess(planName);
      } else {
        alert('Error: Payment details not found. Please try again.');
      }
    }, 1500);
  };

  return (
    <MainLayout>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={handleScriptLoad}
      />
      <div className="bg-background min-h-screen pt-20">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary text-white px-6 py-4">
              <h1 className="text-xl font-bold">Complete Your Payment</h1>
            </div>
            
            <div className="p-6">
              {paymentDetails ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Order Summary</h2>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Plan:</span>
                        <span className="font-medium">{paymentDetails.planName}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">₹{(paymentDetails.amount / 100).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 my-2 pt-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Total:</span>
                          <span className="font-medium">₹{(paymentDetails.amount / 100).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Method</h3>
                    <div className="border border-gray-300 rounded-md p-3 flex items-center">
                      <input
                        id="razorpay"
                        name="paymentMethod"
                        type="radio"
                        className="h-4 w-4 text-primary focus:ring-primary"
                        checked
                        readOnly
                      />
                      <label htmlFor="razorpay" className="ml-3 block text-sm font-medium text-gray-700">
                        Razorpay (Credit/Debit Card, UPI, Netbanking)
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={handlePayNow}
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block animate-spin mr-2">⟳</span>
                          Processing Payment...
                        </>
                      ) : 'Pay Now'}
                    </button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading payment details...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
