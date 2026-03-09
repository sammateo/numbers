import ButtonNavigation, {
  type ButtonNavigationInterface,
} from "#/components/onboarding/ButtonNavigation";
import { useCreateBibleStudyStore } from "#/store/useCreateBibleStudyStore";
import { useRouteContext } from "@tanstack/react-router";
import StudyDescription from "../../components/StudyDescription";
import StudyTitle from "../../components/StudyTitle";
import BibleStudyContentEditor from "../BibleStudyContentEditor";

const EnterContent = ({ next, back }: ButtonNavigationInterface) => {
  const title = useCreateBibleStudyStore((s) => s.title);
  const description = useCreateBibleStudyStore((s) => s.description);
  const content = useCreateBibleStudyStore((s) => s.content);
  const setContent = useCreateBibleStudyStore((s) => s.setContent);
  const { isAuthenticated } = useRouteContext({ from: "__root__" });
  return (
    <div>
      <div className="max-w-lg mx-auto flex flex-col items-center gap-5">
        <div className="pt-4 text-center space-y-2">
          <StudyTitle title={title} />
          <StudyDescription description={description || "Enter description"} />
        </div>
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
      <div>
        <BibleStudyContentEditor
          disabled={!isAuthenticated}
          content={content}
          setContent={setContent}
        />
      </div>
    </div>
  );
};

export default EnterContent;
