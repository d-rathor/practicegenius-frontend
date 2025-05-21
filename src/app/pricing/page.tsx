import React, { Suspense } from 'react';
import MainLayout from '@/components/MainLayout';
import PricingContentWrapper from '@/components/pricing/PricingContentWrapper';

export default function PricingPage() {
  return (
    <MainLayout>
      <PricingContentWrapper />
    </MainLayout>
  );
}
