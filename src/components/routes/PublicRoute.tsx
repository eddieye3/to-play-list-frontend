import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGlobalAuth } from "../../features/auth/context/globalAuthContext";
import Loading from "../ui/Loading";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function PublicRoute({ children, redirectTo = "/" }: PublicRouteProps) {
  const { state } = useGlobalAuth();
  const location = useLocation();

  if (state.isLoading) {
    return <Loading />;
  }

  if (state.isAuthenticated) {
    // If user was redirected here from a protected route, go back there
    const from = location.state?.from || redirectTo;
    return (
      <Navigate
        to={from}
        replace
      />
    );
  }

  return <>{children}</>;
}
