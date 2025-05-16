import React, { Suspense } from 'react';
import MainLayout from '@/components/MainLayout';
import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const PaymentContent = dynamic(
  () => import('@/components/payments/PaymentContent'),
  { ssr: false }
);

export default function PaymentPage() {
  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          <h1 className="text-3xl font-bold mb-8">Payment</h1>
          
          <Suspense fallback={<div className="text-center py-12">Loading payment details...</div>}>
            <PaymentContent />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
}
