"use client";

import React, { useState } from 'react';

const AdminSettings: React.FC = () => {
  // State for general settings
  const [siteName, setSiteName] = useState('PracticeGenius');
  const [siteDescription, setSiteDescription] = useState('Educational worksheets for grades 1-5');
  const [contactEmail, setContactEmail] = useState('support@practicegenius.online');
  const [supportPhone, setSupportPhone] = useState('+91 98765 43210');

  // State for notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newUserNotifications, setNewUserNotifications] = useState(true);
  const [newSubscriptionNotifications, setNewSubscriptionNotifications] = useState(true);
  const [paymentNotifications, setPaymentNotifications] = useState(true);

  // State for payment settings
  const [razorpayKeyId, setRazorpayKeyId] = useState('rzp_test_*************');
  const [razorpayKeySecret, setRazorpayKeySecret] = useState('*******************');
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const [taxRate, setTaxRate] = useState('18');

  // State for subscription settings
  const [essentialPlanPrice, setEssentialPlanPrice] = useState('199');
  const [premiumPlanPrice, setPremiumPlanPrice] = useState('399');
  const [trialDays, setTrialDays] = useState('7');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent, section: string) => {
    e.preventDefault();
    // In a real application, this would send the data to the backend
    alert(`${section} settings saved successfully!`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Admin Settings</h2>
        
        {/* General Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">General Settings</h3>
          <form onSubmit={(e) => handleSubmit(e, 'General')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Site Description
                </label>
                <input
                  type="text"
                  id="siteDescription"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="supportPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Support Phone
                </label>
                <input
                  type="text"
                  id="supportPhone"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Save General Settings
              </button>
            </div>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">Notification Settings</h3>
          <form onSubmit={(e) => handleSubmit(e, 'Notification')}>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="emailNotifications"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                  Enable Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="newUserNotifications"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={newUserNotifications}
                  onChange={(e) => setNewUserNotifications(e.target.checked)}
                />
                <label htmlFor="newUserNotifications" className="ml-2 block text-sm text-gray-700">
                  Notify on New User Registration
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="newSubscriptionNotifications"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={newSubscriptionNotifications}
                  onChange={(e) => setNewSubscriptionNotifications(e.target.checked)}
                />
                <label htmlFor="newSubscriptionNotifications" className="ml-2 block text-sm text-gray-700">
                  Notify on New Subscription
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paymentNotifications"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={paymentNotifications}
                  onChange={(e) => setPaymentNotifications(e.target.checked)}
                />
                <label htmlFor="paymentNotifications" className="ml-2 block text-sm text-gray-700">
                  Notify on Payment Received
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Save Notification Settings
              </button>
            </div>
          </form>
        </div>

        {/* Payment Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">Payment Settings</h3>
          <form onSubmit={(e) => handleSubmit(e, 'Payment')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="razorpayKeyId" className="block text-sm font-medium text-gray-700 mb-1">
                  Razorpay Key ID
                </label>
                <input
                  type="text"
                  id="razorpayKeyId"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={razorpayKeyId}
                  onChange={(e) => setRazorpayKeyId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="razorpayKeySecret" className="block text-sm font-medium text-gray-700 mb-1">
                  Razorpay Key Secret
                </label>
                <input
                  type="password"
                  id="razorpayKeySecret"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={razorpayKeySecret}
                  onChange={(e) => setRazorpayKeySecret(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="currencySymbol" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  id="currencySymbol"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  id="taxRate"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Save Payment Settings
              </button>
            </div>
          </form>
        </div>

        {/* Subscription Settings */}
        <div>
          <h3 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">Subscription Settings</h3>
          <form onSubmit={(e) => handleSubmit(e, 'Subscription')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="essentialPlanPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Essential Plan Price (₹)
                </label>
                <input
                  type="number"
                  id="essentialPlanPrice"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={essentialPlanPrice}
                  onChange={(e) => setEssentialPlanPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="premiumPlanPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Premium Plan Price (₹)
                </label>
                <input
                  type="number"
                  id="premiumPlanPrice"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={premiumPlanPrice}
                  onChange={(e) => setPremiumPlanPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trialDays" className="block text-sm font-medium text-gray-700 mb-1">
                  Trial Period (Days)
                </label>
                <input
                  type="number"
                  id="trialDays"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={trialDays}
                  onChange={(e) => setTrialDays(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Save Subscription Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
