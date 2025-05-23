'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const PaymentContent = dynamic(
  () => import('@/components/payments/PaymentContent'),
  { ssr: false }
);

export default function PaymentClientWrapper() {
  return <PaymentContent />;
}
