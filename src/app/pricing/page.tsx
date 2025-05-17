import React, { Suspense } from 'react';
import MainLayout from '@/components/MainLayout';
import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const PricingContent = dynamic(
  () => import('@/components/pricing/PricingContent'),
  { ssr: false }
);

export default function PricingPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="text-center py-12">Loading pricing information...</div>}>
        <PricingContent />
      </Suspense>
    </MainLayout>
  );
}
