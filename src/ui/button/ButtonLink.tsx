import { Link, type ToPathOption } from "@tanstack/react-router";
import { buttonVariants, type ButtonProps } from "./Button";

export interface ButtonLinkProps extends ButtonProps {
  to: ToPathOption;
}
const ButtonLink = ({
  to,
  variant = "primary",
  disabled,
  className,
  children,
  label,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      to={to}
      className={buttonVariants({
        color: variant,
        disabled,
        className,
      })}
      disabled={disabled}
      {...props}
    >
      {children || label}
    </Link>
  );
};

export default ButtonLink;
