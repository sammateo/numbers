import { useUserStore } from "#/store/useUserStore";
import type { ButtonNavigationInterface } from "./ButtonNavigation";
import ButtonNavigation from "./ButtonNavigation";

const ReviewDetails = ({ next, back }: ButtonNavigationInterface) => {
  const { firstName, lastName, username } = useUserStore();

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center gap-5">
      <div className="pt-4 text-center">
        <h2 className="text-2xl font-semibold">Hello {firstName}</h2>
        <p className="text-sm text-gray-500">Please review the details below</p>
      </div>
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

              <dd className="text-gray-700 sm:col-span-2">{username}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <ButtonNavigation
          next={{
            ...next!,
            disabled: !username,
          }}
          back={back}
        />
      </div>
    </div>
  );
};

export default ReviewDetails;
