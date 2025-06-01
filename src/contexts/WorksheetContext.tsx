"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface Worksheet {
  id: string;
  title: string;
  subject: 'math' | 'science' | 'english' | string;
  grade: number;
  subscriptionLevel: 'free' | 'essential' | 'premium' | string;
  plan: 'Free' | 'Essential' | 'Premium' | string; // Required plan property
  topic: string;
  fileName: string;
  downloadCount: number;
  createdAt: string;
  isPublic?: boolean;
  createdBy?: string;
  thumbnailUrl?: string;
  downloadUrl?: string;
  description?: string;
}

// Initial sample worksheets
const initialWorksheets: Worksheet[] = [
  {
    id: '1',
    title: 'Addition and Subtraction',
    subject: 'math',
    grade: 1,
    subscriptionLevel: 'free',
    plan: 'Free',
    topic: 'Basic Operations',
    fileName: 'addition_subtraction.pdf',
    downloadCount: 245,
    createdAt: '2025-04-15T10:30:00',
    isPublic: true,
    createdBy: 'admin',
    thumbnailUrl: '/images/worksheets/math-grade1-addition.jpg',
    downloadUrl: '/worksheets/addition_subtraction.pdf'
  },
  {
    id: '2',
    title: 'Multiplication Tables',
    subject: 'math',
    grade: 2,
    subscriptionLevel: 'essential',
    plan: 'Essential',
    topic: 'Multiplication',
    fileName: 'multiplication_tables.pdf',
    downloadCount: 189,
    createdAt: '2025-04-10T14:20:00',
    isPublic: true,
    createdBy: 'admin',
    thumbnailUrl: '/images/worksheets/math-grade2-multiplication.jpg',
    downloadUrl: '/worksheets/multiplication_tables.pdf'
  },
  {
    id: '3',
    title: 'Parts of Speech',
    subject: 'english',
    grade: 3,
    subscriptionLevel: 'essential',
    plan: 'Essential',
    topic: 'Grammar',
    fileName: 'parts_of_speech.pdf',
    downloadCount: 156,
    createdAt: '2025-04-05T09:45:00',
    isPublic: true,
    createdBy: 'admin',
    thumbnailUrl: '/images/worksheets/english-grade3-grammar.jpg',
    downloadUrl: '/worksheets/parts_of_speech.pdf'
  },
  {
    id: '4',
    title: 'Solar System',
    subject: 'science',
    grade: 4,
    subscriptionLevel: 'premium',
    plan: 'Premium',
    topic: 'Astronomy',
    fileName: 'solar_system.pdf',
    downloadCount: 210,
    createdAt: '2025-04-01T11:15:00',
    isPublic: true,
    createdBy: 'admin',
    thumbnailUrl: '/images/worksheets/science-grade4-solar-system.jpg',
    downloadUrl: '/worksheets/solar_system.pdf'
  },
  {
    id: '5',
    title: 'Fractions',
    subject: 'math',
    grade: 3,
    subscriptionLevel: 'premium',
    plan: 'Premium',
    topic: 'Fractions and Decimals',
    fileName: 'fractions.pdf',
    downloadCount: 178,
    createdAt: '2025-03-25T16:30:00',
    isPublic: true,
    createdBy: 'admin',
    thumbnailUrl: '/images/worksheets/math-grade3-fractions.jpg',
    downloadUrl: '/worksheets/fractions.pdf'
  }
];

// Interface for user download tracking
interface UserDownload {
  userId: string;
  worksheetId: string;
  downloadedAt: string;
}

interface WorksheetContextType {
  worksheets: Worksheet[];
  userDownloads: UserDownload[];
  addWorksheet: (worksheet: Omit<Worksheet, 'id' | 'downloadCount' | 'createdAt'> | Worksheet) => void;
  deleteWorksheet: (id: string) => void;
  downloadWorksheet: (worksheetId: string, userId: string) => void;
  getUserDownloads: (userId: string) => Worksheet[];
  getAdminWorksheets: () => Worksheet[];
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
  const [userDownloads, setUserDownloads] = useState<UserDownload[]>([]);

