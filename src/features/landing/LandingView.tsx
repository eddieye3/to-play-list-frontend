import React from "react";
import { Button } from "../../components/buttons/Button";
import { useGlobalAuth } from "../auth/context/globalAuthContext";

export function LandingView() {
  const { state, logout } = useGlobalAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-primary-700">
        Welcome to To-Play-List
      </h1>
      <p className="mb-4 text-lg text-neutral-800 text-center max-w-md">
        Track your gaming backlog, discover new releases, and manage your
        wishlist with real-time price and release info.
      </p>
      {state.user && (
        <p className="mb-6 text-sm text-neutral-600 text-center">
          Logged in as: <span className="font-medium">{state.user.email}</span>
        </p>
      )}
      <div className="flex gap-4 flex-col sm:flex-row">
        <Button
          size="lg"
          variant="primary"
        >
          Get Started
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </>
  );
}
