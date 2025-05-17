"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  isLoggedIn: boolean;
  userRole?: string;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isLoggedIn = false, 
  userRole = 'user',
  onLogout 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <header className="bg-white shadow-md py-3 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/Logo3.png" 
              alt="PracticeGenius Logo" 
              className="mr-2 h-10 w-auto object-contain"
            />
            <span className="text-xl font-bold text-primary">
              Practice<span className="text-secondary">Genius</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              href="/" 
              className={`font-medium hover:text-primary transition-colors ${
                pathname === '/' ? 'text-primary' : 'text-secondary'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/worksheets" 
              className={`font-medium hover:text-primary transition-colors ${
                pathname?.startsWith('/worksheets') ? 'text-primary' : 'text-secondary'
              }`}
            >
              Worksheets
            </Link>
            <Link 
              href="/pricing" 
              className={`font-medium hover:text-primary transition-colors ${
                pathname === '/pricing' ? 'text-primary' : 'text-secondary'
              }`}
            >
              Pricing
            </Link>
            <Link 
              href="/about" 
              className={`font-medium hover:text-primary transition-colors ${
                pathname === '/about' ? 'text-primary' : 'text-secondary'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`font-medium hover:text-primary transition-colors ${
                pathname === '/contact' ? 'text-primary' : 'text-secondary'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative group">
                <button className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2">
                  <span>My Account</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
                  <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  {userRole === 'admin' && (
                    <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={onLogout} 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="bg-transparent border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className={`px-4 py-2 rounded-md ${pathname === '/' ? 'bg-gray-100 text-primary' : 'text-secondary hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/worksheets" 
                className={`px-4 py-2 rounded-md ${pathname?.startsWith('/worksheets') ? 'bg-gray-100 text-primary' : 'text-secondary hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Worksheets
              </Link>
              <Link 
                href="/pricing" 
                className={`px-4 py-2 rounded-md ${pathname === '/pricing' ? 'bg-gray-100 text-primary' : 'text-secondary hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/about" 
                className={`px-4 py-2 rounded-md ${pathname === '/about' ? 'bg-gray-100 text-primary' : 'text-secondary hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`px-4 py-2 rounded-md ${pathname === '/contact' ? 'bg-gray-100 text-primary' : 'text-secondary hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            
            {/* Mobile Auth Links */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-2">
                  <Link 
                    href="/dashboard" 
                    className="px-4 py-2 text-secondary hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/profile" 
                    className="px-4 py-2 text-secondary hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {userRole === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="px-4 py-2 text-secondary hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      if (onLogout) onLogout();
                      setIsMenuOpen(false);
                    }} 
                    className="px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    href="/login" 
                    className="px-4 py-2 text-secondary hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="px-4 py-2 bg-primary text-white rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
