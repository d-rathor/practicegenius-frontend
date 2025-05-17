"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user');

  // Check if user is logged in on component mount
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      // Check for practicegenius_session in localStorage (our development auth)
      const sessionData = localStorage.getItem('practicegenius_session');
      if (sessionData) {
        try {
          const session = JSON.parse(sessionData);
          // Check if session is expired
          if (new Date(session.expires) > new Date()) {
            setIsLoggedIn(true);
            setUserRole(session.user.role || 'user');
          } else {
            // Session expired, clean up
            localStorage.removeItem('practicegenius_session');
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Error parsing session data:', error);
          localStorage.removeItem('practicegenius_session');
          setIsLoggedIn(false);
        }
      }
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('practicegenius_session');
      setIsLoggedIn(false);
      setUserRole('user');
      window.location.href = '/';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        isLoggedIn={isLoggedIn} 
        userRole={userRole} 
        onLogout={handleLogout} 
      />
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
