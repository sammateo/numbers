import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

const buttonVariants = tv({
  base: "cursor-pointer px-4 py-2 transition-colors rounded-lg",
  variants: {
    color: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "text-foreground hover:text-primary",
    },
  },
});

const Button = ({
  label,
  onClick,
  variant = "primary",
  className,
  children,
}: {
  label?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={buttonVariants({ color: variant, className: className })}
    >
      {children || label}
    </button>
  );
};

export default Button;
