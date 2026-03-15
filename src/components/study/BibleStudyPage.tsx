import { getRouteApi, Link } from "@tanstack/react-router";
import BibleStudyContentEditor from "./new/BibleStudyContentEditor";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
const BibleStudyPage = () => {
  const routeApi = getRouteApi("/_authed/study/$studyId");
  const bibleStudy = routeApi.useLoaderData();
  return (
    <div className="lg:max-w-5xl pt-4 mx-auto flex flex-col items-stretch gap-5">
      <Link
        to="/study"
        className="inline-flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors mb-4 md:mb-6"
      >
        <FaArrowLeftLong />
        Back to studies
      </Link>
      <header className="space-y-2">
        {bibleStudy?.topic && (
          <div className="inline-block px-3 py-1 bg-accent/90 text-accent-foreground rounded text-xs md:text-sm">
            {bibleStudy?.topic}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl leading-tight">
          {bibleStudy?.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base text-muted-foreground">
          <Link
            to="/study"
            // to={`/profile/${bibleStudy?.creator.username}`}
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs md:text-sm">
              {bibleStudy?.creator.username.charAt(0)}
            </div>
            <span className="truncate">@{bibleStudy?.creator.username}</span>
          </Link>

          {bibleStudy?.collaborators &&
            bibleStudy?.collaborators.length > 0 && (
              <>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <LuUsers className="w-4 h-4" />
                  <span className="text-sm md:text-base">
                    {bibleStudy?.collaborators.length} collaborators
                  </span>
                </div>
              </>
            )}

          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <CiCalendar className="w-4 h-4" />
            <span className="text-sm md:text-base">
              {bibleStudy?.updated_at &&
                new Date(bibleStudy?.updated_at).toDateString()}
            </span>
          </div>
        </div>

        {bibleStudy?.collaborators && bibleStudy?.collaborators.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs md:text-sm text-muted-foreground">
              Collaborators:
            </span>
            {bibleStudy?.collaborators.map((collab) => (
              <Link
                key={collab.id}
                to="/study"
                // to={`/profile/${collab.user.username}`}
                className="flex items-center gap-1.5 px-2 py-1 bg-secondary rounded-full hover:bg-muted transition-colors"
              >
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs">
                  {collab.user.username.charAt(0)}
                </div>
                <span className="text-xs md:text-sm">
                  @{collab.user.username}
                </span>
              </Link>
            ))}
          </div>
        )}
      </header>
      <BibleStudyContentEditor
        disabled={true}
        content={bibleStudy?.content || null}
      />
      <div className="flex gap-2 justify-center">
        <Link
          to="/study"
          className="inline-flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors mb-4 md:mb-6"
        >
          <FaArrowLeftLong />
          Back to studies
        </Link>
      </div>
    </div>
  );
};

export default BibleStudyPage;
