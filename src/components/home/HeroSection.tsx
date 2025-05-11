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
      
      <div className="container-custom relative z-10 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-primary">Quality Worksheets</span> for Your Child's Success
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Access premium educational worksheets for grades 1-5 in Math, Science, and English.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link href="/register" className="btn btn-primary text-lg flex items-center justify-center gap-2">
                <Image 
                  src="/images/Get Started Now.png" 
                  alt="Get Started" 
                  width={24} 
                  height={24}
                  className="w-6 h-6"
                />
                Get Started Now
              </Link>
              <Link href="/worksheets" className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary text-lg">
                Browse Worksheets
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-black bg-opacity-20 rounded-lg">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">500+</h3>
                <p className="text-gray-300">Worksheets</p>
              </div>
              <div className="text-center p-4 bg-black bg-opacity-20 rounded-lg">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">5</h3>
                <p className="text-gray-300">Grade Levels</p>
              </div>
              <div className="text-center p-4 bg-black bg-opacity-20 rounded-lg md:col-span-1 col-span-2">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">3</h3>
                <p className="text-gray-300">Subjects</p>
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/Children1.png" 
                alt="Students learning with PracticeGenius worksheets" 
                width={600} 
                height={450}
                className="w-full h-auto"
              />
            </div>
            
            {/* No decorative elements */}
          </div>
        </div>
        
        {/* Additional space at the bottom */}
        <div className="mt-16"></div>
      </div>
    </section>
  );
};

export default HeroSection;
