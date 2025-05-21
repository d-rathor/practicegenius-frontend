"use client";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const WorksheetSearch = dynamic(
  () => import("./WorksheetSearch"),
  { ssr: false }
);

export default function WorksheetSearchWrapper(props: any) {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <WorksheetSearch {...props} />
    </Suspense>
  );
}
