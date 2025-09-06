import React from "react";
import { useAuthFormContext } from "./context/authFormContext";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { SignupButton } from "./SignupButton";
import { PasswordChecklist } from "./PasswordChecklist";
import { ConfirmPasswordInput } from "./ConfirmPasswordInput";
import { PASSWORD_CONDITIONS } from "./constants/authConstants";

export function AuthForm() {
  const { state, handleSubmit } = useAuthFormContext();

  const totalConditions = PASSWORD_CONDITIONS.length;
  const pwChecklist = PASSWORD_CONDITIONS.map((cond) =>
    cond.test(state.password)
  );
  const conditionMet = pwChecklist.filter(Boolean).length;
  const submitDisabled =
    state.error !== null ||
    state.emailError !== null ||
    !state.email ||
    !state.password ||
    (state.isRegistered === false && conditionMet < totalConditions);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <form
        className="w-full max-w-sm space-y-4"
        onSubmit={handleSubmit}
      >
        <EmailInput />
        {state.emailError && (
          <span className="text-xs text-red-500">{state.emailError}</span>
        )}
        {state.showPassword && <PasswordInput />}
        {state.isRegistered === false && (
          <PasswordChecklist pwChecklist={pwChecklist} />
        )}
        {state.isRegistered === false && <ConfirmPasswordInput />}
        {state.error && (
          <span className="text-xs text-red-500">{state.error}</span>
        )}
        {state.showPassword && (
          <SignupButton
            isRegistered={state.isRegistered ?? true}
            disabled={submitDisabled}
          />
        )}
      </form>
    </div>
  );
}
