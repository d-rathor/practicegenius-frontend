"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface Worksheet {
  id: string;
  title: string;
  subject: 'math' | 'science' | 'english';
  grade: number;
  subscriptionLevel: 'free' | 'essential' | 'premium';
  topic: string;
  fileName: string;
  downloadCount: number;
  createdAt: string;
}

// Initial sample worksheets
const initialWorksheets: Worksheet[] = [
  {
    id: '1',
    title: 'Addition and Subtraction',
    subject: 'math',
    grade: 1,
    subscriptionLevel: 'free',
    topic: 'Basic Operations',
    fileName: 'addition_subtraction.pdf',
    downloadCount: 245,
    createdAt: '2025-04-15T10:30:00'
  },
  {
    id: '2',
    title: 'Multiplication Tables',
    subject: 'math',
    grade: 2,
    subscriptionLevel: 'essential',
    topic: 'Multiplication',
    fileName: 'multiplication_tables.pdf',
    downloadCount: 189,
    createdAt: '2025-04-10T14:20:00'
  },
  {
    id: '3',
    title: 'Parts of Speech',
    subject: 'english',
    grade: 3,
    subscriptionLevel: 'essential',
    topic: 'Grammar',
    fileName: 'parts_of_speech.pdf',
    downloadCount: 156,
    createdAt: '2025-04-05T09:45:00'
  },
  {
    id: '4',
    title: 'Solar System',
    subject: 'science',
    grade: 4,
    subscriptionLevel: 'premium',
    topic: 'Astronomy',
    fileName: 'solar_system.pdf',
    downloadCount: 210,
    createdAt: '2025-04-01T11:15:00'
  },
  {
    id: '5',
    title: 'Fractions',
    subject: 'math',
    grade: 3,
    subscriptionLevel: 'premium',
    topic: 'Fractions and Decimals',
    fileName: 'fractions.pdf',
    downloadCount: 178,
    createdAt: '2025-03-25T16:30:00'
  }
];

interface WorksheetContextType {
  worksheets: Worksheet[];
  addWorksheet: (worksheet: Omit<Worksheet, 'id' | 'downloadCount' | 'createdAt'> | Worksheet) => void;
  deleteWorksheet: (id: string) => void;
}

const WorksheetContext = createContext<WorksheetContextType | undefined>(undefined);

export const useWorksheets = () => {
  const context = useContext(WorksheetContext);
  if (context === undefined) {
    throw new Error('useWorksheets must be used within a WorksheetProvider');
  }
  return context;
};

interface WorksheetProviderProps {
  children: ReactNode;
}

export const WorksheetProvider: React.FC<WorksheetProviderProps> = ({ children }) => {
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);

  // Load worksheets from localStorage on initial render
  useEffect(() => {
    const storedWorksheets = localStorage.getItem('practicegenius_worksheets');
    if (storedWorksheets) {
      setWorksheets(JSON.parse(storedWorksheets));
    } else {
      // Use initial worksheets if nothing in localStorage
      setWorksheets(initialWorksheets);
      localStorage.setItem('practicegenius_worksheets', JSON.stringify(initialWorksheets));
    }
  }, []);

  // Add a new worksheet or update an existing one
  const addWorksheet = (worksheetData: Omit<Worksheet, 'id' | 'downloadCount' | 'createdAt'> | Worksheet) => {
    // Check if this is an existing worksheet (has id, downloadCount, and createdAt)
    if ('id' in worksheetData && 'downloadCount' in worksheetData && 'createdAt' in worksheetData) {
      // This is an existing worksheet being updated
      const existingWorksheet = worksheetData as Worksheet;
      const updatedWorksheets = worksheets.map(w => 
        w.id === existingWorksheet.id ? existingWorksheet : w
      );
      setWorksheets(updatedWorksheets);
      localStorage.setItem('practicegenius_worksheets', JSON.stringify(updatedWorksheets));
    } else {
      // This is a new worksheet
      const newWorksheet: Worksheet = {
        ...worksheetData as Omit<Worksheet, 'id' | 'downloadCount' | 'createdAt'>,
        id: Date.now().toString(),
        downloadCount: 0,
        createdAt: new Date().toISOString()
      };

      const updatedWorksheets = [...worksheets, newWorksheet];
      setWorksheets(updatedWorksheets);
      localStorage.setItem('practicegenius_worksheets', JSON.stringify(updatedWorksheets));
    }
  };

  // Delete a worksheet
  const deleteWorksheet = (id: string) => {
    const updatedWorksheets = worksheets.filter(worksheet => worksheet.id !== id);
    setWorksheets(updatedWorksheets);
    localStorage.setItem('practicegenius_worksheets', JSON.stringify(updatedWorksheets));
  };

  return (
    <WorksheetContext.Provider value={{ worksheets, addWorksheet, deleteWorksheet }}>
      {children}
    </WorksheetContext.Provider>
  );
};
