import type { ButtonNavigationInterface } from "#/components/onboarding/ButtonNavigation";
import ButtonNavigation from "#/components/onboarding/ButtonNavigation";
import { useCreateBibleStudyStore } from "#/store/useCreateBibleStudyStore";
import StudyTitle from "../../components/StudyTitle";

const EnterTitle = ({ next, back }: ButtonNavigationInterface) => {
  const title = useCreateBibleStudyStore((s) => s.title);
  const setTitle = useCreateBibleStudyStore((s) => s.setTitle);
  return (
    <div className="max-w-lg mx-auto flex flex-col items-center gap-5">
      <div className="pt-4 text-center">
        <StudyTitle title={title || "Enter Title"} />
      </div>
      <label htmlFor="title">
        <span className="text-sm font-medium text-gray-700"> Title </span>
        <input
          defaultValue={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          id="title"
          className="mt-0.5 px-2 py-2 outline-0 border-2 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        />
      </label>

      <div className="flex gap-2 items-center">
        <ButtonNavigation
          next={{
            ...next!,
            disabled: !title,
          }}
          back={back}
        />
      </div>
    </div>
  );
};

export default EnterTitle;
