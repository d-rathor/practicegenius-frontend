"use client";

import React, { useState } from 'react';

// Create placeholder components for charts when the libraries are not available
const PlaceholderChart = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full border border-gray-200 rounded-lg bg-gray-50">
    <div className="text-center p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">
        Chart visualization requires chart.js and react-chartjs-2 packages.
        <br />
        Please install them with: <code>npm install chart.js react-chartjs-2</code>
      </p>
    </div>
  </div>
);

// Placeholder for chart components
const Line = ({ options, data }: any) => <PlaceholderChart title="Line Chart" />;
const Bar = ({ options, data }: any) => <PlaceholderChart title="Bar Chart" />;
const Doughnut = ({ options, data }: any) => <PlaceholderChart title="Doughnut Chart" />;

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days' | '12months'>('30days');

  // Mock data for user growth
  const userGrowthData = {
    '7days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'New Users',
          data: [5, 8, 12, 7, 10, 15, 18],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    },
    '30days': {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      datasets: [
        {
          label: 'New Users',
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 5),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    },
    '90days': {
      labels: Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`),
      datasets: [
        {
          label: 'New Users',
          data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 50),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    },
    '12months': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'New Users',
          data: [120, 150, 180, 210, 250, 280, 320, 350, 390, 420, 450, 490],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    },
  };

  // Mock data for revenue
  const revenueData = {
    '7days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Revenue (₹)',
          data: [2500, 3200, 2800, 3500, 4200, 3800, 4500],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    },
    '30days': {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      datasets: [
        {
          label: 'Revenue (₹)',
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 3000) + 2000),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    },
    '90days': {
      labels: Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`),
      datasets: [
        {
          label: 'Revenue (₹)',
          data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 15000) + 10000),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    },
    '12months': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Revenue (₹)',
          data: [45000, 52000, 58000, 65000, 72000, 78000, 85000, 92000, 98000, 105000, 112000, 120000],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    },
  };

  // Mock data for subscription distribution
  const subscriptionData = {
    labels: ['Free', 'Essential', 'Premium'],
    datasets: [
      {
        label: 'Subscriptions',
        data: [450, 320, 230],
        backgroundColor: [
          'rgba(128, 128, 128, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgb(128, 128, 128)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Mock data for worksheet downloads by subject
  const worksheetDownloadsData = {
    labels: ['Math', 'Science', 'English'],
    datasets: [
      {
        label: 'Downloads',
        data: [1250, 980, 850],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 159, 64)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Growth',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Revenue',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Time range selector */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-wrap justify-between items-center">
          <h2 className="text-xl font-semibold mb-4 md:mb-0">Analytics Dashboard</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('7days')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                timeRange === '7days'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30days')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                timeRange === '30days'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('90days')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                timeRange === '90days'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              90 Days
            </button>
            <button
              onClick={() => setTimeRange('12months')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                timeRange === '12months'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              12 Months
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Growth */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">User Growth</h3>
          <div className="h-80">
            <Line options={lineOptions} data={userGrowthData[timeRange]} />
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Revenue</h3>
          <div className="h-80">
            <Bar options={barOptions} data={revenueData[timeRange]} />
          </div>
        </div>

        {/* Subscription Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Subscription Distribution</h3>
          <div className="h-80">
            <Doughnut options={doughnutOptions} data={subscriptionData} />
          </div>
        </div>

        {/* Worksheet Downloads by Subject */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Worksheet Downloads by Subject</h3>
          <div className="h-80">
            <Doughnut options={doughnutOptions} data={worksheetDownloadsData} />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
            <p className="text-2xl font-semibold">18.5%</p>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>2.3% from last period</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Avg. Session Duration</p>
            <p className="text-2xl font-semibold">8m 12s</p>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>0:42 from last period</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Churn Rate</p>
            <p className="text-2xl font-semibold">5.2%</p>
            <div className="flex items-center mt-2 text-sm text-red-600">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>0.8% from last period</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Avg. Revenue Per User</p>
            <p className="text-2xl font-semibold">₹285</p>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>₹18 from last period</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
