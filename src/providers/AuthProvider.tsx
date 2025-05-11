"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      // Check localStorage for development mode
      const localSession = localStorage.getItem('practicegenius_session');
      if (localSession) {
        try {
          const parsedSession = JSON.parse(localSession);
          // Check if session is expired
          if (new Date(parsedSession.expires) > new Date()) {
            setUser(parsedSession.user);
          } else {
            localStorage.removeItem('practicegenius_session');
            setUser(null);
          }
        } catch (e) {
          localStorage.removeItem('practicegenius_session');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  }, [session]);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      
      try {
        // Try to use NextAuth
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError(result.error);
          return false;
        }

        return true;
      } catch (authError) {
        console.log('NextAuth not working, using local storage for development');
        
        // Development mode: Check user in localStorage
        const users = JSON.parse(localStorage.getItem('practicegenius_users') || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (!user) {
          setError('Invalid email or password');
          return false;
        }
        
        // Set the user in session
        const mockSession = {
          user: {
            id: user.id,
            name: user.username,
            email: user.email
          },
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem('practicegenius_session', JSON.stringify(mockSession));
        setUser(mockSession.user);
        
        return true;
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      await signIn('google', { callbackUrl: '/dashboard' });
      return true;
    } catch (err) {
      setError('An error occurred during Google login. Please try again.');
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setError(null);
      
      // For development: Check if we can reach the backend
      try {
        // Call your backend API to register the user
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Registration failed. Please try again.');
          return false;
        }

        // Automatically log in the user after successful registration
        return await login(email, password);
      } catch (backendError) {
        console.log('Backend not available, using local storage for development');
        
        // Development mode: Store user in localStorage
        const users = JSON.parse(localStorage.getItem('practicegenius_users') || '[]');
        
        // Check if user already exists
        const existingUser = users.find((u: any) => u.email === email || u.username === username);
        if (existingUser) {
          setError('User with this email or username already exists');
          return false;
        }
        
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          username,
          email,
          password, // In a real app, this would be hashed
          role: 'user',
          subscriptionPlan: 'free',
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('practicegenius_users', JSON.stringify(users));
        
        // Set the user in session
        const mockSession = {
          user: {
            id: newUser.id,
            name: newUser.username,
            email: newUser.email
          },
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem('practicegenius_session', JSON.stringify(mockSession));
        setUser(mockSession.user);
        
        return true;
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    try {
      // Try to use NextAuth
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      // Development mode: Clear localStorage session
      localStorage.removeItem('practicegenius_session');
      setUser(null);
      window.location.href = '/';
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading: status === 'loading',
    login,
    loginWithGoogle,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
