import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function PublicRoute({ children, redirectTo = "/" }: PublicRouteProps) {
  const { state } = useAuth();
  const location = useLocation();

  if (!state.isAuthenticated) {
    return <>{children}</>;
  }

  // Redirect authenticated users to their intended destination
  const from = location.state?.from || redirectTo;
  return (
    <Navigate
      to={from}
      replace
    />
  );
}
