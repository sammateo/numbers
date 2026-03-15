import { useUserStore } from "#/store/useUserStore";
import type { ButtonNavigationInterface } from "./ButtonNavigation";
import ButtonNavigation from "./ButtonNavigation";
import OnboardingCard from "./OnboardingCard";
import OnboardingTitle from "./OnboardingTitle";

const ReviewDetails = ({ next, back }: ButtonNavigationInterface) => {
  const { firstName, lastName, username } = useUserStore();

  return (
    <>
      <OnboardingTitle
        title={`Hello ${username}`}
        description="Please review the details below"
      />
      <OnboardingCard>
        <div>
          <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-200 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">First Name</dt>

                <dd className="text-gray-700 sm:col-span-2">{firstName}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Last Name</dt>

                <dd className="text-gray-700 sm:col-span-2">{lastName}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Username</dt>

                <dd className="text-gray-700 sm:col-span-2">@{username}</dd>
              </div>
            </dl>
          </div>
        </div>

        <ButtonNavigation
          next={{
            ...next!,
            disabled: !username,
          }}
          back={back}
        />
      </OnboardingCard>
    </>
  );
};

export default ReviewDetails;
