import ButtonLink from "#/ui/button/ButtonLink";

const NoBibleStudies = ({
  type = "default",
}: {
  type?: "default" | "shared";
}) => {
  const noBibleStudiesCopy = {
    heading: {
      default: "Hmm, nothing found",
      shared: "Hmm, nothing found",
    },
    subtext: {
      default:
        "It seems like you do not have any Bible studies as yet. Get started by creating one",
      shared: "Bible studies shared with you will appear here",
    },
    primaryButton: {
      text: {
        default: "New Bible Study",
        shared: "New Bible Study",
      },
      link: {
        default: "/study/new",
        shared: "/study/new",
      },
    },
    secondaryButton: {
      text: {
        default: "Home",
        shared: "Home",
      },
      link: {
        default: "/",
        shared: "/",
      },
    },
  };
  return (
    <div className="max-w-md text-center mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="mx-auto size-20 text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
        ></path>
      </svg>

      <h2 className="mt-6 text-2xl font-bold text-primary">
        {noBibleStudiesCopy.heading[type]}
      </h2>

      <p className="mt-4 text-pretty text-muted-foreground">
        {noBibleStudiesCopy.subtext[type]}
      </p>

      <div className="mt-6 space-y-2">
        <ButtonLink
          className="w-full block"
          to={noBibleStudiesCopy.primaryButton.link[type]}
          label={noBibleStudiesCopy.primaryButton.text[type]}
        />
        <ButtonLink
          className="w-full block border border-primary"
          to={noBibleStudiesCopy.secondaryButton.link[type]}
          label={noBibleStudiesCopy.secondaryButton.text[type]}
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default NoBibleStudies;
