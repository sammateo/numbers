import type { ReactNode } from "react";

const OnboardingCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full space-y-4 md:space-y-6 bg-card border border-border rounded-lg p-4 md:p-6">
      {children}
    </div>
  );
};

export default OnboardingCard;
