import React from "react";
import { Input } from "../../components/ui/Input";
import { useAuthFormContext } from "./context/authFormContext";

export function EmailInput() {
  const { state, handleEmailChange, handleEmailBlur } = useAuthFormContext();
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
        value={state.email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        invalid={!!state.emailError}
        autoComplete="email"
      />
    </>
  );
}
