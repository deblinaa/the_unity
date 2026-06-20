import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const StaffRoute = ({ allowedRoles = [] }) => {
  const { session, role, isLoading } = useAuthStore();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/staff/login" replace />;
  }

  if (!role) {
    return <Navigate to="/dashboard" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role) && role !== 'Admin') {
    return <Navigate to="/staff/dashboard" replace />;
  }

  return <Outlet />;
};
