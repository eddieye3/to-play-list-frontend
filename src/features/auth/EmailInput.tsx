import React from "react";
import { Input } from "../../components/ui/Input";

interface EmailInputProps {
  email: string;
  onChange: (email: string) => void;
  onBlur: () => void;
  error: string | null;
}

export function EmailInput({
  email,
  onChange,
  onBlur,
  error,
}: EmailInputProps) {
  return (
    <>
      <label
        htmlFor="email"
        className="block font-medium text-neutral-700"
      >
        Email address
      </label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={onChange}
        onBlur={onBlur}
        invalid={!!error}
        autoComplete="email"
      />
    </>
  );
}
