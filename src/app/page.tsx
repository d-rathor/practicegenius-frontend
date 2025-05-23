import React from 'react';
import MainLayout from '@/components/MainLayout';
import Link from 'next/link';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section with image at top left, content unchanged */}
      <section className="relative bg-black py-12 md:py-24">
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Left: Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Use heading font for headings, sans (Inter) for other text */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
              <span className="text-primary">Quality Worksheets</span> <span className="text-white">for Your Child's Success</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 font-sans">
              Access premium educational worksheets for grades 1-5 in Math, Science, and English.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 font-sans">
              <Link href="/register" className="bg-primary text-white font-semibold py-3 px-7 rounded-lg shadow hover:bg-primary-dark transition">
                Get Started Now
              </Link>
              <Link href="/worksheets" className="bg-white border border-primary text-primary font-semibold py-3 px-7 rounded-lg shadow hover:bg-primary hover:text-white transition">
                Browse Worksheets
              </Link>
            </div>
            <div className="flex gap-6 justify-center md:justify-start font-sans">
              <div className="bg-secondary-dark rounded-lg px-6 py-4 shadow text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary font-heading">500+</div>
                <div className="text-gray-300 text-sm font-sans">Worksheets</div>
              </div>
              <div className="bg-secondary-dark rounded-lg px-6 py-4 shadow text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary font-heading">5</div>
                <div className="text-gray-300 text-sm font-sans">Grade Levels</div>
              </div>
              <div className="bg-secondary-dark rounded-lg px-6 py-4 shadow text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary font-heading">3</div>
                <div className="text-gray-300 text-sm font-sans">Subjects</div>
              </div>
            </div>
          </div>
          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/images/children1.png"
              alt="Children studying"
              className="rounded-2xl shadow-lg border-4 border-white max-w-full h-auto object-cover"
              style={{ maxHeight: '400px' }}
            />
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
      <section className="py-16 bg-primary">
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
              <p className="text-3xl font-bold mb-4">₹499 <span className="text-sm font-normal text-gray-600">per month</span></p>
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
              <p className="text-3xl font-bold mb-4">₹999 <span className="text-sm font-normal text-gray-600">per month</span></p>
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

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 font-heading">What Parents Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-xl shadow-md p-6 flex flex-col items-center">
              <svg className="h-8 w-8 text-primary mb-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414l-7 7a1 1 0 000 1.414z" /></svg>
              <p className="text-lg text-gray-700 font-sans mb-4 italic">"PracticeGenius has made learning fun for my daughter. The worksheets are engaging and easy to follow!"</p>
              <div className="font-bold text-primary font-heading">— Priya S., Mumbai</div>
            </div>
            <div className="bg-gray-100 rounded-xl shadow-md p-6 flex flex-col items-center">
              <svg className="h-8 w-8 text-primary mb-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414l-7 7a1 1 0 000 1.414z" /></svg>
              <p className="text-lg text-gray-700 font-sans mb-4 italic">"I love the variety of subjects and the quality of the content. My son looks forward to his study time now!"</p>
              <div className="font-bold text-primary font-heading">— Rahul M., Bengaluru</div>
            </div>
            <div className="bg-gray-100 rounded-xl shadow-md p-6 flex flex-col items-center">
              <svg className="h-8 w-8 text-primary mb-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414l-7 7a1 1 0 000 1.414z" /></svg>
              <p className="text-lg text-gray-700 font-sans mb-4 italic">"The worksheets are well-structured and really help reinforce what my kids learn in school. Highly recommended!"</p>
              <div className="font-bold text-primary font-heading">— Anita D., Delhi</div>
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
