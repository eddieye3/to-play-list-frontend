import React from "react";
import { useAuthFlow } from "./useAuthFlow";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { SignupButton } from "./SignupButton";
import { PasswordChecklist } from "./PasswordChecklist";
import { ConfirmPasswordInput } from "./ConfirmPasswordInput";
import { PASSWORD_CONDITIONS } from "./authConstants";

export function AuthView() {
  const {
    state,
    onEmailChange,
    onEmailBlur,
    onPasswordChange,
    onConfirmPasswordChange,
    reset,
    handleSubmit,
  } = useAuthFlow();

  const totalConditions = PASSWORD_CONDITIONS.length;
  const pwChecklist = PASSWORD_CONDITIONS.map((cond) =>
    cond.test(state.password)
  );
  const conditionMet = pwChecklist.filter(Boolean).length;
  const submitDisabled =
    state.loading ||
    !state.email ||
    !state.password ||
    (state.isRegistered === false && conditionMet < totalConditions);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <form
        className="w-full max-w-sm space-y-4"
        onSubmit={handleSubmit}
      >
        <EmailInput
          email={state.email}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
          error={state.emailError}
        />
        {state.emailError && (
          <span className="text-xs text-red-500">{state.emailError}</span>
        )}
        {state.showPassword && (
          <PasswordInput
            password={state.password}
            error={state.error}
            isRegistered={state.isRegistered}
            onPasswordChange={onPasswordChange}
          />
        )}
        {state.isRegistered === false && (
          <PasswordChecklist pwChecklist={pwChecklist} />
        )}
        {state.isRegistered === false && (
          <ConfirmPasswordInput
            confirmPassword={state.confirmPassword}
            error={state.error}
            isRegistered={state.isRegistered ?? false}
            onConfirmPasswordChange={onConfirmPasswordChange}
          />
        )}
        {state.error && (
          <span className="text-xs text-red-500">{state.error}</span>
        )}
        {state.showPassword && (
          <SignupButton
            isRegistered={state.isRegistered}
            disabled={submitDisabled}
          />
        )}
      </form>
    </div>
  );
}
