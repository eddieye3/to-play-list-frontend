import React from "react";
import { Input } from "../../components/ui/Input";
interface ConfirmPasswordInputProps {
  confirmPassword: string;
  error: string | null;
  isRegistered: boolean;
  onConfirmPasswordChange: (pw: string) => void;
}

export function ConfirmPasswordInput({
  confirmPassword,
  error,
  isRegistered,
  onConfirmPasswordChange,
}: ConfirmPasswordInputProps) {
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
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        invalid={!isRegistered && !!error}
        autoComplete="new-password"
      />
    </>
  );
}
