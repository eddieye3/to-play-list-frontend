import React from "react";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { Loading } from "../ui/Loading";
import { useGlobalAuth } from "../../features/auth/context/globalAuthContext";

export function MainLayout({ children }: { children?: React.ReactNode }) {
  const { state } = useGlobalAuth();

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Loading
        isLoading={state.isLoading}
        fullscreen
      />
      <Container className="flex-1 flex flex-col items-center justify-center">
        {children}
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}
