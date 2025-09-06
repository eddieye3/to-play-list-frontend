import React from "react";
import { Button } from "../../components/buttons/Button";

interface SignupButtonProps {
  isRegistered: boolean;
  disabled: boolean;
}

export function SignupButton({ isRegistered, disabled }: SignupButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="md"
      className="w-full"
      disabled={disabled}
    >
      {isRegistered ? "Login" : "Sign Up"}
    </Button>
  );
}
