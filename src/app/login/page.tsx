"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Initialize form state
    setFormData({
      email: '',
      password: ''
    });
    
    // Check if user is already logged in
    if (typeof window !== 'undefined') {
      try {
        const sessionData = localStorage.getItem('practicegenius_session');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          // Check if session is valid and not expired
          if (session && session.user && new Date(session.expires) > new Date()) {
            // User is already logged in, redirect to dashboard
            router.push('/dashboard');
          }
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Check if localStorage is available (not server-side)
      if (typeof window !== 'undefined') {
        // Direct localStorage login
        let users = [];
        try {
          const storedUsers = localStorage.getItem('practicegenius_users');
          if (storedUsers) {
            users = JSON.parse(storedUsers);
          }
        } catch (e) {
          console.error('Error parsing stored users:', e);
          users = [];
        }
        
        const user = users.find((u: any) => 
          u.email === formData.email && u.password === formData.password
        );
        
        if (user) {
          // Create a session
          const mockSession = {
            user: {
              id: user.id,
              name: user.username,
              email: user.email
            },
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          };
          
          localStorage.setItem('practicegenius_session', JSON.stringify(mockSession));
          router.push('/dashboard');
        } else {
          setError('Invalid email or password');
        }
      } else {
        // Handle server-side rendering case
        setError('Login is not available during server-side rendering');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      
      // Check if localStorage is available (not server-side)
      if (typeof window !== 'undefined') {
        // For development, create a mock Google user
        const googleUser = {
          id: 'google-' + Date.now().toString(),
          username: 'Google User',
          email: 'google-user@example.com',
          googleId: 'mock-google-id-' + Date.now(),
          role: 'user',
          subscriptionPlan: 'free',
          createdAt: new Date().toISOString()
        };
        
        // Save to users list
        let users = [];
        try {
          const storedUsers = localStorage.getItem('practicegenius_users');
          if (storedUsers) {
            users = JSON.parse(storedUsers);
          }
        } catch (e) {
          console.error('Error parsing stored users:', e);
          users = [];
        }
        
        users.push(googleUser);
        localStorage.setItem('practicegenius_users', JSON.stringify(users));
        
        // Create session
        const mockSession = {
          user: {
            id: googleUser.id,
            name: googleUser.username,
            email: googleUser.email
          },
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem('practicegenius_session', JSON.stringify(mockSession));
        router.push('/dashboard');
      } else {
        // Handle server-side rendering case
        setError('Google login is not available during server-side rendering');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError('An error occurred during Google login. Please try again.');
    }
  };
  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-secondary">Welcome Back!</h1>
                <p className="text-gray-600 mt-2">Log in to access your PracticeGenius account</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className={`form-input ${formErrors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
                      Forgot Password?
                    </Link>
                  </div>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className={`form-input ${formErrors.password ? 'border-red-500' : ''}`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full mb-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging In...' : 'Log In'}
                </button>

                <div className="relative flex items-center my-6">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-600">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button 
                  type="button" 
                  className="flex items-center justify-center w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting}
                >
                  <Image 
                    src="/icons/google.svg" 
                    alt="Google" 
                    width={20} 
                    height={20} 
                    className="mr-2"
                  />
                  <span>Continue with Google</span>
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-primary font-medium hover:text-primary-dark">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
