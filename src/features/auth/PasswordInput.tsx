import React from "react";
import { Input } from "../../components/ui/Input";
interface PasswordInputProps {
  password: string;
  error: string | null;
  isRegistered: boolean | null;
  onPasswordChange: (pw: string) => void;
}

export function PasswordInput({
  password,
  error,
  isRegistered,
  onPasswordChange,
}: PasswordInputProps) {
  return (
    <>
      <label
        htmlFor="password"
        className="block font-medium text-neutral-700"
      >
        Password
      </label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder={"Your password"}
        value={password}
        onChange={onPasswordChange}
        invalid={isRegistered === false && !!error}
        autoComplete={isRegistered ? "current-password" : "new-password"}
      />
    </>
  );
}