  // Load worksheets and user downloads from localStorage on initial render
  useEffect(() => {
    // Load worksheets
    const storedWorksheets = localStorage.getItem('practicegenius_worksheets');
    if (storedWorksheets) {
      setWorksheets(JSON.parse(storedWorksheets));
    } else {
      // Use initial worksheets if nothing in localStorage
      setWorksheets(initialWorksheets);
      localStorage.setItem('practicegenius_worksheets', JSON.stringify(initialWorksheets));
    }

    // Load user downloads
    const storedUserDownloads = localStorage.getItem('practicegenius_user_downloads');
    if (storedUserDownloads) {
      setUserDownloads(JSON.parse(storedUserDownloads));
    } else {
      // Initialize empty user downloads if nothing in localStorage
      localStorage.setItem('practicegenius_user_downloads', JSON.stringify([]));
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
        createdAt: new Date().toISOString(),
        // Set default values for new fields
        isPublic: worksheetData.isPublic !== undefined ? worksheetData.isPublic : true,
        createdBy: worksheetData.createdBy || 'user',
        // Ensure plan is set based on subscriptionLevel if not provided
        plan: worksheetData.plan || (worksheetData.subscriptionLevel === 'free' ? 'Free' : 
              worksheetData.subscriptionLevel === 'essential' ? 'Essential' : 
              worksheetData.subscriptionLevel === 'premium' ? 'Premium' : 'Free')
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

    // Also remove any user downloads for this worksheet
    const updatedUserDownloads = userDownloads.filter(download => download.worksheetId !== id);
    setUserDownloads(updatedUserDownloads);
    localStorage.setItem('practicegenius_user_downloads', JSON.stringify(updatedUserDownloads));
  };

  // Track a worksheet download by a user
  const downloadWorksheet = (worksheetId: string, userId: string) => {
    // Find the worksheet
    const worksheet = worksheets.find(w => w.id === worksheetId);
    if (!worksheet) return;

    // Increment download count
    const updatedWorksheet = {
      ...worksheet,
      downloadCount: worksheet.downloadCount + 1
    };

    // Update the worksheet in the worksheets array
    const updatedWorksheets = worksheets.map(w => 
      w.id === worksheetId ? updatedWorksheet : w
    );
    setWorksheets(updatedWorksheets);
    localStorage.setItem('practicegenius_worksheets', JSON.stringify(updatedWorksheets));

    // Add to user downloads if not already downloaded
    const alreadyDownloaded = userDownloads.some(
      download => download.worksheetId === worksheetId && download.userId === userId
    );

    if (!alreadyDownloaded) {
      const newDownload: UserDownload = {
        userId,
        worksheetId,
        downloadedAt: new Date().toISOString()
      };

      const updatedUserDownloads = [...userDownloads, newDownload];
      setUserDownloads(updatedUserDownloads);
      localStorage.setItem('practicegenius_user_downloads', JSON.stringify(updatedUserDownloads));
    }
  };

  // Get worksheets downloaded by a specific user
  const getUserDownloads = (userId: string): Worksheet[] => {
    // Get the IDs of worksheets downloaded by this user
    const userDownloadIds = userDownloads
      .filter(download => download.userId === userId)
      .map(download => download.worksheetId);

    // Return the worksheets with these IDs
    return worksheets.filter(worksheet => userDownloadIds.includes(worksheet.id));
  };

  // Get worksheets uploaded by the admin
  const getAdminWorksheets = (): Worksheet[] => {
    console.log('Total worksheets in context:', worksheets.length);
    console.log('Worksheets with createdBy property:', worksheets.filter(w => w.createdBy !== undefined).length);
    console.log('Admin worksheets:', worksheets.filter(w => w.createdBy === 'admin').length);
    console.log('Public worksheets:', worksheets.filter(w => w.isPublic === true).length);
    
    // Make sure all worksheets have the createdBy and isPublic properties set
    const updatedWorksheets = worksheets.map(worksheet => ({
      ...worksheet,
      createdBy: worksheet.createdBy || 'admin', // Default to admin if not set
      isPublic: worksheet.isPublic !== false // Default to true if not set
    }));
    
    // Update the worksheets in localStorage
    localStorage.setItem('practicegenius_worksheets', JSON.stringify(updatedWorksheets));
    
    // Return only admin-uploaded and public worksheets
    return updatedWorksheets.filter(worksheet => 
      worksheet.createdBy === 'admin' && worksheet.isPublic === true
    );
  };

  return (
    <WorksheetContext.Provider value={{
      worksheets,
      userDownloads,
      addWorksheet,
      deleteWorksheet,
      downloadWorksheet,
      getUserDownloads,
      getAdminWorksheets
    }}>
      {children}
    </WorksheetContext.Provider>
  );
};
