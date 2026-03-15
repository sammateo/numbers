import { Link } from "@tanstack/react-router";
import OnboardingCard from "./OnboardingCard";
import Button from "#/ui/button/Button";
import { CircleCheck } from "lucide-react";

const Completed = () => {
  return (
    <>
      <OnboardingCard>
        <div className="py-4 text-center text-primary items-center justify-center flex flex-col gap-5">
          <CircleCheck className="size-14" />
          <h2 className="text-2xl font-semibold">Profile Update completed</h2>
          <Link to="/study">
            <Button>View Studies</Button>
          </Link>
        </div>
      </OnboardingCard>
    </>
  );
};

export default Completed;
