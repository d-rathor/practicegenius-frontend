"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Boost Your Child's Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-white opacity-90">
            Join thousands of parents and teachers who trust PracticeGenius for quality educational worksheets.
            Get started today and see the difference in your child's academic performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register" 
              className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 flex items-center justify-center gap-2"
            >
              <Image 
                src="/images/Get Started Now2.png" 
                alt="Get Started" 
                width={24} 
                height={24}
                className="w-6 h-6"
              />
              Get Started Now
            </Link>
            <Link 
              href="/worksheets" 
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
            >
              Browse Worksheets
            </Link>
          </div>
          <p className="mt-8 text-white opacity-80">
            No credit card required for free access. Cancel paid subscriptions anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
