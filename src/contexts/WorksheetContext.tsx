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
  const [isInitialized, setIsInitialized] = useState(false);

  // Load worksheets and user downloads from localStorage on initial render
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      return;
    }
    
    console.log('INITIALIZING WORKSHEET CONTEXT');
    
    // Load worksheets from localStorage
    try {
      const storedWorksheets = localStorage.getItem('practicegenius_worksheets');
      let worksheetsToUse: Worksheet[] = [];
      
      if (storedWorksheets) {
        try {
          worksheetsToUse = JSON.parse(storedWorksheets);
          console.log(`Found ${worksheetsToUse.length} worksheets in localStorage`);
        } catch (e) {
          console.error('Error parsing stored worksheets, using initial worksheets:', e);
          worksheetsToUse = initialWorksheets;
        }
      } else {
        console.log('No worksheets found in localStorage, using initial worksheets');
        worksheetsToUse = initialWorksheets;
      }
      
      // Ensure all worksheets have the required properties
      const validWorksheets = worksheetsToUse.map(worksheet => ({
        ...worksheet,
        createdBy: worksheet.createdBy || 'admin',
        isPublic: worksheet.isPublic !== false,
        plan: worksheet.plan || 'Free',
        downloadCount: worksheet.downloadCount || 0
      }));
      
      // Update state
      setWorksheets(validWorksheets);
      
      // Save back to localStorage to ensure consistency
      localStorage.setItem('practicegenius_worksheets', JSON.stringify(validWorksheets));
      console.log(`Saved ${validWorksheets.length} worksheets to localStorage`);
      
      // Load user downloads
      const storedUserDownloads = localStorage.getItem('practicegenius_user_downloads');
      if (storedUserDownloads) {
        try {
          setUserDownloads(JSON.parse(storedUserDownloads));
        } catch (e) {
          console.error('Error parsing stored user downloads:', e);
          setUserDownloads([]);
          localStorage.setItem('practicegenius_user_downloads', JSON.stringify([]));
        }
      } else {
        setUserDownloads([]);
        localStorage.setItem('practicegenius_user_downloads', JSON.stringify([]));
      }
      
      setIsInitialized(true);
      console.log('WORKSHEET CONTEXT INITIALIZED SUCCESSFULLY');
    } catch (e) {
      console.error('Error initializing worksheet context:', e);
      // Fallback to initial state
      setWorksheets(initialWorksheets);
      setUserDownloads([]);
      localStorage.setItem('practicegenius_worksheets', JSON.stringify(initialWorksheets));
      localStorage.setItem('practicegenius_user_downloads', JSON.stringify([]));
      setIsInitialized(true);
    }
  }, []);

  // Add a new worksheet or update an existing one
  const addWorksheet = (worksheetData: Omit<Worksheet, 'id' | 'downloadCount' | 'createdAt'> | Worksheet) => {
    console.log('===== ADD WORKSHEET CALLED =====');
    console.log('Worksheet data received:', worksheetData);
    
    if (typeof window === 'undefined') {
      console.error('Cannot add worksheet in server environment');
      return;
    }
    
    try {
      // Always load the latest worksheets from localStorage first
      let currentWorksheets: Worksheet[] = [];
      const storedWorksheets = localStorage.getItem('practicegenius_worksheets');
      
      if (storedWorksheets) {
        try {
          currentWorksheets = JSON.parse(storedWorksheets);
          console.log(`Loaded ${currentWorksheets.length} existing worksheets from localStorage`);
        } catch (e) {
          console.error('Error parsing stored worksheets:', e);
          // If we can't parse, use the current state
          currentWorksheets = [...worksheets];
        }
      } else {
        // If nothing in localStorage, use current state
        currentWorksheets = [...worksheets];
      }
      
      // Check if this is an existing worksheet (has id)
      if ('id' in worksheetData) {
        console.log('Updating existing worksheet with ID:', worksheetData.id);
        
        // Find the existing worksheet to preserve any missing properties
        const existingWorksheetIndex = currentWorksheets.findIndex(w => w.id === worksheetData.id);
        let updatedWorksheet: Worksheet;
        
        if (existingWorksheetIndex >= 0) {
          // Merge the existing worksheet with the new data, preserving critical properties
          const existingWorksheet = currentWorksheets[existingWorksheetIndex];
          updatedWorksheet = {
            ...existingWorksheet,  // Keep all existing properties as base
            ...worksheetData,     // Override with new data
            // Ensure these critical properties are preserved or have proper defaults
            createdBy: worksheetData.createdBy || existingWorksheet.createdBy || 'admin',
            isPublic: worksheetData.isPublic !== undefined ? worksheetData.isPublic : (existingWorksheet.isPublic !== false),
            plan: worksheetData.plan || existingWorksheet.plan || 
                  (worksheetData.subscriptionLevel === 'free' ? 'Free' : 
                   worksheetData.subscriptionLevel === 'essential' ? 'Essential' : 
                   worksheetData.subscriptionLevel === 'premium' ? 'Premium' : 'Free'),
            // Ensure these are preserved from the original
            id: existingWorksheet.id,
            downloadCount: worksheetData.downloadCount !== undefined ? worksheetData.downloadCount : existingWorksheet.downloadCount,
            createdAt: existingWorksheet.createdAt
          };
          
          console.log('Merged worksheet data:', {
            id: updatedWorksheet.id,
            title: updatedWorksheet.title,
            createdBy: updatedWorksheet.createdBy,
            isPublic: updatedWorksheet.isPublic,
            plan: updatedWorksheet.plan
          });
        } else {
          // Worksheet with this ID doesn't exist yet, treat as new with specified ID
          updatedWorksheet = {
            ...worksheetData as Worksheet,
            downloadCount: worksheetData.downloadCount || 0,
            createdAt: worksheetData.createdAt || new Date().toISOString(),
            isPublic: worksheetData.isPublic !== undefined ? worksheetData.isPublic : true,
            createdBy: worksheetData.createdBy || 'admin',
            plan: worksheetData.plan || 
                  (worksheetData.subscriptionLevel === 'free' ? 'Free' : 
                   worksheetData.subscriptionLevel === 'essential' ? 'Essential' : 
                   worksheetData.subscriptionLevel === 'premium' ? 'Premium' : 'Free')
          };
        }
        
        // Update the worksheets array
        const updatedWorksheets = existingWorksheetIndex >= 0 
          ? currentWorksheets.map(w => w.id === updatedWorksheet.id ? updatedWorksheet : w)
          : [...currentWorksheets, updatedWorksheet];
        
        // Update state and localStorage
        setWorksheets(updatedWorksheets);
        localStorage.setItem('practicegenius_worksheets', JSON.stringify(updatedWorksheets));
        console.log(`Updated worksheet saved. Total count: ${updatedWorksheets.length}`);
      } else {
        console.log('Creating new worksheet');
        // This is a new worksheet
        const newWorksheet: Worksheet = {
          ...worksheetData as Omit<Worksheet, 'id' | 'downloadCount' | 'createdAt'>,
          id: Date.now().toString(),
          downloadCount: 0,
          createdAt: new Date().toISOString(),
          // Set default values for new fields
          isPublic: worksheetData.isPublic !== undefined ? worksheetData.isPublic : true,
          createdBy: worksheetData.createdBy || 'admin', // Default to 'admin' instead of 'user'
          // Ensure plan is set based on subscriptionLevel if not provided
          plan: worksheetData.plan || (worksheetData.subscriptionLevel === 'free' ? 'Free' : 
                worksheetData.subscriptionLevel === 'essential' ? 'Essential' : 
                worksheetData.subscriptionLevel === 'premium' ? 'Premium' : 'Free')
        };

        console.log('New worksheet created:', {
          id: newWorksheet.id,
          title: newWorksheet.title,
          createdBy: newWorksheet.createdBy,
          isPublic: newWorksheet.isPublic,
          plan: newWorksheet.plan
        });
        
        // Add the new worksheet to the current worksheets
        const updatedWorksheets = [...currentWorksheets, newWorksheet];
        
        // Update state and localStorage
        setWorksheets(updatedWorksheets);
        localStorage.setItem('practicegenius_worksheets', JSON.stringify(updatedWorksheets));
        
        console.log(`New worksheet added to localStorage. Total count: ${updatedWorksheets.length}`);
      }
    } catch (e) {
      console.error('Error adding worksheet:', e);
    }
    
    console.log('===== END ADD WORKSHEET =====');
  };

  // Delete a worksheet
  const deleteWorksheet = (id: string) => {
    const updatedWorksheets = worksheets.filter(worksheet => worksheet.id !== id);
    setWorksheets(updatedWorksheets);
    
    // Only update localStorage in browser environment
    if (typeof window !== 'undefined') {
      localStorage.setItem('practicegenius_worksheets', JSON.stringify(updatedWorksheets));
    }

    // Also remove any user downloads for this worksheet
    const updatedUserDownloads = userDownloads.filter(download => download.worksheetId !== id);
    setUserDownloads(updatedUserDownloads);
    
    // Only update localStorage in browser environment
    if (typeof window !== 'undefined') {
      localStorage.setItem('practicegenius_user_downloads', JSON.stringify(updatedUserDownloads));
    }
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
    
    // Only update localStorage in browser environment
    if (typeof window !== 'undefined') {
      localStorage.setItem('practicegenius_worksheets', JSON.stringify(updatedWorksheets));
    }

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
      
      // Only update localStorage in browser environment
      if (typeof window !== 'undefined') {
        localStorage.setItem('practicegenius_user_downloads', JSON.stringify(updatedUserDownloads));
      }
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
    console.log('===== GET ADMIN WORKSHEETS CALLED =====');
    
    // Always load the latest worksheets from localStorage first
    let currentWorksheets = [...worksheets];
    if (typeof window !== 'undefined') {
      try {
        const storedWorksheets = localStorage.getItem('practicegenius_worksheets');
        if (storedWorksheets) {
          currentWorksheets = JSON.parse(storedWorksheets);
          console.log(`Loaded ${currentWorksheets.length} worksheets from localStorage`);
        }
      } catch (e) {
        console.error('Error loading worksheets from localStorage:', e);
      }
    }
    
    console.log('Total worksheets in context:', currentWorksheets.length);
    
    // Debug each worksheet in the array
    currentWorksheets.forEach((w, index) => {
      console.log(`Worksheet ${index + 1}:`, {
        id: w.id,
        title: w.title,
        createdBy: w.createdBy,
        isPublic: w.isPublic,
        subscriptionLevel: w.subscriptionLevel,
        plan: w.plan
      });
    });
    
    console.log('Worksheets with createdBy property:', currentWorksheets.filter(w => w.createdBy !== undefined).length);
    console.log('Admin worksheets:', currentWorksheets.filter(w => w.createdBy === 'admin').length);
    console.log('Public worksheets:', currentWorksheets.filter(w => w.isPublic === true).length);
    
    // IMPORTANT: For the public worksheets page, we need to return ALL worksheets
    // This ensures any worksheet created in the admin interface will appear
    
    // Make sure all worksheets have proper properties
    const validWorksheets = currentWorksheets.map(worksheet => ({
      ...worksheet,
      createdBy: worksheet.createdBy || 'admin',
      isPublic: worksheet.isPublic !== false,
      plan: worksheet.plan || 'Free'
    }));
    
    // Update state with the valid worksheets
    if (JSON.stringify(validWorksheets) !== JSON.stringify(worksheets)) {
      setWorksheets(validWorksheets);
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('practicegenius_worksheets', JSON.stringify(validWorksheets));
        console.log(`Updated ${validWorksheets.length} worksheets in localStorage`);
      }
    }
    
    console.log('===== END GET ADMIN WORKSHEETS =====');
    return validWorksheets;
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
