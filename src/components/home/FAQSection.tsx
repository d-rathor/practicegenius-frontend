"use client";

import React, { useState } from 'react';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What grade levels do your worksheets cover?",
      answer: "Our worksheets are designed for students in grades 1 through 5, covering age-appropriate content for each level."
    },
    {
      question: "Which subjects are available?",
      answer: "We currently offer worksheets in three core subjects: Mathematics, Science, and English. Each subject has comprehensive coverage of the curriculum for grades 1-5."
    },
    {
      question: "How many worksheets can I access with a free account?",
      answer: "Free accounts can access 2 worksheets per grade and subject. For example, you can download 2 Math worksheets for Grade 1, 2 Science worksheets for Grade 1, and so on."
    },
    {
      question: "What's the difference between Essential and Premium plans?",
      answer: "The Essential plan (₹199/month) gives you access to all worksheets labeled as Essential across grades 1-5. The Premium plan (₹399/month) provides access to all worksheets, including Premium-exclusive content, priority access to new worksheets, and premium support."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period."
    },
    {
      question: "How do I download the worksheets?",
      answer: "Once logged in, browse or search for worksheets, and if your subscription plan allows access, you'll see a download button. Click it to download the PDF file that you can print or use digitally."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 7-day refund policy if you're not satisfied with your subscription. Please contact our support team within 7 days of your purchase to request a refund."
    },
    {
      question: "Can I share my account with others?",
      answer: "Our subscriptions are for individual use only. Sharing your account credentials is against our terms of service. We offer special pricing for schools and educational institutions that need multiple accounts."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about PracticeGenius.
          </p>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional spacing */}
        <div className="mt-8"></div>
      </div>
    </section>
  );
};

export default FAQSection;
