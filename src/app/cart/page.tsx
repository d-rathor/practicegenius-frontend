"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
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

export default function CartPage() {
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
        price: 500.00,
        originalPrice: 750.00,
        discount: 250.00,
        features: [
          '1 Year Included',
          '75 Worksheets',
          '365-day Access',
          'Weekly Worksheets',
          'Specialized Modules'
        ]
      });
    } else if (planParam === 'premium') {
      setCartItem({
        id: 'premium-plan',
        name: 'Premium Plan',
        price: 999.00,
        originalPrice: 1499.00,
        discount: 500.00,
        features: [
          '1 Year Included',
          'Unlimited Worksheets',
          '365-day Access',
          'Daily Worksheets',
          'All Premium Modules',
          'Priority Support'
        ]
      });
    }
  }, [searchParams]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleRemoveItem = () => {
    setCartItem(null);
    router.push('/pricing');
  };

  const handleCheckout = () => {
    if (cartItem) {
      // Store cart info in localStorage for retrieval after login/registration
      const checkoutData = {
        plan: cartItem.id.split('-')[0], // Extract 'essential' or 'premium' from the ID
        planName: cartItem.name,
        price: cartItem.price,
        originalPrice: cartItem.originalPrice,
        features: cartItem.features
      };
      localStorage.setItem('pendingCheckout', JSON.stringify(checkoutData));
      
      // Check if user is logged in
      const isLoggedIn = checkUserAuthentication();
      
      if (isLoggedIn) {
        // User is logged in, proceed to payment
        router.push(`/payments?plan=${checkoutData.plan}`);
      } else {
        // User is not logged in, redirect to registration with return URL
        router.push(`/register?returnUrl=${encodeURIComponent('/payments')}`);
      }
    }
  };
  
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

  // Calculate totals
  const subtotal = cartItem ? cartItem.price * quantity : 0;
  const total = subtotal;

  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-8">Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCT</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cartItem ? (
                      <tr>
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-primary flex items-center justify-center text-white">
                              <div className="uppercase font-bold">
                                {cartItem.name.split(' ')[0].charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4 flex flex-col">
                              <div className="font-medium text-gray-900">{cartItem.name}</div>
                              <div className="mt-1 text-sm text-gray-500">
                                {cartItem.originalPrice && (
                                  <span className="line-through mr-2">₹{cartItem.originalPrice.toFixed(2)}</span>
                                )}
                                <span className="text-primary font-medium">₹{cartItem.price.toFixed(2)}</span>
                                {cartItem.discount && (
                                  <span className="ml-2 text-green-600">SAVE ₹{cartItem.discount.toFixed(2)}</span>
                                )}
                              </div>
                              <ul className="mt-2 text-sm text-gray-600">
                                {cartItem.features.map((feature, index) => (
                                  <li key={index} className="flex items-center">
                                    <span className="text-xs mr-1">✓</span> {feature}
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-2">
                                <button 
                                  onClick={handleRemoveItem}
                                  className="text-sm text-red-600 hover:text-red-800"
                                >
                                  Remove item
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                          ₹{(cartItem.price * quantity).toFixed(2)}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-6 py-10 text-center text-gray-500">
                          Your cart is empty. <Link href="/pricing" className="text-primary hover:underline">Browse plans</Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">CART TOTALS</h2>
                </div>
                <div className="px-6 py-4 space-y-4">
                  {/* Coupon Code */}
                  <div>
                    <details className="cursor-pointer">
                      <summary className="text-gray-700 hover:text-primary">Add a coupon</summary>
                      <div className="mt-2">
                        <div className="flex mt-1">
                          <input
                            type="text"
                            className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            placeholder="Coupon code"
                          />
                          <button className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Apply
                          </button>
                        </div>
                      </div>
                    </details>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {/* Total */}
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-medium text-gray-900">₹{total.toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500 mt-2">
                    OR
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
