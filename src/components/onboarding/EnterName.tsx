import { useUserStore } from "#/store/useUserStore";
import Input from "#/ui/input/Input";
import { useRouteContext } from "@tanstack/react-router";
import ButtonNavigation, {
  type ButtonNavigationInterface,
} from "./ButtonNavigation";
import OnboardingCard from "./OnboardingCard";
import OnboardingTitle from "./OnboardingTitle";

const EnterName = ({ next, back }: ButtonNavigationInterface) => {
  const { firstName, lastName, setFirstName, setLastName } = useUserStore();
  const { profile } = useRouteContext({ from: "__root__" });

  return (
    <>
      <OnboardingTitle
        title={profile && profile.username ? "Update your profile" : undefined}
        description="Enter your name"
      />
      <OnboardingCard>
        <div className="w-full space-y-2">
          <label htmlFor="FirstName" className="block text-sm">
            First Name
          </label>
          <Input
            placeholder="Enter your first name"
            defaultValue={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            id="FirstName"
          />
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="LastName" className="block text-sm">
            Last Name
          </label>
          <Input
            placeholder="Enter your last name"
            defaultValue={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            id="LastName"
          />
        </div>
        <ButtonNavigation
          next={{
            ...next!,
            disabled: !firstName || !lastName,
          }}
          back={back}
        />
      </OnboardingCard>
    </>
  );
};

export default EnterName;
