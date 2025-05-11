"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface Subscription {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: 'essential' | 'premium';
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  amount: number;
  paymentMethod: 'credit_card' | 'debit_card' | 'upi' | 'net_banking';
  autoRenew: boolean;
}

const SubscriptionManager: React.FC = () => {
  // Mock data for subscriptions
  const initialSubscriptions: Subscription[] = [
    {
      id: '1',
      userId: '1',
      userName: 'Priya Sharma',
      userEmail: 'priya.sharma@example.com',
      plan: 'premium',
      startDate: '2025-05-01T00:00:00',
      endDate: '2025-06-01T00:00:00',
      status: 'active',
      amount: 399,
      paymentMethod: 'credit_card',
      autoRenew: true
    },
    {
      id: '2',
      userId: '2',
      userName: 'Rahul Kumar',
      userEmail: 'rahul.kumar@example.com',
      plan: 'essential',
      startDate: '2025-04-15T00:00:00',
      endDate: '2025-05-15T00:00:00',
      status: 'active',
      amount: 199,
      paymentMethod: 'upi',
      autoRenew: true
    },
    {
      id: '3',
      userId: '4',
      userName: 'Vikram Singh',
      userEmail: 'vikram.singh@example.com',
      plan: 'premium',
      startDate: '2025-04-10T00:00:00',
      endDate: '2025-05-10T00:00:00',
      status: 'active',
      amount: 399,
      paymentMethod: 'debit_card',
      autoRenew: false
    },
    {
      id: '4',
      userId: '5',
      userName: 'Meera Patel',
      userEmail: 'meera.patel@example.com',
      plan: 'essential',
      startDate: '2025-04-05T00:00:00',
      endDate: '2025-05-05T00:00:00',
      status: 'expired',
      amount: 199,
      paymentMethod: 'net_banking',
      autoRenew: false
    },
    {
      id: '5',
      userId: '6',
      userName: 'Ajay Verma',
      userEmail: 'ajay.verma@example.com',
      plan: 'premium',
      startDate: '2025-05-03T00:00:00',
      endDate: '2025-06-03T00:00:00',
      status: 'active',
      amount: 399,
      paymentMethod: 'credit_card',
      autoRenew: true
    },
    {
      id: '6',
      userId: '7',
      userName: 'Neha Gupta',
      userEmail: 'neha.gupta@example.com',
      plan: 'essential',
      startDate: '2025-04-28T00:00:00',
      endDate: '2025-05-28T00:00:00',
      status: 'cancelled',
      amount: 199,
      paymentMethod: 'upi',
      autoRenew: false
    },
    {
      id: '7',
      userId: '8',
      userName: 'Sanjay Joshi',
      userEmail: 'sanjay.joshi@example.com',
      plan: 'premium',
      startDate: '2025-05-07T00:00:00',
      endDate: '2025-06-07T00:00:00',
      status: 'pending',
      amount: 399,
      paymentMethod: 'credit_card',
      autoRenew: true
    }
  ];

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterAutoRenew, setFilterAutoRenew] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('startDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Function to get plan badge color
  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'essential':
        return 'bg-blue-100 text-blue-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to format payment method
  const formatPaymentMethod = (method: string) => {
    return method.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Filter and sort subscriptions
  const filteredAndSortedSubscriptions = subscriptions
    .filter((subscription) => {
      const matchesSearch = 
        subscription.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        subscription.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlan = filterPlan ? subscription.plan === filterPlan : true;
      const matchesStatus = filterStatus ? subscription.status === filterStatus : true;
      const matchesAutoRenew = filterAutoRenew 
        ? (filterAutoRenew === 'yes' ? subscription.autoRenew : !subscription.autoRenew) 
        : true;
      
      return matchesSearch && matchesPlan && matchesStatus && matchesAutoRenew;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'userName':
          comparison = a.userName.localeCompare(b.userName);
          break;
        case 'plan':
          comparison = a.plan.localeCompare(b.plan);
          break;
        case 'startDate':
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case 'endDate':
          comparison = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Function to handle subscription cancellation
  const handleCancelSubscription = (subscriptionId: string) => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      setSubscriptions(subscriptions.map(subscription => 
        subscription.id === subscriptionId ? { ...subscription, status: 'cancelled', autoRenew: false } : subscription
      ));
    }
  };

  // Function to handle subscription renewal
  const handleRenewSubscription = (subscriptionId: string) => {
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    if (!subscription) return;
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    
    setSubscriptions(subscriptions.map(s => 
      s.id === subscriptionId 
        ? { 
            ...s, 
            status: 'active', 
            startDate: startDate.toISOString(), 
            endDate: endDate.toISOString(),
            autoRenew: true
          } 
        : s
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold mb-4 md:mb-0">Manage Subscriptions</h2>
          <div className="flex space-x-2">
            <Link
              href="/admin/subscriptions/report"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Report
            </Link>
            <Link
              href="/admin/subscriptions/new"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Subscription
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
            <select
              id="plan"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
            >
              <option value="">All Plans</option>
              <option value="essential">Essential</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label htmlFor="autoRenew" className="block text-sm font-medium text-gray-700 mb-1">Auto-Renew</label>
            <select
              id="autoRenew"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={filterAutoRenew}
              onChange={(e) => setFilterAutoRenew(e.target.value)}
            >
              <option value="">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => {
                    if (sortBy === 'userName') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('userName');
                      setSortOrder('asc');
                    }
                  }}
                >
                  User
                  {sortBy === 'userName' && (
                    <svg className={`ml-1 h-4 w-4 ${sortOrder === 'asc' ? '' : 'transform rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => {
                    if (sortBy === 'plan') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('plan');
                      setSortOrder('asc');
                    }
                  }}
                >
                  Plan
                  {sortBy === 'plan' && (
                    <svg className={`ml-1 h-4 w-4 ${sortOrder === 'asc' ? '' : 'transform rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => {
                    if (sortBy === 'startDate') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('startDate');
                      setSortOrder('desc');
                    }
                  }}
                >
                  Start Date
                  {sortBy === 'startDate' && (
                    <svg className={`ml-1 h-4 w-4 ${sortOrder === 'asc' ? '' : 'transform rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => {
                    if (sortBy === 'endDate') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('endDate');
                      setSortOrder('desc');
                    }
                  }}
                >
                  End Date
                  {sortBy === 'endDate' && (
                    <svg className={`ml-1 h-4 w-4 ${sortOrder === 'asc' ? '' : 'transform rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => {
                    if (sortBy === 'amount') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('amount');
                      setSortOrder('desc');
                    }
                  }}
                >
                  Amount
                  {sortBy === 'amount' && (
                    <svg className={`ml-1 h-4 w-4 ${sortOrder === 'asc' ? '' : 'transform rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Auto-Renew
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedSubscriptions.length > 0 ? (
              filteredAndSortedSubscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{subscription.userName}</div>
                    <div className="text-sm text-gray-500">{subscription.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPlanBadgeColor(subscription.plan)}`}>
                      {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(subscription.startDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(subscription.endDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{subscription.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(subscription.status)}`}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatPaymentMethod(subscription.paymentMethod)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subscription.autoRenew ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/admin/subscriptions/${subscription.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      {subscription.status === 'active' && (
                        <button
                          onClick={() => handleCancelSubscription(subscription.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Cancel Subscription"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                      {(subscription.status === 'expired' || subscription.status === 'cancelled') && (
                        <button
                          onClick={() => handleRenewSubscription(subscription.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Renew Subscription"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      )}
                      <Link
                        href={`/admin/users/${subscription.userId}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="View User"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-6 py-10 text-center">
                  <div className="text-gray-500">
                    No subscriptions found matching your filters.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredAndSortedSubscriptions.length}</span> of{' '}
            <span className="font-medium">{subscriptions.length}</span> subscriptions
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;
