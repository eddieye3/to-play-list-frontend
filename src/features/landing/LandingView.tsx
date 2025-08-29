import React from "react";
import { Button } from "../../components/buttons/Button";

export function LandingView() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-primary-700">
        Welcome to To-Play-List
      </h1>
      <p className="mb-8 text-lg text-neutral-800 text-center max-w-md">
        Track your gaming backlog, discover new releases, and manage your
        wishlist with real-time price and release info.
      </p>
      <Button
        size="lg"
        variant="primary"
      >
        Get Started
      </Button>
    </>
  );
}
