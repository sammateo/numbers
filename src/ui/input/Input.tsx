import React from "react";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
}

const Input = ({
  id,
  label,
  type,
  value,
  placeholder,
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
        className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
};

export default Input;
