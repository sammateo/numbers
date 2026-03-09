import type { ButtonNavigationInterface } from "#/components/onboarding/ButtonNavigation";
import ButtonNavigation from "#/components/onboarding/ButtonNavigation";
import { useCreateBibleStudyStore } from "#/store/useCreateBibleStudyStore";
import StudyDescription from "../../components/StudyDescription";
import StudyTitle from "../../components/StudyTitle";

const EnterDescription = ({ next, back }: ButtonNavigationInterface) => {
  const title = useCreateBibleStudyStore((s) => s.title);
  const description = useCreateBibleStudyStore((s) => s.description);
  const setDescription = useCreateBibleStudyStore((s) => s.setDescription);
  return (
    <div className="max-w-lg mx-auto flex flex-col items-center gap-5">
      <div className="pt-4 text-center space-y-2">
        <StudyTitle title={title} />
        <StudyDescription description={description || "Enter description"} />
      </div>
      <label htmlFor="description">
        <span className="text-sm font-medium text-gray-700"> Description </span>
        <input
          defaultValue={description || ""}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          type="text"
          id="description"
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

export default EnterDescription;
