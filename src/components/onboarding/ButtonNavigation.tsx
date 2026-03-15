import Button from "#/ui/button/Button";

export interface ButtonInterface {
  label: string;
  action: () => void;
  disabled?: boolean;
}

export interface ButtonNavigationInterface {
  next?: ButtonInterface;
  back?: ButtonInterface;
}

const ButtonNavigation = ({ next, back }: ButtonNavigationInterface) => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-start">
      {back && (
        <Button
          disabled={back.disabled}
          onClick={back.action}
          variant="secondary"
          className="group relative inline-flex items-center overflow-hidden border gap-2 px-8"
        >
          <span className="absolute -start-full transition-all group-hover:inset-s-4 group-disabled:-start-full">
            <svg
              className="size-5 rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </span>

          <span className="text-sm font-medium transition-all group-hover:ms-4 group-disabled:ms-0">
            {" "}
            {back.label}{" "}
          </span>
        </Button>
      )}
      {next && (
        <Button
          disabled={next.disabled}
          className="group relative inline-flex items-center overflow-hidden gap-2 px-8"
          onClick={next.action}
        >
          <span className="absolute -start-full transition-all group-hover:inset-s-4 group-disabled:-start-full">
            <svg
              className="size-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </span>

          <span className="text-sm font-medium transition-all group-hover:ms-4 group-disabled:ms-0">
            {" "}
            {next.label}{" "}
          </span>
        </Button>
      )}
    </div>
  );
};

export default ButtonNavigation;
