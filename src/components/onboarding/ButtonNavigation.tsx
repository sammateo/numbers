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
    <div className="flex gap-2 items-center">
      {back && (
        <button
          disabled={back.disabled}
          onClick={back.action}
          className="group relative inline-flex items-center overflow-hidden rounded-sm border border-current px-8 py-3 text-indigo-600"
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </span>

          <span className="text-sm font-medium transition-all group-hover:ms-4 group-disabled:ms-0">
            {" "}
            {back.label}{" "}
          </span>
        </button>
      )}
      {next && (
        <button
          disabled={next.disabled}
          className="group relative inline-flex items-center overflow-hidden rounded-sm bg-indigo-600 disabled:bg-gray-500 px-8 py-3 text-white"
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </span>

          <span className="text-sm font-medium transition-all group-hover:ms-4 group-disabled:ms-0">
            {" "}
            {next.label}{" "}
          </span>
        </button>
      )}
    </div>
  );
};

export default ButtonNavigation;
