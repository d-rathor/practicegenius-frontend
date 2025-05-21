"use client";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const WorksheetFilters = dynamic(
  () => import("./WorksheetFilters"),
  { ssr: false }
);

export default function WorksheetFiltersWrapper(props: any) {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <WorksheetFilters {...props} />
    </Suspense>
  );
}
