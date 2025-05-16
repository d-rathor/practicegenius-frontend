"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  features: string[];
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

const CartContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Get plan from URL query parameter
    const planParam = searchParams.get('plan');
    
    // Set cart item based on plan
    if (planParam === 'essential') {
      setCartItem({
        id: 'essential-plan',
        name: 'Essential Plan',
        price: 99,
        originalPrice: 149,
        discount: 33,
        features: [
          'Access to 100+ worksheets',
          'Printable in high resolution',
          'New worksheets added monthly',
          'Email support'
        ]
      });
    } else if (planParam === 'premium') {
      setCartItem({
        id: 'premium-plan',
        name: 'Premium Plan',
        price: 199,
        originalPrice: 299,
        discount: 33,
        features: [
          'Access to ALL worksheets (200+)',
          'Printable in high resolution',
          'New worksheets added weekly',
          'Priority email support',
          'Customizable worksheets',
          'Exclusive teaching resources'
        ]
      });
    } else {
      // Default to free plan if no valid plan is specified
      setCartItem({
        id: 'free-plan',
        name: 'Free Plan',
        price: 0,
        features: [
          'Access to 10 free worksheets',
          'Basic printable quality',
          'No support'
        ]
      });
    }
  }, [searchParams]);

  // Handle checkout button click
  const handleCheckout = () => {
    // Check if user is logged in
    const isLoggedIn = checkUserAuthentication();
    
    if (!isLoggedIn) {
      // Store cart information in localStorage for retrieval after login/registration
      if (cartItem) {
        localStorage.setItem('pendingCheckout', JSON.stringify({
          plan: cartItem.id,
          price: cartItem.price
        }));
      }
      
      // Redirect to registration page with return URL
      router.push('/register?returnUrl=/payments');
      return;
    }
    
    // If user is logged in, proceed to payment page
    router.push('/payments');
  };

  if (!cartItem) {
    return <div className="text-center py-12">Loading cart...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column - Cart Items */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{cartItem.name}</h3>
              <p className="text-gray-600 text-sm">Annual Subscription</p>
              
              <ul className="mt-2 space-y-1">
                {cartItem.features.map((feature, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-right">
              {cartItem.originalPrice ? (
                <>
                  <span className="line-through text-gray-400">${cartItem.originalPrice}</span>
                  <span className="ml-2 text-lg font-semibold">${cartItem.price}</span>
                  <span className="block text-green-600 text-sm">Save {cartItem.discount}%</span>
                </>
              ) : (
                <span className="text-lg font-semibold">${cartItem.price}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-medium">Total</span>
          <span className="text-xl font-semibold">${cartItem.price}</span>
        </div>
      </div>
      
      {/* Right Column - Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${cartItem.price}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>$0</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>${cartItem.price}</span>
          </div>
        </div>
        
        <button
          onClick={handleCheckout}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          Proceed to Checkout
        </button>
        
        <div className="mt-4 text-center">
          <Link href="/pricing" className="text-primary hover:underline">
            Continue Shopping
          </Link>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <Image src="/images/payment-visa.svg" alt="Visa" width={40} height={25} />
            <Image src="/images/payment-mastercard.svg" alt="Mastercard" width={40} height={25} />
            <Image src="/images/payment-amex.svg" alt="American Express" width={40} height={25} />
            <Image src="/images/payment-paypal.svg" alt="PayPal" width={40} height={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
