import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface GuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, checkSession } = useAuthStore();
  const [searchParams] = useSearchParams();

  if (isAuthenticated && checkSession()) {
    const redirectUrl = searchParams.get('redirect') || '/dashboard';
    return <Navigate to={redirectUrl} replace />;
  }

  return <>{children}</>;
};
