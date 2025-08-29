import React from "react";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function MainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Container className="flex-1 flex flex-col items-center justify-center">
        {children}
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}
