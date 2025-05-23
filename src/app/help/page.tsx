'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  
  const categories = [
    { id: 'general', name: 'General Questions' },
    { id: 'account', name: 'Account & Subscription' },
    { id: 'worksheets', name: 'Using Worksheets' },
    { id: 'teachers', name: 'For Teachers' },
    { id: 'parents', name: 'For Parents' },
    { id: 'technical', name: 'Technical Support' },
  ];
  
  const faqs = {
    general: [
      {
        question: 'What is Practice Genius?',
        answer: 'Practice Genius is an educational platform that provides high-quality printable and interactive worksheets for students in grades 1-5. Our worksheets cover subjects including Math, Science, and English, designed to complement classroom learning and provide additional practice opportunities.'
      },
      {
        question: 'How do I get started with Practice Genius?',
        answer: 'Getting started is easy! Simply create a free account to access our basic worksheets. For full access to our premium content, you can subscribe to one of our affordable plans. Once registered, you can browse worksheets by subject, grade level, or topic.'
      },
      {
        question: 'Are the worksheets aligned with educational standards?',
        answer: 'Yes, all our worksheets are carefully designed to align with common educational standards. Our team of experienced educators ensures that the content is age-appropriate and pedagogically sound.'
      },
      {
        question: 'Can I use Practice Genius on mobile devices?',
        answer: 'Absolutely! Practice Genius is fully responsive and works on smartphones, tablets, and computers. You can access your worksheets anytime, anywhere.'
      }
    ],
    account: [
      {
        question: 'How do I create an account?',
        answer: 'To create an account, click on the "Register" button in the top right corner of the page. Fill in your details, verify your email address, and you\'re ready to go!'
      },
      {
        question: 'What subscription plans do you offer?',
        answer: 'We offer several subscription options: Monthly ($9.99/month), Annual ($89.99/year, save 25%), and Family Plan ($129.99/year for up to 5 users). Teachers can also inquire about our special school pricing.'
      },
      {
        question: 'How do I cancel my subscription?',
        answer: 'You can cancel your subscription at any time from your account settings. Navigate to "My Account" > "Subscription" and click on "Cancel Subscription". Your access will continue until the end of your billing period.'
      },
      {
        question: 'Can I upgrade or downgrade my plan?',
        answer: 'Yes, you can change your subscription plan at any time. Any changes will take effect at the start of your next billing cycle.'
      }
    ],
    worksheets: [
      {
        question: 'How do I find worksheets for a specific topic?',
        answer: 'You can use our search function or browse worksheets by subject, grade level, or topic. We also offer curated collections for popular topics and seasonal themes.'
      },
      {
        question: 'Can I print the worksheets?',
        answer: 'Yes, all our worksheets are designed to be printer-friendly. Simply click the "Print" button on any worksheet page to generate a clean, printable version.'
      },
      {
        question: 'Are answer keys provided?',
        answer: 'Yes, answer keys are available for all our worksheets. Premium subscribers can access answer keys directly, while free users can see answers for selected worksheets.'
      },
      {
        question: 'Can I save worksheets for later use?',
        answer: 'Yes, you can save worksheets to your favorites for quick access later. Premium users can also organize worksheets into custom collections.'
      }
    ],
    teachers: [
      {
        question: 'Can I use Practice Genius worksheets in my classroom?',
        answer: 'Absolutely! Our worksheets are designed with classroom use in mind. Teachers can use our worksheets for in-class activities, homework assignments, or supplementary practice.'
      },
      {
        question: 'Do you offer school or district licenses?',
        answer: 'Yes, we offer special pricing for schools and districts. Please contact our education team at education@practicegenius.com for more information.'
      },
      {
        question: 'Can I track my students\' progress?',
        answer: 'With our premium teacher accounts, you can create student groups, assign worksheets, and track completion and performance. This feature helps you identify areas where students may need additional support.'
      },
      {
        question: 'Can I customize worksheets for my class?',
        answer: 'Premium teacher accounts include access to our worksheet editor, allowing you to customize existing worksheets or create your own to perfectly match your curriculum.'
      }
    ],
    parents: [
      {
        question: 'How can Practice Genius help my child?',
        answer: 'Practice Genius provides additional practice opportunities to reinforce concepts learned in school. Regular practice helps build confidence, improve understanding, and develop essential skills.'
      },
      {
        question: 'Which grade levels do you support?',
        answer: 'We currently offer worksheets for grades 1-5, with plans to expand to additional grade levels in the future.'
      },
      {
        question: 'How do I know which worksheets are right for my child?',
        answer: 'You can browse worksheets by grade level and subject. We also provide difficulty ratings and prerequisite skills to help you choose appropriate worksheets for your child\'s current level.'
      },
      {
        question: 'Can I track my child\'s progress?',
        answer: 'Yes, with a family account, you can monitor your child\'s activity, including completed worksheets and performance metrics. This helps you identify areas where they might need additional support.'
      }
    ],
    technical: [
      {
        question: 'I forgot my password. How do I reset it?',
        answer: 'Click on "Login" and then select "Forgot Password". Enter your email address, and we\'ll send you instructions to reset your password.'
      },
      {
        question: 'The worksheets aren\'t displaying correctly. What should I do?',
        answer: 'First, try refreshing your browser. If the issue persists, clear your browser cache or try using a different browser. If you\'re still experiencing problems, please contact our support team.'
      },
      {
        question: 'Can I use Practice Genius offline?',
        answer: 'While our platform requires an internet connection to access, you can download and print worksheets for offline use.'
      },
      {
        question: 'How do I report a technical issue or bug?',
        answer: 'If you encounter any technical issues, please contact our support team at support@practicegenius.com with details of the problem, including screenshots if possible.'
      }
    ]
  };

  return (
    <MainLayout>
      <div className="bg-white min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Help Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How Can We <span className="text-[#ff6b00]">Help You?</span>
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to frequently asked questions about Practice Genius. If you can't find what you're looking for, please don't hesitate to contact our support team.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-[#ff6b00] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            {faqs[activeCategory].map((faq, index) => (
              <Disclosure as="div" key={index} className="mb-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-gray-800 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-[#ff6b00] focus-visible:ring-opacity-50">
                      <span className="font-medium">{faq.question}</span>
                      <ChevronDownIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-[#ff6b00]`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-6 py-4 text-gray-600 bg-white border border-gray-100 rounded-b-lg">
                        {faq.answer}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>

          {/* Contact Support Section */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to assist you with any questions or issues you might have.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a
                href="mailto:support@practicegenius.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#ff6b00] text-white font-medium rounded-lg shadow-md hover:bg-[#e05f00] transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
              <button
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#ff6b00] border border-[#ff6b00] font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-300"
                onClick={() => window.open('https://practicegenius.com/live-chat', '_blank')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
