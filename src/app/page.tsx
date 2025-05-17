import React from 'react';
import MainLayout from '@/components/MainLayout';
import Link from 'next/link';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Quality Worksheets</span> for Your Child's Success
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Access premium educational worksheets for grades 1-5 in Math, Science, and English.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/register" className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                Get Started Now
              </Link>
              <Link href="/worksheets" className="bg-transparent border border-white text-white font-medium py-2 px-6 rounded-lg hover:bg-white hover:text-secondary transition-colors">
                Browse Worksheets
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-black bg-opacity-20 rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">500+</h3>
                <p className="text-gray-300">Worksheets</p>
              </div>
              <div className="text-center p-4 bg-black bg-opacity-20 rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">5</h3>
                <p className="text-gray-300">Grade Levels</p>
              </div>
              <div className="text-center p-4 bg-black bg-opacity-20 rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">3</h3>
                <p className="text-gray-300">Subjects</p>
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
              <h3 className="text-xl font-semibold text-primary mb-4">Expertly Crafted</h3>
              <p className="text-gray-700">Our worksheets are designed by experienced educators to align with curriculum standards.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary mb-4">Easy to Use</h3>
              <p className="text-gray-700">Download, print, and start learning immediately with our user-friendly worksheets.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary mb-4">Comprehensive Coverage</h3>
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
                <li className="flex items-center"><svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Access to 2 worksheets per grade</li>
                <li className="flex items-center"><svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Preview all worksheets</li>
                <li className="flex items-center"><svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Basic support</li>
              </ul>
              <Link href="/register" className="block text-center py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors w-full">Get Started</Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-primary relative transform scale-105">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <h3 className="text-xl font-bold mb-2">Essential</h3>
              <p className="text-3xl font-bold mb-4">₹199 <span className="text-sm font-normal text-gray-600">per month</span></p>
              <p className="text-gray-600 mb-6">Perfect for regular learning needs</p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center"><svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Access to all Essential worksheets</li>
                <li className="flex items-center"><svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Unlimited downloads</li>
                <li className="flex items-center"><svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Monthly new worksheets</li>
                <li className="flex items-center"><svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Email support</li>
              </ul>
              <Link href="/cart?plan=essential" className="block text-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-full">Subscribe Now</Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-3xl font-bold mb-4">₹399 <span className="text-sm font-normal text-gray-600">per month</span></p>
              <p className="text-gray-600 mb-6">Complete access to all resources</p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center"><svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Access to ALL worksheets</li>
                <li className="flex items-center"><svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Unlimited downloads</li>
                <li className="flex items-center"><svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Priority access to new worksheets</li>
                <li className="flex items-center"><svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Premium support</li>
              </ul>
              <Link href="/cart?plan=premium" className="block text-center py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors w-full">Subscribe Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to enhance your child's education?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">Join thousands of parents who trust PracticeGenius for quality educational resources.</p>
          <Link href="/register" className="inline-block py-3 px-8 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">Get Started Today</Link>
        </div>
      </section>
    </MainLayout>
  );
}
