import { LoaderCircle } from "lucide-react";
import OnboardingCard from "./OnboardingCard";

const Submitting = () => {
  return (
    <>
      <OnboardingCard>
        <div className="py-4 text-center text-primary items-center flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Submitting</h2>
          <LoaderCircle className="animate-spin" />
        </div>
      </OnboardingCard>
    </>
  );
};

export default Submitting;
