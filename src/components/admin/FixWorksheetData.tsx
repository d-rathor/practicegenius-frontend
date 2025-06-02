"use client";

import React, { useState } from 'react';

const FixWorksheetData: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [worksheetCount, setWorksheetCount] = useState<number>(0);

  // Function to fix the worksheet data
  const fixWorksheetData = () => {
    try {
      // First, clear ALL localStorage keys that might contain worksheet data
      // This ensures we start with a clean slate
      const allKeys = Object.keys(localStorage);
      console.log('All localStorage keys before cleanup:', allKeys);
      
      // Clear any keys that might contain worksheet data
      allKeys.forEach(key => {
        if (key.includes('worksheet') || key.includes('Worksheet')) {
          console.log(`Removing key: ${key}`);
          localStorage.removeItem(key);
        }
      });
      
      // Create exactly 3 sample worksheets in the format expected by WorksheetContext
      const fixedWorksheets = [
        {
          id: 'worksheet_1',
          title: 'Addition and Subtraction',
          subject: 'math',
          grade: 2,
          subscriptionLevel: 'free',
          plan: 'Free',
          topic: 'Basic Operations',
          fileName: 'addition_subtraction.pdf',
          downloadCount: 42,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          isPublic: true,
          createdBy: 'admin',
          dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'worksheet_2',
          title: 'Reading Comprehension',
          subject: 'english',
          grade: 3,
          subscriptionLevel: 'essential',
          plan: 'Essential',
          topic: 'Reading',
          fileName: 'reading_comprehension.pdf',
          downloadCount: 28,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          isPublic: true,
          createdBy: 'admin',
          dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'worksheet_3',
          title: 'Science Experiments',
          subject: 'science',
          grade: 4,
          subscriptionLevel: 'premium',
          plan: 'Premium',
          topic: 'Experiments',
          fileName: 'science_experiments.pdf',
          downloadCount: 15,
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          isPublic: true,
          createdBy: 'admin',
          dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      // Save worksheets to BOTH localStorage keys to ensure consistency
      localStorage.setItem('worksheets', JSON.stringify(fixedWorksheets));
      localStorage.setItem('practicegenius_worksheets', JSON.stringify(fixedWorksheets));
      
      // Double-check that we have exactly 3 worksheets in both places
      const verifyData1 = localStorage.getItem('worksheets');
      const verifyData2 = localStorage.getItem('practicegenius_worksheets');
      
      if (verifyData1 && verifyData2) {
        const worksheets1 = JSON.parse(verifyData1);
        const worksheets2 = JSON.parse(verifyData2);
        console.log(`Verification: ${worksheets1.length} worksheets in 'worksheets' and ${worksheets2.length} in 'practicegenius_worksheets'`);
      }
      
      // Update the message
      setMessage(`Successfully reset worksheet data. Now showing exactly 3 worksheets across all pages.`);
      setWorksheetCount(3);
      
      // Force a page refresh to update the stats
      window.location.reload();
    } catch (error) {
      console.error('Error fixing worksheet data:', error);
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-2">Fix Worksheet Data</h3>
      <p className="mb-4">Current worksheet count: {worksheetCount}</p>
      <button
        onClick={fixWorksheetData}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Fix Worksheet Data
      </button>
      {message && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default FixWorksheetData;
