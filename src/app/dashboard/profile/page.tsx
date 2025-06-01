"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { countries } from 'countries-list';
import MainLayout from '@/components/MainLayout';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const countryOptions = Object.values(countries).map(country => country.name).sort();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    country: ''
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
        country: (session.user as any).country || '' // Cast to any for country
      }));
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Basic validation
    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      setMessage({ type: 'error', text: 'New password and confirm password do not match.' });
      return;
    }

    try {
      // Simulate API call to update user data
      if (typeof window !== 'undefined') {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = existingUsers.map((user: any) => {
          if (user.email === formData.email) {
            return {
              ...user,
              name: formData.name,
              country: formData.country,
              // In a real app, you'd hash the password on the server
              password: formData.newPassword ? formData.newPassword : user.password
            };
          }
          return user;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Update session in localStorage (practicegenius_session)
        const sessionData = JSON.parse(localStorage.getItem('practicegenius_session') || '{}');
        if (sessionData.user) {
          sessionData.user.name = formData.name;
          sessionData.user.country = formData.country;
          // Password update is handled by login flow, not directly in session object
          localStorage.setItem('practicegenius_session', JSON.stringify(sessionData));
        }
      }

      // Update the NextAuth session (if applicable)
      await update({
        name: formData.name,
        country: formData.country // Pass country to NextAuth session update
      });

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      // Clear password fields after successful update
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmNewPassword: '' }));

    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    }
  };

  return (
    <MainLayout>
      <div className="bg-background min-h-screen pt-20">
        <div className="container-custom py-12">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-gray-600">
              Manage your account information and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                {message && (
                  <div className={`p-3 mb-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="mt-1 block w-80 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-1 block w-80 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="you@example.com"
                      value={formData.email}
                      readOnly // Email is typically not editable after registration
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="mt-1 block w-80 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="">Select your country</option>
                      {countryOptions.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">Change Password</h3>
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        className="mt-1 block w-80 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        value={formData.currentPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="mt-1 block w-80 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        className="mt-1 block w-80 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
