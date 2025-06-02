"use client";

import React, { useState } from 'react';

/**
 * Component to fix duplicate worksheets in localStorage
 * This component will deduplicate worksheets across both localStorage keys
 */
const FixDuplicateWorksheets: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [fixed, setFixed] = useState<boolean>(false);

  const fixDuplicateWorksheets = () => {
    try {
      setStatus('Fixing duplicate worksheets...');
      
      // Get worksheets from both localStorage keys
      const worksheetsKey1 = localStorage.getItem('worksheets');
      const worksheetsKey2 = localStorage.getItem('practicegenius_worksheets');
      
      // Define worksheet interface to match the structure in WorksheetContext
      interface Worksheet {
        id: string;
        title: string;
        subject: string;
        grade: number;
        subscriptionLevel: string;
        plan: string;
        [key: string]: any; // Allow for other properties
      }
      
      let worksheets1: Worksheet[] = [];
      let worksheets2: Worksheet[] = [];
      
      if (worksheetsKey1) {
        try {
          worksheets1 = JSON.parse(worksheetsKey1);
          setStatus(prev => prev + `\nFound ${worksheets1.length} worksheets in 'worksheets' key`);
        } catch (e) {
          setStatus(prev => prev + '\nError parsing worksheets from key 1');
        }
      }
      
      if (worksheetsKey2) {
        try {
          worksheets2 = JSON.parse(worksheetsKey2);
          setStatus(prev => prev + `\nFound ${worksheets2.length} worksheets in 'practicegenius_worksheets' key`);
        } catch (e) {
          setStatus(prev => prev + '\nError parsing worksheets from key 2');
        }
      }
      
      // Combine all worksheets
      const allWorksheets = [...worksheets1, ...worksheets2];
      setStatus(prev => prev + `\nCombined ${allWorksheets.length} total worksheets`);
      
      // Deduplicate by ID using a Map
      const uniqueWorksheetsMap = new Map();
      allWorksheets.forEach(worksheet => {
        if (!uniqueWorksheetsMap.has(worksheet.id)) {
          uniqueWorksheetsMap.set(worksheet.id, worksheet);
        }
      });
      
      // Convert Map back to array
      const uniqueWorksheets = Array.from(uniqueWorksheetsMap.values());
      setStatus(prev => prev + `\nDeduplication complete. ${uniqueWorksheets.length} unique worksheets found.`);
      
      // Save back to both localStorage keys
      localStorage.setItem('worksheets', JSON.stringify(uniqueWorksheets));
      localStorage.setItem('practicegenius_worksheets', JSON.stringify(uniqueWorksheets));
      
      setStatus(prev => prev + `\nSaved ${uniqueWorksheets.length} unique worksheets to both localStorage keys.`);
      setFixed(true);
      
      // Force a page reload to reflect changes
      window.location.reload();
    } catch (e) {
      setStatus(`Error fixing duplicate worksheets: ${e}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Fix Duplicate Worksheets</h2>
      <p className="text-gray-600 mb-4">
        This tool will remove duplicate worksheets from localStorage and ensure both storage keys 
        contain the same data.
      </p>
      
      {status && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4 whitespace-pre-wrap">
          <p className="font-mono text-sm">{status}</p>
        </div>
      )}
      
      <button
        onClick={fixDuplicateWorksheets}
        disabled={fixed}
        className={`px-4 py-2 rounded-lg ${
          fixed 
            ? 'bg-green-100 text-green-800 cursor-not-allowed' 
            : 'bg-primary text-white hover:bg-primary-dark'
        }`}
      >
        {fixed ? 'Worksheets Fixed' : 'Fix Duplicate Worksheets'}
      </button>
    </div>
  );
};

export default FixDuplicateWorksheets;
