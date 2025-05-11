"use client";

import React from 'react';
import Image from 'next/image';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      content: "PracticeGenius has been a game-changer for my daughter's education. The worksheets are well-structured and engaging, making learning fun for her.",
      author: "Priya Sharma",
      role: "Parent of Grade 3 student",
      avatar: "/avatars/parent1.jpg"
    },
    {
      content: "As a teacher, I appreciate the quality and variety of worksheets available on PracticeGenius. They align perfectly with our curriculum and save me hours of preparation time.",
      author: "Rajesh Kumar",
      role: "Primary School Teacher",
      avatar: "/avatars/teacher1.jpg"
    },
    {
      content: "The premium subscription is worth every rupee. My son's grades have improved significantly since we started using these worksheets for regular practice.",
      author: "Anita Patel",
      role: "Parent of Grade 5 student",
      avatar: "/avatars/parent2.jpg"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-primary">Users Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from parents and teachers who have experienced the benefits of PracticeGenius.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="card p-8 flex flex-col h-full"
            >
              {/* Quote icon */}
              <div className="text-primary mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              {/* Content */}
              <p className="text-gray-600 mb-6 flex-grow">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 bg-secondary text-white rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-8 text-center border-b md:border-b-0 md:border-r border-gray-700">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-300">Happy Students</div>
            </div>
            <div className="p-8 text-center border-b md:border-b-0 md:border-r border-gray-700">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-300">Schools Using Our Platform</div>
            </div>
            <div className="p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
