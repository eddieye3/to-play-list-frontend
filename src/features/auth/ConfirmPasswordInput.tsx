import React from "react";
import { Input } from "../../components/ui/Input";
import { useAuthFormContext } from "./context/authFormContext";

export function ConfirmPasswordInput() {
  const { state, handleConfirmPasswordChange } = useAuthFormContext();
  return (
    <>
      <label
        htmlFor="confirmPassword"
        className="block font-medium text-neutral-700"
      >
        Confirm Password
      </label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        value={state.confirmPassword}
        onChange={handleConfirmPasswordChange}
        invalid={!state.isRegistered && !!state.error}
        autoComplete="new-password"
      />
    </>
  );
}
