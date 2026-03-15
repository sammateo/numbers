import { useUserStore } from "#/store/useUserStore";
import Input from "#/ui/input/Input";
import type { ButtonNavigationInterface } from "./ButtonNavigation";
import ButtonNavigation from "./ButtonNavigation";
import OnboardingCard from "./OnboardingCard";
import OnboardingTitle from "./OnboardingTitle";

const ChooseUsername = ({ next, back }: ButtonNavigationInterface) => {
  const { firstName, username, setUsername } = useUserStore();

  return (
    <>
      <OnboardingTitle
        title={`Hi ${firstName}`}
        description="Please select a username below"
      />
      <OnboardingCard>
        <div className="space-y-2">
          <Input
            label="Username"
            defaultValue={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            id="FirstName"
          />

          <ButtonNavigation
            next={{
              ...next!,
              disabled: !username,
            }}
            back={back}
          />
        </div>
      </OnboardingCard>
    </>
  );
};

export default ChooseUsername;
