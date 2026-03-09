import { getRouteApi, Link } from "@tanstack/react-router";
import NoBibleStudies from "./NoBibleStudies";
import Card from "./Card";

const BibleStudyPage = () => {
  const routeApi = getRouteApi("/_authed/study/");
  const data = routeApi.useLoaderData();
  console.log(data);
  return (
    <div className="py-8 max-w-2xl mx-auto flex flex-col items-stretch gap-5">
      <div className="mx-auto max-w-lg text-center mb-10">
        <h2 className="text-3xl/tight font-bold text-gray-900 sm:text-4xl border-b-4 border-b-indigo-600 w-fit mx-auto text-center px-2">
          Bible Studies
        </h2>
      </div>
      {!data || (data.length === 0 && <NoBibleStudies />)}
      {data && data.length > 0 && (
        <div className="flex flex-col items-stretch gap-5">
          <div className="flex justify-end">
            <Link
              to="/study/new"
              className="block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              New Study
            </Link>
          </div>
          <div className="flex flex-col items-stretch gap-5">
            {data.map((bible_study) => (
              <Card key={bible_study.id} {...bible_study} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleStudyPage;
