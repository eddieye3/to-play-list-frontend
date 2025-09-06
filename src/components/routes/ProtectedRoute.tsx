import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGlobalAuth } from "../../features/auth/context/globalAuthContext";
import Loading from "../ui/Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { state } = useGlobalAuth();
  const location = useLocation();

  if (state.isLoading) {
    return <Loading />;
  }

  // Redirect to auth page if not authenticated
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
