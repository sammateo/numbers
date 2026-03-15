const OnboardingTitle = ({
  title = "Let's Make A Profile",
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="mb-4 w-full">
      <h1 className="text-2xl md:text-3xl mb-2">{title}</h1>
      {description && (
        <p className="text-sm md:text-base text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default OnboardingTitle;
