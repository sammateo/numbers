import React from "react";
import { tv } from "tailwind-variants";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: boolean;
}

const inputVariants = tv({
  base: "w-full px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20",
  variants: {
    error: {
      true: "border-destructive focus:ring-destructive/20",
      false: "",
    },
    disabled: {
      true: "bg-muted cursor-not-allowed hover:bg-muted",
      false: "",
    },
  },
});

const Input = ({
  id,
  label,
  type,
  value,
  placeholder,
  disabled,
  error,
  ...props
}: InputProps) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        {...props}
        className={inputVariants({ disabled, error })}
      />
    </div>
  );
};

export default Input;
