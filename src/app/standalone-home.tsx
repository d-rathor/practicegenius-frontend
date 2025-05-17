"use client";

import React from 'react';
import Link from 'next/link';

export default function StandaloneHome() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/Logo3.png" 
                alt="PracticeGenius Logo" 
                className="mr-2 h-10 w-auto object-contain"
              />
              <span className="text-xl font-bold text-[#ff6b00]">
                Practice<span className="text-[#333333]">Genius</span>
              </span>
            </Link>
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="font-medium text-[#ff6b00]">
              Home
            </Link>
            <Link href="/worksheets" className="font-medium text-[#333333] hover:text-[#ff6b00] transition-colors">
              Worksheets
            </Link>
            <Link href="/pricing" className="font-medium text-[#333333] hover:text-[#ff6b00] transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="font-medium text-[#333333] hover:text-[#ff6b00] transition-colors">
              About
            </Link>
            <Link href="/contact" className="font-medium text-[#333333] hover:text-[#ff6b00] transition-colors">
              Contact
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="px-4 py-2 border border-gray-300 rounded-lg text-[#333333] hover:bg-gray-50 transition-colors">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#e05f00] transition-colors">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#333333] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-[#ff6b00]">Quality Worksheets</span> for Your Child's Success
            </h1>
            <p className="text-xl mb-8">
              Access premium educational worksheets for grades 1-5 in Math, Science, and English.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff6b00] text-white rounded-lg hover:bg-[#e05f00] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                Get Started Now
              </Link>
              <Link href="/worksheets" className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-[#333333] transition-colors">
                Browse Worksheets
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black bg-opacity-20 p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#ff6b00]">500+</div>
                <div className="text-gray-300">Worksheets</div>
              </div>
              <div className="bg-black bg-opacity-20 p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#ff6b00]">5</div>
                <div className="text-gray-300">Grade Levels</div>
              </div>
              <div className="bg-black bg-opacity-20 p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#ff6b00]">3</div>
                <div className="text-gray-300">Subjects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose PracticeGenius?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#ff6b00] mb-4">Expertly Crafted</h3>
              <p className="text-gray-700">Our worksheets are designed by experienced educators to align with curriculum standards.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#ff6b00] mb-4">Easy to Use</h3>
              <p className="text-gray-700">Download, print, and start learning immediately with our user-friendly worksheets.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#ff6b00] mb-4">Comprehensive Coverage</h3>
              <p className="text-gray-700">From basic concepts to advanced topics, we cover the full spectrum of learning needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Choose the plan that works best for your needs</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-3xl font-bold mb-4">₹0 <span className="text-sm font-normal text-gray-600">forever</span></p>
              <p className="text-gray-600 mb-6">Basic access to limited worksheets</p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff6b00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Access to 2 worksheets per grade
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff6b00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Preview all worksheets
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff6b00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Basic support
                </li>
              </ul>
              <Link href="/register" className="block text-center py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors w-full">
                Get Started
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-[#ff6b00] relative transform scale-105">
              <div className="absolute top-0 right-0 bg-[#ff6b00] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Essential</h3>
              <p className="text-3xl font-bold mb-4">₹199 <span className="text-sm font-normal text-gray-600">per month</span></p>
              <p className="text-gray-600 mb-6">Perfect for regular learning needs</p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff6b00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Access to all Essential worksheets
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff6b00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Unlimited downloads
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff6b00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Monthly new worksheets
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff6b00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Email support
                </li>
              </ul>
              <Link href="/cart?plan=essential" className="block text-center py-2 px-4 bg-[#ff6b00] text-white rounded-lg hover:bg-[#e05f00] transition-colors w-full">
                Subscribe Now
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-3xl font-bold mb-4">₹399 <span className="text-sm font-normal text-gray-600">per month</span></p>
              <p className="text-gray-600 mb-6">Complete access to all resources</p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff6b00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Access to ALL worksheets
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff6b00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Unlimited downloads
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff6b00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Priority access to new worksheets
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#ff6b00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Premium support
                </li>
              </ul>
              <Link href="/cart?plan=premium" className="block text-center py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors w-full">
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#ff6b00]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to enhance your child's education?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">Join thousands of parents who trust PracticeGenius for quality educational resources.</p>
          <Link href="/register" className="inline-block py-3 px-8 bg-white text-[#ff6b00] font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center mb-4">
                <img 
                  src="/images/Logo3.png" 
                  alt="PracticeGenius Logo" 
                  className="mr-2 h-8 w-auto object-contain"
                />
                <span className="text-lg font-bold text-[#ff6b00]">
                  Practice<span className="text-[#333333]">Genius</span>
                </span>
              </Link>
              <p className="text-gray-600">Quality educational worksheets for grades 1-5 in Math, Science, and English.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-[#ff6b00]">Home</Link>
                </li>
                <li>
                  <Link href="/worksheets" className="text-gray-600 hover:text-[#ff6b00]">Worksheets</Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-600 hover:text-[#ff6b00]">Pricing</Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-[#ff6b00]">About Us</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-[#ff6b00]">Contact</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-[#ff6b00]">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-[#ff6b00]">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/refund" className="text-gray-600 hover:text-[#ff6b00]">Refund Policy</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600 mb-2">Email: support@practicegenius.com</p>
              <p className="text-gray-600 mb-4">Phone: +91 123-456-7890</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-[#ff6b00]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#ff6b00]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm2.99 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#ff6b00]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-600">© 2025 PracticeGenius. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
