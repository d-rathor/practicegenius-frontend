"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Basic access to limited worksheets',
      features: [
        'Access to 2 worksheets per grade and subject',
        'Preview all worksheets',
        'Basic support',
        'No credit card required'
      ],
      buttonText: 'Get Started',
      buttonLink: '/register',
      highlighted: false
    },
    {
      name: 'Essential',
      price: '₹199',
      period: 'per month',
      description: 'Perfect for regular learning needs',
      features: [
        'Access to all Essential worksheets (Grades 1-5)',
        'Unlimited downloads',
        'Monthly new worksheets',
        'Email support',
        'Cancel anytime'
      ],
      buttonText: 'Subscribe Now',
      buttonLink: '/pricing?plan=essential',
      highlighted: true
    },
    {
      name: 'Premium',
      price: '₹399',
      period: 'per month',
      description: 'Complete access to all resources',
      features: [
        'Access to ALL worksheets (Grades 1-5)',
        'Unlimited downloads',
        'Priority access to new worksheets',
        'Premium support',
        'Cancel anytime'
      ],
      buttonText: 'Subscribe Now',
      buttonLink: '/pricing?plan=premium',
      highlighted: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you and your child's educational needs.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-xl overflow-hidden transition-all ${
                plan.highlighted 
                  ? 'shadow-xl transform hover:-translate-y-2 border-2 border-primary relative' 
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 inset-x-0 bg-primary text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${plan.highlighted ? 'pt-10' : ''}`}>
                {/* Plan icon/image */}
                <div className="flex justify-center mb-4">
                  <Image 
                    src={plan.name === 'Essential' ? '/images/Essential  Plan.png' : 
                         plan.name === 'Premium' ? '/images/Premim Plan.png' : 
                         '/images/Logo1.png'} 
                    alt={`${plan.name} Plan`}
                    width={80}
                    height={80}
                    className="h-16 w-auto"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg 
                        className={`h-5 w-5 ${plan.highlighted ? 'text-primary' : 'text-green-500'} mr-2 mt-0.5`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href={plan.buttonLink} 
                  className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.highlighted 
                      ? 'bg-primary text-white hover:bg-primary-dark' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {plan.name === 'Free' ? (
                    <Image 
                      src="/images/Sign Up.png" 
                      alt="Sign Up" 
                      width={24} 
                      height={24}
                      className="w-5 h-5"
                    />
                  ) : (
                    <Image 
                      src="/images/Get Started Now.png" 
                      alt="Subscribe" 
                      width={24} 
                      height={24}
                      className="w-5 h-5"
                    />
                  )}
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional spacing */}
        <div className="mt-8"></div>
      </div>
    </section>
  );
};

export default PricingSection;
