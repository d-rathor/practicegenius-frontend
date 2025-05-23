import React, { Suspense } from 'react';
import MainLayout from '@/components/MainLayout';
import CartClientWrapper from '@/components/cart/CartClientWrapper';

export default function CartPage() {
  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          
          <Suspense fallback={<div className="text-center py-12">Loading cart...</div>}>
            <CartClientWrapper />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
}
