import { useUserStore } from "#/store/useUserStore";
import type { ButtonNavigationInterface } from "./ButtonNavigation";
import ButtonNavigation from "./ButtonNavigation";

const ChooseUsername = ({ next, back }: ButtonNavigationInterface) => {
  const { firstName, username, setUsername } = useUserStore();

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center gap-5">
      <div className="pt-4 text-center">
        <h2 className="text-2xl font-semibold">Hello {firstName}</h2>
        <p className="text-sm text-gray-500">Please select a username below</p>
      </div>
      <label htmlFor="Username">
        <span className="text-sm font-medium text-gray-700"> Username </span>
        <input
          defaultValue={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          id="FirstName"
          className="mt-0.5 px-2 py-2 outline-0 border-2 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        />
      </label>

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

export default ChooseUsername;
