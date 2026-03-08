import { useUserStore } from "#/store/useUserStore";
import ButtonNavigation, {
  type ButtonNavigationInterface,
} from "./ButtonNavigation";

const EnterName = ({ next, back }: ButtonNavigationInterface) => {
  const { firstName, lastName, setFirstName, setLastName } = useUserStore();

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center gap-5">
      <label htmlFor="FirstName">
        <span className="text-sm font-medium text-gray-700"> First Name </span>
        <input
          defaultValue={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          id="FirstName"
          className="mt-0.5 px-2 py-2 outline-0 border-2 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        />
      </label>
      <label htmlFor="LastName">
        <span className="text-sm font-medium text-gray-700"> Last Name </span>
        <input
          defaultValue={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
          id="LastName"
          className="mt-0.5 px-2 py-2 outline-0 border-2 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        />
      </label>
      <div className="flex gap-2 items-center">
        <ButtonNavigation
          next={{
            ...next!,
            disabled: !firstName || !lastName,
          }}
          back={back}
        />
      </div>
    </div>
  );
};

export default EnterName;
