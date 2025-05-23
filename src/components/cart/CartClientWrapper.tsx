'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const CartContent = dynamic(
  () => import('@/components/cart/CartContent'),
  { ssr: false }
);

export default function CartClientWrapper() {
  return <CartContent />;
}
