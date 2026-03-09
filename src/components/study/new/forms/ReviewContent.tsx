import ButtonNavigation, {
  type ButtonNavigationInterface,
} from "#/components/onboarding/ButtonNavigation";
import { useCreateBibleStudyStore } from "#/store/useCreateBibleStudyStore";
import StudyDescription from "../../components/StudyDescription";
import StudyTitle from "../../components/StudyTitle";
import BibleStudyContentEditor from "../BibleStudyContentEditor";

const ReviewContent = ({ next, back }: ButtonNavigationInterface) => {
  const title = useCreateBibleStudyStore((s) => s.title);
  const description = useCreateBibleStudyStore((s) => s.description);
  const content = useCreateBibleStudyStore((s) => s.content);

  return (
    <div className="max-w-5xl mx-auto flex flex-col items-stretch gap-5">
      <div className="pt-4 text-center space-y-2">
        <StudyTitle title={title} />
        <StudyDescription description={description || "Enter description"} />
      </div>
      <BibleStudyContentEditor disabled={true} content={content} />
      <div className="flex gap-2 justify-center">
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

export default ReviewContent;
