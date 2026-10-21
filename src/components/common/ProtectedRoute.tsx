import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { WeTradeLogo } from './WeTradeLogo';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isApproved, isPending, isRejected, isSuspended, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200/80 flex flex-col items-center gap-4 max-w-xs w-full text-center">
          <WeTradeLogo variant="horizontal" height={38} />
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-4 h-4 border-2 border-[#07145B]/20 border-t-[#07145B] rounded-full animate-spin" />
            <span>Verifying Security Clearance...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isPending) {
    return <Navigate to="/pending-approval" replace />;
  }

  if (isRejected || isSuspended) {
    return <Navigate to="/access-restricted" replace />;
  }

  if (!isApproved) {
    return <Navigate to="/pending-approval" replace />;
  }

  return <>{children}</>;
};
