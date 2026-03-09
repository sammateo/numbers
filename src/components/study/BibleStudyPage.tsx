import { getRouteApi, Link } from "@tanstack/react-router";
import StudyDescription from "./components/StudyDescription";
import StudyTitle from "./components/StudyTitle";
import BibleStudyContentEditor from "./new/BibleStudyContentEditor";

const BibleStudyPage = () => {
  const routeApi = getRouteApi("/_authed/study/$studyId");
  const bibleStudy = routeApi.useLoaderData();
  return (
    <div className="max-w-5xl pt-4 mx-auto flex flex-col items-stretch gap-5">
      <Link to="/study">Back to studies</Link>
      <div className=" text-center space-y-2">
        <StudyTitle title={bibleStudy?.title || "title"} />
        <StudyDescription
          description={bibleStudy?.description || "description"}
        />
      </div>
      <BibleStudyContentEditor
        disabled={true}
        content={bibleStudy?.content || null}
      />
      <div className="flex gap-2 justify-center">
        <Link to="/study">Back to studies</Link>
      </div>
    </div>
  );
};

export default BibleStudyPage;
