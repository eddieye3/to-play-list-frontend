import React from "react";
import { PASSWORD_CONDITIONS } from "./authConstants";

interface PasswordChecklistProps {
  pwChecklist: boolean[];
}

export function PasswordChecklist({ pwChecklist }: PasswordChecklistProps) {
  return (
    <div
      className="rounded-lg border border-primary-100 bg-primary-50 dark:bg-primary-900/40 p-3 mb-2 shadow-sm"
      aria-label="Password requirements"
    >
      <div className="font-semibold text-primary-700 text-sm mb-2">
        Password must contain:
      </div>
      <ul className="space-y-1">
        {PASSWORD_CONDITIONS.map((cond, i) => (
          <li
            key={cond.label}
            className="flex items-center gap-2 text-sm"
          >
            {pwChecklist[i] ? (
              <span
                className="inline-flex items-center justify-center rounded-full bg-primary-200 text-primary-700 w-5 h-5"
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 8.5l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : (
              <span
                className="inline-flex items-center justify-center rounded-full bg-neutral-200 text-neutral-400 w-5 h-5"
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            )}
            <span
              className={
                pwChecklist[i] ? "text-primary-800" : "text-neutral-500"
              }
            >
              {cond.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
