"use client";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const WorksheetGridClient = dynamic(
  () => import("./WorksheetGrid"),
  { ssr: false }
);

export default function WorksheetGridClientWrapper(props: any) {
  return (
    <Suspense fallback={<div>Loading worksheets...</div>}>
      <WorksheetGridClient {...props} />
    </Suspense>
  );
}
