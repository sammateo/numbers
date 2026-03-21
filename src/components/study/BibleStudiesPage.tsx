import { getRouteApi, Link } from "@tanstack/react-router";
import NoBibleStudies from "./NoBibleStudies";
import { FiPlusCircle } from "react-icons/fi";
import NewCard from "./NewCard";

const BibleStudiesPage = () => {
  const routeApi = getRouteApi("/_authed/study/");
  const data = routeApi.useLoaderData();
  return (
    <div className="py-8 lg:max-w-2xl mx-auto flex flex-col items-stretch gap-5">
      <div className="mb-10 flex-col gap-y-2 sm:flex-row flex  sm:items-center justify-between">
        <div>
          <h2 className="text-3xl/tight font-semibold sm:text-4xl w-fit">
            My Bible Studies
          </h2>
          <p className="text-muted-foreground font-light">
            Create, organize, and share your scripture studies
          </p>
        </div>
        <Link
          to="/study/new"
          className="flex justify-center items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md"
        >
          <FiPlusCircle className="text-lg" />
          New <span className="hidden sm:block">Study</span>
        </Link>
      </div>
      {(!data || data.length === 0) && <NoBibleStudies />}
      {data && data.length > 0 && (
        <div className="flex flex-col items-stretch gap-5">
          <h3 className="font-semibold text-lg">My Studies</h3>
          <div className="flex flex-col items-stretch gap-5">
            {data.map((bible_study) => (
              <NewCard key={bible_study.id} {...bible_study} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleStudiesPage;
