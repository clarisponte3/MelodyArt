import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAuthenticated, role, checkSession } = useAuthStore();

  const isSessionActive = isAuthenticated && checkSession();

  if (!isSessionActive) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'ROLE_ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
