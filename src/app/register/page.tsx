"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [returnUrl, setReturnUrl] = useState<string | null>(null);
  
  // Function to handle navigation after successful registration
  const handlePostRegistrationNavigation = () => {
    // Check if there's a pending checkout or returnUrl
    const pendingCheckout = localStorage.getItem('pendingCheckout');
    
    if (returnUrl) {
      // Redirect to the specified return URL
      router.push(returnUrl);
    } else if (pendingCheckout) {
      // Redirect to payments page with the plan from pending checkout
      const checkoutData = JSON.parse(pendingCheckout);
      router.push(`/payments?plan=${checkoutData.plan}`);
    } else {
      // Default redirect to dashboard
      router.push('/dashboard');
    }
  };

  // Check for returnUrl in query parameters and pending checkout
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get returnUrl from URL if present
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrlParam = urlParams.get('returnUrl');
      if (returnUrlParam) {
        setReturnUrl(returnUrlParam);
      }
    }
  }, []);

  // Check if user is already logged in
  useEffect(() => {
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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(formData.password)) {
      errors.password = 'Password must include at least one uppercase letter, one number, and one special character';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
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
        // Direct localStorage registration
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
        
        // Check if user already exists
        const existingUser = users.find((u: any) => 
          u.email === formData.email || u.username === formData.username
        );
        
        if (existingUser) {
          setError('User with this email or username already exists');
          setIsSubmitting(false);
          return;
        }
        
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          username: formData.username,
          email: formData.email,
          password: formData.password, // In a real app, this would be hashed
          role: 'user',
          subscriptionPlan: 'free',
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('practicegenius_users', JSON.stringify(users));
        
        // Create session
        const mockSession = {
          user: {
            id: newUser.id,
            name: newUser.username,
            email: newUser.email
          },
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem('practicegenius_session', JSON.stringify(mockSession));
        router.push('/dashboard');
      } else {
        // Handle server-side rendering case
        setError('Registration is not available during server-side rendering');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
        setError('Google sign up is not available during server-side rendering');
      }
    } catch (err) {
      console.error('Google sign up error:', err);
      setError('An error occurred during Google sign up. Please try again.');
    }
  };
  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-secondary">Create Your Account</h1>
                <p className="text-gray-600 mt-2">Join PracticeGenius for access to premium educational worksheets</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    className={`form-input ${formErrors.username ? 'border-red-500' : ''}`}
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.username && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>
                  )}
                </div>

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

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className={`form-input ${formErrors.password ? 'border-red-500' : ''}`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters long with at least one uppercase letter, one number, and one special character.
                  </p>
                  {formErrors.password && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    className={`form-input ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="agreeToTerms"
                      name="agreeToTerms"
                      className={`form-checkbox h-5 w-5 text-primary ${formErrors.agreeToTerms ? 'border-red-500' : ''}`}
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <Link href="/terms-of-service" className="text-primary hover:text-primary-dark">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link href="/privacy-policy" className="text-primary hover:text-primary-dark">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {formErrors.agreeToTerms && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.agreeToTerms}</p>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full mb-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className="relative flex items-center my-6">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-600">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button 
                  type="button" 
                  className="flex items-center justify-center w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleGoogleSignUp}
                  disabled={isSubmitting}
                >
                  <Image 
                    src="/icons/google.svg" 
                    alt="Google" 
                    width={20} 
                    height={20} 
                    className="mr-2"
                  />
                  <span>Sign up with Google</span>
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary font-medium hover:text-primary-dark">
                    Log In
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
