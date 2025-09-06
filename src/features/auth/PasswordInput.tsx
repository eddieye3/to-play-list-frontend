import React from "react";
import { Input } from "../../components/ui/Input";
import { useAuthFormContext } from "./context/authFormContext";

export function PasswordInput() {
  const { state, handlePasswordChange } = useAuthFormContext();
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
        value={state.password}
        onChange={handlePasswordChange}
        invalid={state.isRegistered === false && !!state.error}
        autoComplete={state.isRegistered ? "current-password" : "new-password"}
      />
    </>
  );
}
