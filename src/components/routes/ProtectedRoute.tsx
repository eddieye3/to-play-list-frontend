import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { state } = useAuth();
  const location = useLocation();

  // Show loading only during initial auth check (before any auth result)
  // We need to distinguish between "checking auth" vs "logged out"
  const isInitialLoad =
    state.user === null && state.error === null && !state.hasCheckedAuth;

  if (isInitialLoad) {
    return null;
  }

  if (!state.isAuthenticated) {
    return (
      <Navigate
        to="/auth"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
}
