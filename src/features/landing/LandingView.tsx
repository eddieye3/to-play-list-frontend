import React from "react";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../contexts/authContext";

// Temp showcase page
export function LandingView() {
  const { state, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-primary-700">Welcome</h1>
      {state.user && (
        <p className="mb-6 text-sm text-neutral-600 text-center">
          Logged in as: <span className="font-medium">{state.user.email}</span>
        </p>
      )}
      <div className="flex gap-4 flex-col sm:flex-row">
        <Button
          size="lg"
          variant="primary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </>
  );
}
