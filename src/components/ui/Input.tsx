interface InputProps {
  id?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  autoComplete?: string;
  className?: string;
  invalid?: boolean;
}

export function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  autoComplete,
  className = "",
  invalid = false,
}: InputProps) {
  const baseClasses =
    "w-full px-3 py-2 border rounded-md focus:outline-none transition-colors";
  const normalClasses = "border-neutral-200 focus:border-primary-500";
  const invalidClasses =
    "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200";
  const combinedClasses = `${baseClasses} ${
    invalid ? invalidClasses : normalClasses
  } ${className}`;

  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={onBlur}
      autoComplete={autoComplete}
      className={combinedClasses}
      aria-invalid={invalid || undefined}
    />
  );
}
