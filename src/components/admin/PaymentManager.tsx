"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  tax: number;
  total: number;
  paymentDate: string;
  status: 'success' | 'failed' | 'refunded' | 'pending';
  paymentMethod: 'credit_card' | 'debit_card' | 'upi' | 'net_banking';
  subscriptionId: string;
  transactionId: string;
}

const PaymentManager: React.FC = () => {
  // Mock data for payments
  const initialPayments: Payment[] = [
    {
      id: '1',
      userId: '1',
      userName: 'Priya Sharma',
      userEmail: 'priya.sharma@example.com',
      amount: 399,
      tax: 71.82,
      total: 470.82,
      paymentDate: '2025-05-01T10:30:00',
      status: 'success',
      paymentMethod: 'credit_card',
      subscriptionId: '1',
      transactionId: 'txn_123456789'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Rahul Kumar',
      userEmail: 'rahul.kumar@example.com',
      amount: 199,
      tax: 35.82,
      total: 234.82,
      paymentDate: '2025-04-15T14:20:00',
      status: 'success',
      paymentMethod: 'upi',
      subscriptionId: '2',
      transactionId: 'txn_987654321'
    },
    {
      id: '3',
      userId: '4',
      userName: 'Vikram Singh',
      userEmail: 'vikram.singh@example.com',
      amount: 399,
      tax: 71.82,
      total: 470.82,
      paymentDate: '2025-04-10T11:15:00',
      status: 'success',
      paymentMethod: 'debit_card',
      subscriptionId: '3',
      transactionId: 'txn_456789123'
    },
    {
      id: '4',
      userId: '5',
      userName: 'Meera Patel',
      userEmail: 'meera.patel@example.com',
      amount: 199,
      tax: 35.82,
      total: 234.82,
      paymentDate: '2025-04-05T09:45:00',
      status: 'failed',
      paymentMethod: 'net_banking',
      subscriptionId: '4',
      transactionId: 'txn_789123456'
    },
    {
      id: '5',
      userId: '6',
      userName: 'Ajay Verma',
      userEmail: 'ajay.verma@example.com',
      amount: 399,
      tax: 71.82,
      total: 470.82,
      paymentDate: '2025-05-03T16:30:00',
      status: 'success',
      paymentMethod: 'credit_card',
      subscriptionId: '5',
      transactionId: 'txn_321654987'
    },
    {
      id: '6',
      userId: '7',
      userName: 'Neha Gupta',
      userEmail: 'neha.gupta@example.com',
      amount: 199,
      tax: 35.82,
      total: 234.82,
      paymentDate: '2025-04-28T13:10:00',
      status: 'refunded',
      paymentMethod: 'upi',
      subscriptionId: '6',
      transactionId: 'txn_654987321'
    },
    {
      id: '7',
      userId: '8',
      userName: 'Sanjay Joshi',
      userEmail: 'sanjay.joshi@example.com',
      amount: 399,
      tax: 71.82,
      total: 470.82,
      paymentDate: '2025-05-07T10:45:00',
      status: 'pending',
      paymentMethod: 'credit_card',
      subscriptionId: '7',
      transactionId: 'txn_987321654'
    }
  ];

  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });
  const [sortBy, setSortBy] = useState<string>('paymentDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
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

  // Filter and sort payments
  const filteredAndSortedPayments = payments
    .filter((payment) => {
      const matchesSearch = 
        payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus ? payment.status === filterStatus : true;
      const matchesPaymentMethod = filterPaymentMethod ? payment.paymentMethod === filterPaymentMethod : true;
      
      let matchesDateRange = true;
      if (dateRange.start && dateRange.end) {
        const paymentDate = new Date(payment.paymentDate);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59, 999); // Set to end of day
        matchesDateRange = paymentDate >= startDate && paymentDate <= endDate;
      }
      
      return matchesSearch && matchesStatus && matchesPaymentMethod && matchesDateRange;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'userName':
          comparison = a.userName.localeCompare(b.userName);
          break;
        case 'amount':
          comparison = a.total - b.total;
          break;
        case 'paymentDate':
          comparison = new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime();
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Calculate total revenue from filtered payments
  const totalRevenue = filteredAndSortedPayments
    .filter(payment => payment.status === 'success')
    .reduce((sum, payment) => sum + payment.total, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold mb-4 md:mb-0">Payment Transactions</h2>
          <div className="flex space-x-2">
            <Link
              href="/admin/payments/export"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </Link>
            <Link
              href="/admin/payments/report"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Report
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
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
                placeholder="Search by name, email, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              id="paymentMethod"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={filterPaymentMethod}
              onChange={(e) => setFilterPaymentMethod(e.target.value)}
            >
              <option value="">All Methods</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="upi">UPI</option>
              <option value="net_banking">Net Banking</option>
            </select>
          </div>

          <div className="lg:col-span-1">
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                id="startDate"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
              <input
                type="date"
                id="endDate"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-2 md:mb-0">
            <span className="text-sm text-gray-500">Total Transactions:</span>
            <span className="ml-1 font-medium">{filteredAndSortedPayments.length}</span>
          </div>
          <div className="mb-2 md:mb-0">
            <span className="text-sm text-gray-500">Successful Transactions:</span>
            <span className="ml-1 font-medium">{filteredAndSortedPayments.filter(p => p.status === 'success').length}</span>
          </div>
          <div className="mb-2 md:mb-0">
            <span className="text-sm text-gray-500">Failed Transactions:</span>
            <span className="ml-1 font-medium">{filteredAndSortedPayments.filter(p => p.status === 'failed').length}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Total Revenue:</span>
            <span className="ml-1 font-medium text-green-600">{formatCurrency(totalRevenue)}</span>
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
                Transaction ID
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
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => {
                    if (sortBy === 'paymentDate') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('paymentDate');
                      setSortOrder('desc');
                    }
                  }}
                >
                  Date
                  {sortBy === 'paymentDate' && (
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
                    if (sortBy === 'status') {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('status');
                      setSortOrder('asc');
                    }
                  }}
                >
                  Status
                  {sortBy === 'status' && (
                    <svg className={`ml-1 h-4 w-4 ${sortOrder === 'asc' ? '' : 'transform rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedPayments.length > 0 ? (
              filteredAndSortedPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.userName}</div>
                    <div className="text-sm text-gray-500">{payment.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(payment.total)}</div>
                    <div className="text-xs text-gray-500">
                      Base: {formatCurrency(payment.amount)} | Tax: {formatCurrency(payment.tax)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(payment.paymentDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatPaymentMethod(payment.paymentMethod)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/admin/payments/${payment.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View Details"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/payments/${payment.id}/invoice`}
                        className="text-blue-600 hover:text-blue-900"
                        title="Generate Invoice"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </Link>
                      {payment.status === 'success' && (
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to refund this payment?')) {
                              setPayments(payments.map(p => 
                                p.id === payment.id ? { ...p, status: 'refunded' } : p
                              ));
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Refund Payment"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center">
                  <div className="text-gray-500">
                    No payments found matching your filters.
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
            Showing <span className="font-medium">{filteredAndSortedPayments.length}</span> of{' '}
            <span className="font-medium">{payments.length}</span> payments
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

export default PaymentManager;
