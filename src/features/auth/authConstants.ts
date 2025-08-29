export const PASSWORD_CONDITIONS = [
  {
    label: "At least 8 characters long",
    test: (pw: string) => pw.length >= 8,
  },
  {
    label: "At least one lowercase letter (a-z)",
    test: (pw: string) => /[a-z]/.test(pw),
  },
  {
    label: "At least one uppercase letter (A-Z)",
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: "At least one number (0-9)",
    test: (pw: string) => /[0-9]/.test(pw),
  },
  {
    label: "At least one special character",
    test: (pw: string) => /[^a-zA-Z0-9]/.test(pw),
  },
];

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
