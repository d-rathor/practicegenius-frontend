import React from 'react';
import MainLayout from '@/components/MainLayout';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function PricingPage() {
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
      limitations: [
        'Limited worksheet access',
        'No new worksheet updates',
        'Basic support only'
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
      limitations: [
        'No access to Premium worksheets',
        'Standard support response time'
      ],
      buttonText: 'Subscribe Now',
      buttonLink: '/checkout?plan=essential',
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
      limitations: [],
      buttonText: 'Subscribe Now',
      buttonLink: '/checkout?plan=premium',
      highlighted: false
    }
  ];

  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-16">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that works best for you and your child's educational needs.
              No hidden fees, cancel anytime.
            </p>
          </div>

          {/* Pricing Toggle (Monthly/Annual) */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-1 inline-flex shadow-sm">
              <button className="px-6 py-2 rounded-full bg-primary text-white font-medium">
                Monthly
              </button>
              <button className="px-6 py-2 rounded-full text-gray-700 font-medium">
                Annual (Save 20%)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                <div className={`p-8 bg-white ${plan.highlighted ? 'pt-10' : ''}`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckIcon className={`h-5 w-5 ${plan.highlighted ? 'text-primary' : 'text-green-500'} mr-2 mt-0.5 flex-shrink-0`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, i) => (
                          <li key={i} className="flex items-start text-gray-600">
                            <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Link 
                    href={plan.buttonLink} 
                    className={`btn w-full ${
                      plan.highlighted ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-5">
                  <h3 className="font-semibold text-lg">Can I switch between plans?</h3>
                  <p className="mt-2 text-gray-600">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-5">
                  <h3 className="font-semibold text-lg">How do I cancel my subscription?</h3>
                  <p className="mt-2 text-gray-600">
                    You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-5">
                  <h3 className="font-semibold text-lg">Do you offer refunds?</h3>
                  <p className="mt-2 text-gray-600">
                    We offer a 7-day money-back guarantee if you're not satisfied with your subscription. Contact our support team within 7 days of your purchase to request a refund.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-5">
                  <h3 className="font-semibold text-lg">Do you offer discounts for schools?</h3>
                  <p className="mt-2 text-gray-600">
                    Yes, we offer special pricing for schools and educational institutions. Please contact our sales team for more information about bulk licensing options.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-primary text-white rounded-xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of parents and teachers who trust PracticeGenius for quality educational worksheets.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/register" 
                className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
              >
                Create Free Account
              </Link>
              <Link 
                href="/contact" 
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
