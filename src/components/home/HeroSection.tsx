"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-secondary to-secondary-dark text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("/patterns/grid.svg")',
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-primary">Quality Worksheets</span> for Your Child's Success
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Access premium educational worksheets for grades 1-5 in Math, Science, and English.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link href="/register" className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors text-lg flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                Get Started Now
              </Link>
              <Link href="/worksheets" className="bg-transparent border border-white text-white font-medium py-2 px-6 rounded-lg hover:bg-white hover:text-secondary transition-colors text-lg">
                Browse Worksheets
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-black bg-opacity-20 rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">500+</h3>
                <p className="text-gray-300 text-sm">Worksheets</p>
              </div>
              <div className="text-center p-3 bg-black bg-opacity-20 rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">5</h3>
                <p className="text-gray-300 text-sm">Grade Levels</p>
              </div>
              <div className="text-center p-3 bg-black bg-opacity-20 rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">3</h3>
                <p className="text-gray-300 text-sm">Subjects</p>
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/images/Children1.png" 
                alt="Students learning with PracticeGenius worksheets" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
