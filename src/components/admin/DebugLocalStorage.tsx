"use client";

import React, { useState, useEffect } from 'react';

const DebugLocalStorage: React.FC = () => {
  const [storageData, setStorageData] = useState<Record<string, any>>({});
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data: Record<string, any> = {};
      
      // Get all localStorage keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          try {
            const value = localStorage.getItem(key);
            if (value) {
              data[key] = JSON.parse(value);
            }
          } catch (e) {
            console.error(`Error parsing ${key}:`, e);
            data[key] = 'Error parsing JSON';
          }
        }
      }
      
      setStorageData(data);
    }
  }, []);
  
  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium mb-2">LocalStorage Debug</h3>
      <div>
        {Object.keys(storageData).map(key => (
          <div key={key} className="mb-4">
            <h4 className="font-medium">{key}</h4>
            {Array.isArray(storageData[key]) ? (
              <div>
                <p>Array length: {storageData[key].length}</p>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
                  {JSON.stringify(storageData[key].slice(0, 3), null, 2)}
                  {storageData[key].length > 3 && '... (truncated)'}
                </pre>
              </div>
            ) : (
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
                {JSON.stringify(storageData[key], null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugLocalStorage;
