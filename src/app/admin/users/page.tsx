import React from 'react';
import UserManager from '@/components/admin/UserManager';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminUsersPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <AdminSidebar />
          </div>
          <div className="lg:col-span-3">
            {/* Main content */}
            <UserManager />
          </div>
        </div>
      </div>
    </div>
  );
}
