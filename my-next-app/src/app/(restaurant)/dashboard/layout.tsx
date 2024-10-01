import React from 'react';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata = {
    title: 'Dashboard',
  };
  
  export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <AdminDashboard>
        {/* The children prop represents the content of the specific page currently being viewed */}
        {children}
      </AdminDashboard>
    );
  }
