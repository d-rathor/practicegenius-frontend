"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

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
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-50 h-20 md:h-24 flex items-center">
      <div className="container mx-auto px-4 w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-24 w-24 mr-3">
              <img 
                src="/images/Logo3.png" 
                alt="PracticeGenius Logo"
                className="h-24 w-auto object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-[#ff6b00]">
              Practice<span className="text-[#333333]">Genius</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`font-medium hover:text-[#ff6b00] transition-colors ${
                pathname === '/' ? 'text-[#ff6b00]' : 'text-[#333333]'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/worksheets" 
              className={`font-medium hover:text-[#ff6b00] transition-colors ${
                pathname?.startsWith('/worksheets') ? 'text-[#ff6b00]' : 'text-[#333333]'
              }`}
            >
              Worksheets
            </Link>
            <Link 
              href="/pricing" 
              className={`font-medium hover:text-[#ff6b00] transition-colors ${
                pathname === '/pricing' ? 'text-[#ff6b00]' : 'text-[#333333]'
              }`}
            >
              Pricing
            </Link>
            <Link 
              href="/about" 
              className={`font-medium hover:text-[#ff6b00] transition-colors ${
                pathname === '/about' ? 'text-[#ff6b00]' : 'text-[#333333]'
              }`}
            >
              About
            </Link>
            <Link 
              href="/help" 
              className={`font-medium hover:text-[#ff6b00] transition-colors ${
                pathname === '/help' ? 'text-[#ff6b00]' : 'text-[#333333]'
              }`}
            >
              Help
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative group">
                <button className="bg-[#ff6b00] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#e05f00] transition-colors flex items-center space-x-2">
                  <span>My Account</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-50">
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
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-[#ff6b00] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#e05f00] transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center p-2 rounded-md text-gray-600 hover:text-[#ff6b00] hover:bg-gray-100"
            onClick={toggleMenu}
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
        <div 
          className={`md:hidden absolute left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-b-lg z-50 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen py-4 mt-2' : 'max-h-0'}`}
        >
          <div className="flex flex-col space-y-1">
            <Link 
              href="/" 
              className={`px-4 py-3 ${pathname === '/' ? 'text-[#ff6b00] font-medium' : 'text-gray-700 hover:text-[#ff6b00]'} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/worksheets" 
              className={`px-4 py-3 ${pathname?.startsWith('/worksheets') ? 'text-[#ff6b00] font-medium' : 'text-gray-700 hover:text-[#ff6b00]'} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Worksheets
            </Link>
            <Link 
              href="/pricing" 
              className={`px-4 py-3 ${pathname === '/pricing' ? 'text-[#ff6b00] font-medium' : 'text-gray-700 hover:text-[#ff6b00]'} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/about" 
              className={`px-4 py-3 ${pathname === '/about' ? 'text-[#ff6b00] font-medium' : 'text-gray-700 hover:text-[#ff6b00]'} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/help" 
              className={`px-4 py-3 ${pathname === '/help' ? 'text-[#ff6b00] font-medium' : 'text-gray-700 hover:text-[#ff6b00]'} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>

            {/* Auth Links */}
            <div className="pt-4 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 text-[#333333] hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-[#333333] hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {userRole === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="block px-4 py-2 text-[#333333] hover:bg-gray-100 rounded-md"
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
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    href="/login" 
                    className="block px-4 py-2 text-center border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="block px-4 py-2 text-center bg-[#ff6b00] text-white rounded-md hover:bg-[#e05f00]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
