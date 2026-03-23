import { getRouteApi } from "@tanstack/react-router";
import NewCard from "../study/NewCard";
import NoBibleStudies from "../study/NoBibleStudies";

const SharedStudiesPage = () => {
  const routeApi = getRouteApi("/_authed/shared/");
  const data = routeApi.useLoaderData();
  return (
    <div className="py-8 lg:max-w-2xl mx-auto flex flex-col items-stretch gap-5">
      <div className="mb-10 flex-col gap-y-2 sm:flex-row flex  sm:items-center justify-between">
        <div>
          <h2 className="text-3xl/tight font-semibold sm:text-4xl w-fit">
            Shared with me
          </h2>
          <p className="text-muted-foreground font-light">
            My shared scripture studies
          </p>
        </div>
      </div>
      {(!data || data.length === 0) && <NoBibleStudies />}
      {data && data.length > 0 && (
        <div className="flex flex-col items-stretch gap-5">
          <h3 className="font-semibold text-lg">Shared Studies</h3>
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

export default SharedStudiesPage;
