"use client";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const PricingContent = dynamic(
  () => import("./PricingContent"),
  { ssr: false }
);

export default function PricingContentWrapper(props: any) {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading pricing information...</div>}>
      <PricingContent {...props} />
    </Suspense>
  );
}
