'use client';

import React from 'react';
import Image from 'next/image';
import MainLayout from '@/components/MainLayout';
import { Transition } from '@headlessui/react';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="bg-white min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="order-2 md:order-1">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="/qwe1-edited.jpg" 
                  alt="About Practice Genius" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="order-1 md:order-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                About <span className="text-[#ff6b00]">Practice Genius</span>
              </h1>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Practice Genius was founded with a simple mission: to make high-quality educational resources accessible to all students.
                </p>
                
                <p>
                  Our team of experienced educators and curriculum specialists has developed a comprehensive library of worksheets that align with educational standards and promote effective learning.
                </p>
                
                <p>
                  We believe that practice is essential for mastery, and our worksheets provide the perfect opportunity for students to reinforce concepts learned in the classroom.
                </p>
                
                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Approach</h2>
                
                <p>
                  Each worksheet is carefully designed to be engaging, age-appropriate, and pedagogically sound. We focus on:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Clear, concise instructions that students can understand</li>
                  <li>Progressive difficulty levels to challenge learners appropriately</li>
                  <li>Varied question formats to maintain engagement</li>
                  <li>Visual elements that support learning objectives</li>
                  <li>Alignment with curriculum standards across multiple regions</li>
                </ul>
              </div>
              
              <div className="mt-8">
                <a 
                  href="/worksheets" 
                  className="inline-block px-6 py-3 bg-[#ff6b00] text-white font-medium rounded-lg shadow-md hover:bg-[#e05f00] transition-colors duration-300"
                >
                  Explore Our Worksheets
                </a>
              </div>
            </div>
          </div>
          

          
          {/* Values Section */}
          <div className="mt-20 bg-gray-50 rounded-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Value 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6b00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality</h3>
                <p className="text-gray-600">
                  We are committed to creating high-quality educational resources that meet the needs of students and teachers.
                </p>
              </div>
              
              {/* Value 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6b00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously explore new approaches to make learning more effective and engaging.
                </p>
              </div>
              
              {/* Value 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6b00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Inclusivity</h3>
                <p className="text-gray-600">
                  We design our resources to be accessible and beneficial for students of all backgrounds and abilities.
                </p>
              </div>
              
              {/* Value 4 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6b00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Education</h3>
                <p className="text-gray-600">
                  We believe in the power of education to transform lives and are dedicated to supporting student success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
