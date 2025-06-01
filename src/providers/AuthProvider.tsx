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

// Helper function to standardize subscription plan format
const standardizePlanFormat = (plan: string): string => {
  if (!plan) return 'Free Plan';
  
  // Remove any 'plan' suffix and trim
  let cleanPlan = plan.toLowerCase().replace(/\s+plan$/i, '').trim();
  
  // Capitalize first letter and add ' Plan' suffix
  return cleanPlan.charAt(0).toUpperCase() + cleanPlan.slice(1) + ' Plan';
};

// Custom event for subscription plan changes
const SUBSCRIPTION_UPDATED_EVENT = 'practicegenius_subscription_updated';

// Helper function to dispatch a custom event when subscription plan changes
const dispatchSubscriptionUpdatedEvent = (userId: string, plan: string) => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent(SUBSCRIPTION_UPDATED_EVENT, {
      detail: { userId, plan }
    });
    window.dispatchEvent(event);
    console.log(`DISPATCH: Subscription updated event for user ${userId} with plan ${plan}`);
  }
};

// Helper function to ensure subscription data is properly synchronized across all storage locations
// Exported so it can be used by other components that need to update subscription data
export const syncSubscriptionData = (userId: string, subscriptionPlan: string): string => {
  if (typeof window === 'undefined') return subscriptionPlan;
  
  try {
    console.log(`=== SUBSCRIPTION SYNC STARTED ===`);
    console.log(`User ID: ${userId}`);
    console.log(`Original subscription plan: ${subscriptionPlan}`);
    
    // Guard against invalid inputs
    if (!userId) {
      console.error('Cannot sync subscription: User ID is missing');
      return subscriptionPlan;
    }
    
    // Standardize the plan format to ensure consistency
    const standardizedPlan = standardizePlanFormat(subscriptionPlan);
    console.log(`Standardized plan format: ${standardizedPlan}`);
    
    // 1. Update the user in the users array (MOST IMPORTANT SOURCE OF TRUTH)
    try {
      const users = JSON.parse(localStorage.getItem('practicegenius_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === userId);
      
      if (userIndex !== -1) {
        // Store previous value for logging
        const previousPlan = users[userIndex].subscriptionPlan;
        
        // Update user object
        users[userIndex].subscriptionPlan = standardizedPlan;
        users[userIndex].subscriptionDate = new Date().toISOString();
        users[userIndex].subscriptionStatus = 'active';
        
        // Save updated users array
        localStorage.setItem('practicegenius_users', JSON.stringify(users));
        console.log(`USERS ARRAY: Updated user plan from '${previousPlan || 'none'}' to '${standardizedPlan}'`);
        
        // Dispatch custom event to notify components of the subscription change
        dispatchSubscriptionUpdatedEvent(userId, standardizedPlan);
      } else {
        console.error(`USERS ARRAY: User with ID ${userId} not found in users array`);
      }
    } catch (usersError) {
      console.error('Error updating users array:', usersError);
    }
    
    // 2. Update the user_subscription in localStorage
    try {
      // Read existing subscription data if available
      let existingData = {};
      try {
        const existingSubscription = localStorage.getItem('user_subscription');
        if (existingSubscription) {
          existingData = JSON.parse(existingSubscription);
        }
      } catch (parseError) {
        console.warn('Error parsing existing user_subscription, will create new one:', parseError);
      }
      
      // Create updated subscription info
      const subscriptionInfo = {
        ...existingData,
        plan: planNameOnly, // Store lowercase plan name without 'Plan' suffix
        status: 'active',
        startDate: new Date().toISOString(),
        userId: userId
      };
      
      // Save updated subscription info
      localStorage.setItem('user_subscription', JSON.stringify(subscriptionInfo));
      console.log(`USER_SUBSCRIPTION: Updated with plan '${planNameOnly}'`);
    } catch (subscriptionError) {
      console.error('Error updating user_subscription:', subscriptionError);
    }
    
    // 3. Update the session data if it exists and matches the user ID
    try {
      const sessionData = localStorage.getItem('practicegenius_session');
      if (sessionData) {
        const sessionObj = JSON.parse(sessionData);
        
        if (sessionObj.user && sessionObj.user.id === userId) {
          // Store previous value for logging
          const previousSessionPlan = sessionObj.user.subscriptionPlan;
          
          // Update session user object
          sessionObj.user.subscriptionPlan = standardizedPlan;
          sessionObj.user.subscriptionDate = new Date().toISOString();
          sessionObj.user.subscriptionStatus = 'active';
          
          // Save updated session
          localStorage.setItem('practicegenius_session', JSON.stringify(sessionObj));
          console.log(`SESSION: Updated user plan from '${previousSessionPlan || 'none'}' to '${standardizedPlan}'`);
        } else {
          console.warn('SESSION: User not found in session or ID mismatch');
        }
      } else {
        console.warn('SESSION: No active session found');
      }
    } catch (sessionError) {
      console.error('Error updating session:', sessionError);
    }
    
    // 4. Verify all storage locations have been properly updated
    try {
      // Read from all storage locations
      const verifyUsers = JSON.parse(localStorage.getItem('practicegenius_users') || '[]');
      const verifyUser = verifyUsers.find((u: any) => u.id === userId);
      const verifySession = JSON.parse(localStorage.getItem('practicegenius_session') || '{}');
      const verifySubscription = JSON.parse(localStorage.getItem('user_subscription') || '{}');
      
      // Log verification results
      console.log('=== VERIFICATION AFTER SYNC ===');
      console.log(`1. User in users array: ${verifyUser?.subscriptionPlan || 'Not found'}`);
      console.log(`2. User in session: ${verifySession?.user?.subscriptionPlan || 'Not found'}`);
      console.log(`3. User subscription: ${verifySubscription?.plan || 'Not found'}`);
      
      // Check for inconsistencies
      const usersArrayPlan = verifyUser?.subscriptionPlan;
      const sessionPlan = verifySession?.user?.subscriptionPlan;
      const subscriptionPlan = verifySubscription?.plan ? `${verifySubscription.plan.charAt(0).toUpperCase() + verifySubscription.plan.slice(1)} Plan` : null;
      
      if (usersArrayPlan !== standardizedPlan) {
        console.error(`INCONSISTENCY: Users array plan '${usersArrayPlan}' doesn't match expected '${standardizedPlan}'`);
      }
      
      if (sessionPlan !== standardizedPlan) {
        console.error(`INCONSISTENCY: Session plan '${sessionPlan}' doesn't match expected '${standardizedPlan}'`);
      }
      
      if (subscriptionPlan !== standardizedPlan) {
        console.warn(`NOTE: user_subscription plan format '${subscriptionPlan}' is different from standardized format '${standardizedPlan}' (this is expected as we store without 'Plan' suffix)`);
      }
    } catch (verifyError) {
      console.error('Error during verification:', verifyError);
    }
    
    console.log(`=== SUBSCRIPTION SYNC COMPLETED ===`);
    return standardizedPlan;
  } catch (error) {
    console.error('Critical error synchronizing subscription data:', error);
    return subscriptionPlan; // Return original plan on error
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log('=== SESSION INITIALIZATION STARTED ===');
    
    if (session) {
      console.log('NextAuth session available:', session.user);
      
      // If we have a NextAuth session, ensure subscription data is properly synchronized
      if (typeof window !== 'undefined' && session.user?.id) {
        try {
          // Check if the user exists in the users array
          const users = JSON.parse(localStorage.getItem('practicegenius_users') || '[]');
          const userInArray = users.find((u: any) => u.id === session.user.id);
          
          if (userInArray) {
            console.log(`Found user in users array with plan: ${userInArray.subscriptionPlan || 'none'}`);
            
            // Determine the best subscription plan to use
            let subscriptionPlan = userInArray.subscriptionPlan || 'Free Plan';
            console.log(`Using subscription plan from users array: ${subscriptionPlan}`);
            
            // Synchronize subscription data across all storage locations
            const standardizedPlan = syncSubscriptionData(session.user.id, subscriptionPlan);
            
            // Update the session user with the synchronized subscription plan
            const updatedUser = {
              ...session.user,
              subscriptionPlan: standardizedPlan,
              subscriptionStatus: 'active',
              subscriptionDate: userInArray.subscriptionDate || new Date().toISOString()
            };
            
            console.log(`Setting user with synchronized plan: ${standardizedPlan}`);
            setUser(updatedUser);
            
            // Store the updated session in localStorage
            const updatedSession = {
              ...session,
              user: updatedUser
            };
            localStorage.setItem('practicegenius_session', JSON.stringify(updatedSession));
          } else {
            console.log('User not found in users array, using session data as is');
            setUser(session.user);
            localStorage.setItem('practicegenius_session', JSON.stringify(session));
          }
        } catch (error) {
          console.error('Error synchronizing subscription data during session init:', error);
          setUser(session.user);
          localStorage.setItem('practicegenius_session', JSON.stringify(session));
        }
      } else {
        setUser(session.user);
      }
    } else {
      // If no NextAuth session, try to get from localStorage
      if (typeof window !== 'undefined') {
        try {
          const localSession = localStorage.getItem('practicegenius_session');
          if (localSession) {
            const parsedSession = JSON.parse(localSession);
            console.log('Found session in localStorage:', parsedSession.user?.id);
            
            if (new Date(parsedSession.expires) > new Date()) {
              console.log('Session is valid, checking subscription data');
              
              // Get the user ID from the session
              const userId = parsedSession.user?.id;
              
              if (userId) {
                // Check if the user exists in the users array
                const users = JSON.parse(localStorage.getItem('practicegenius_users') || '[]');
                const userInArray = users.find((u: any) => u.id === userId);
                
                if (userInArray) {
                  console.log(`Found user in users array with plan: ${userInArray.subscriptionPlan || 'none'}`);
                  
                  // Determine the best subscription plan to use
                  let subscriptionPlan = userInArray.subscriptionPlan || 'Free Plan';
                  console.log(`Using subscription plan from users array: ${subscriptionPlan}`);
                  
                  // Synchronize subscription data across all storage locations
                  const standardizedPlan = syncSubscriptionData(userId, subscriptionPlan);
                  
                  // Update the session user with the synchronized subscription plan
                  const updatedUser = {
                    ...parsedSession.user,
                    subscriptionPlan: standardizedPlan,
                    subscriptionStatus: 'active',
                    subscriptionDate: userInArray.subscriptionDate || new Date().toISOString()
                  };
                  
                  console.log(`Setting user with synchronized plan: ${standardizedPlan}`);
                  setUser(updatedUser);
                  
                  // Store the updated session in localStorage
                  const updatedSession = {
                    ...parsedSession,
                    user: updatedUser
                  };
                  localStorage.setItem('practicegenius_session', JSON.stringify(updatedSession));
                } else {
                  console.log('User not found in users array, using session data as is');
                  setUser(parsedSession.user);
                }
              } else {
                console.log('No user ID in session, using session data as is');
                setUser(parsedSession.user);
              }
            } else {
              console.log('Session expired, removing');
              localStorage.removeItem('practicegenius_session');
              setUser(null);
            }
          } else {
            console.log('No session found in localStorage');
            setUser(null);
          }
        } catch (error) {
          console.error('Error parsing session from localStorage:', error);
          localStorage.removeItem('practicegenius_session');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
    
    console.log('=== SESSION INITIALIZATION COMPLETED ===');
  }, [session]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      
      // Try to use NextAuth
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
        
        if (result?.error) {
          setError(result.error);
          return false;
        }
        
        if (result?.ok) {
          return true;
        }
      } catch (err) {
        console.log('NextAuth error, falling back to localStorage:', err);
        // Continue to localStorage fallback
      }
      
      // Development mode: Check user in localStorage
      if (typeof window !== 'undefined') {
        console.log('=== LOGIN PROCESS STARTED ===');
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('practicegenius_users') || '[]');
        console.log(`Found ${users.length} users in localStorage`);
        
        // Find the user by email and password
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (!user) {
          console.error('User not found in localStorage');
          setError('Invalid email or password');
          return false;
        }
        
        console.log(`Found user: ${user.username} (ID: ${user.id})`);
        
        // SUBSCRIPTION PLAN DETERMINATION LOGIC
        // We'll check multiple sources and use the best available data
        
        // Source 1: Check user's direct subscription data in users array
        let subscriptionPlan = user.subscriptionPlan || '';
        let subscriptionSource = 'user record';
        
        console.log(`Initial subscription from user record: ${subscriptionPlan || 'none'}`);
        
        // Source 2: Check user_subscription in localStorage if we don't have a plan yet
        if (!subscriptionPlan) {
          try {
            const subscriptionData = localStorage.getItem('user_subscription');
            if (subscriptionData) {
              const userSubscription = JSON.parse(subscriptionData);
              if (userSubscription.plan && userSubscription.userId === user.id) {
                subscriptionPlan = userSubscription.plan;
                subscriptionSource = 'user_subscription';
                console.log(`Found subscription in user_subscription: ${subscriptionPlan}`);
              }
            }
          } catch (error) {
            console.error('Error checking user_subscription:', error);
          }
        }
        
        // Default to Free Plan if no subscription found
        if (!subscriptionPlan) {
          subscriptionPlan = 'Free Plan';
          subscriptionSource = 'default';
          console.log('No subscription found, defaulting to Free Plan');
        }
        
        console.log(`Final subscription plan: ${subscriptionPlan} (source: ${subscriptionSource})`);
        
        // CRITICAL: Ensure all subscription data is synchronized using our helper
        // This will standardize the format and update all storage locations
        const standardizedPlan = syncSubscriptionData(user.id, subscriptionPlan);
        
        // Set the user in session with the standardized plan
        const mockSession = {
          user: {
            id: user.id,
            name: user.username,
            email: user.email,
            subscriptionPlan: standardizedPlan, // Use the standardized plan
            subscriptionStatus: 'active',
            subscriptionDate: new Date().toISOString()
          },
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem('practicegenius_session', JSON.stringify(mockSession));
        setUser(mockSession.user);
        
        console.log('=== LOGIN PROCESS COMPLETED ===');
        console.log(`User logged in with subscription plan: ${standardizedPlan}`);
        
        return true;
      }
      
      // If we reach here, we couldn't authenticate with NextAuth or localStorage
      setError('Authentication failed. Please try again.');
      return false;
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setError(null);
      await signIn('google', { callbackUrl: '/dashboard' });
      return true;
    } catch (err) {
      setError('An error occurred during Google login. Please try again.');
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
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
        
        // Create new user with standardized subscription plan
        const newUserId = Date.now().toString();
        const defaultPlan = 'Free Plan';
        
        const newUser = {
          id: newUserId,
          username,
          email,
          password, // In a real app, this would be hashed
          role: 'user',
          subscriptionPlan: defaultPlan,
          subscriptionStatus: 'active',
          subscriptionDate: new Date().toISOString(),
          createdAt: new Date().toISOString()
        };
        
        console.log('=== REGISTRATION PROCESS STARTED ===');
        console.log(`Creating new user: ${username} (ID: ${newUserId})`);
        console.log(`Initial subscription plan: ${defaultPlan}`);
        
        // Add user to the users array
        users.push(newUser);
        localStorage.setItem('practicegenius_users', JSON.stringify(users));
        
        // Synchronize subscription data across all storage locations
        const standardizedPlan = syncSubscriptionData(newUserId, defaultPlan);
        console.log(`Synchronized subscription data: ${standardizedPlan}`);
        
        // Set the user in session
        const mockSession = {
          user: {
            id: newUser.id,
            name: newUser.username, // Ensure username is used for display
            email: newUser.email,
            subscriptionPlan: standardizedPlan, // Use the standardized plan from syncSubscriptionData
            subscriptionStatus: 'active',
            subscriptionDate: new Date().toISOString()
          },
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        console.log(`Created session for new user with subscription plan: ${standardizedPlan}`);
        
        localStorage.setItem('practicegenius_session', JSON.stringify(mockSession));
        setUser(mockSession.user);
        
        console.log('=== REGISTRATION PROCESS COMPLETED ===');
        
        return true;
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('=== LOGOUT PROCESS STARTED ===');
      
      // Before logging out, save the current subscription data if it exists
      if (typeof window !== 'undefined' && user) {
        try {
          // Get the current user's subscription plan from session
          const sessionData = localStorage.getItem('practicegenius_session');
          if (sessionData) {
            const session = JSON.parse(sessionData);
            const currentUserId = session.user?.id;
            const currentSubscriptionPlan = session.user?.subscriptionPlan;
            
            console.log(`Logging out user with ID: ${currentUserId} and plan: ${currentSubscriptionPlan}`);
            
            // If we have subscription data, ensure it's properly synchronized
            if (currentUserId && currentSubscriptionPlan) {
              // DIRECT APPROACH: Update all storage locations manually to ensure consistency
              
              // 1. Update user in practicegenius_users array
              const users = JSON.parse(localStorage.getItem('practicegenius_users') || '[]');
              const userIndex = users.findIndex((u: any) => u.id === currentUserId);
              
              if (userIndex !== -1) {
                users[userIndex].subscriptionPlan = currentSubscriptionPlan;
                users[userIndex].subscriptionDate = session.user?.subscriptionDate || new Date().toISOString();
                users[userIndex].subscriptionStatus = session.user?.subscriptionStatus || 'active';
                localStorage.setItem('practicegenius_users', JSON.stringify(users));
                console.log(`DIRECT: Updated user in users array with plan: ${currentSubscriptionPlan}`);
              } else {
                console.error('User not found in users array during logout, cannot preserve subscription');
              }
              
              // 2. Update user_subscription in localStorage
              // Extract the plan name without 'Plan' suffix and convert to lowercase
              const planNameOnly = currentSubscriptionPlan.replace(' Plan', '').toLowerCase();
              const subscriptionInfo = {
                plan: planNameOnly,
                status: session.user?.subscriptionStatus || 'active',
                startDate: session.user?.subscriptionDate || new Date().toISOString(),
                userId: currentUserId
              };
              localStorage.setItem('user_subscription', JSON.stringify(subscriptionInfo));
              console.log(`DIRECT: Set user_subscription with plan: ${planNameOnly}`);
              
              // 3. Also use the syncSubscriptionData helper as a backup
              syncSubscriptionData(currentUserId, currentSubscriptionPlan);
              console.log(`Synchronized subscription data before logout: ${currentSubscriptionPlan}`);
              
              // 4. Verify all storage locations have been updated
              try {
                const verifyUsers = JSON.parse(localStorage.getItem('practicegenius_users') || '[]');
                const verifyUser = verifyUsers.find((u: any) => u.id === currentUserId);
                const verifySubscription = JSON.parse(localStorage.getItem('user_subscription') || '{}');
                
                console.log('VERIFICATION BEFORE LOGOUT:');
                console.log(`- User in users array: ${verifyUser?.subscriptionPlan || 'Not found'}`);
                console.log(`- User subscription: ${verifySubscription?.plan || 'Not found'}`);
              } catch (verifyError) {
                console.error('Error during verification:', verifyError);
              }
            }
          }
        } catch (error) {
          console.error('Error preserving subscription data during logout:', error);
        }
      }
      
      console.log('=== LOGOUT PROCESS COMPLETED ===');
      
      // Try to use NextAuth
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Error during signOut, falling back to manual logout:', error);
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
