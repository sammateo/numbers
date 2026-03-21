import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

export interface ButtonProps {
  label?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "destructive";
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
}

export const buttonVariants = tv({
  base: "cursor-pointer px-4 py-2 transition-colors rounded-lg",
  variants: {
    color: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-primary-foreground hover:bg-destructive/90",
      secondary: "text-foreground hover:text-primary",
    },
    disabled: {
      true: "bg-muted cursor-not-allowed hover:bg-muted",
      false: "",
    },
  },
});

const Button = ({
  label,
  onClick,
  variant = "primary",
  className,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonVariants({
        color: variant,
        disabled,
        className,
      })}
    >
      {children || label}
    </button>
  );
};

export default Button;
