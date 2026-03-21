import {
  getRouteApi,
  Link,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import BibleStudyContentEditor from "./new/BibleStudyContentEditor";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import Button from "#/ui/button/Button";
import { deleteBibleStudy } from "#/server/bible_study/deleteBibleStudy";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useCreateBibleStudyStore } from "#/store/useCreateBibleStudyStore";
const BibleStudyPage = () => {
  const routeApi = getRouteApi("/_authed/study/$studyId");
  const bibleStudy = routeApi.useLoaderData();
  const [deleting, setDeleting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useRouteContext({ from: "__root__" });

  const setTitle = useCreateBibleStudyStore((s) => s.setTitle);
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
      {bibleStudy?.creator_id === user?.id && (
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            className="w-full sm:w-auto flex gap-2 items-center"
            onClick={async () => {
              setTitle(bibleStudy?.title || "");
              navigate({
                to: "/study/edit/$studyId",
                params: {
                  studyId: bibleStudy?.id || "",
                },
              });
            }}
          >
            {/* {deleting && <LoaderCircle className="animate-spin size-5" />} */}
            <span>Edit Study</span>
          </Button>
          <Button
            disabled={deleting}
            variant="destructive"
            className="w-full sm:w-auto flex gap-2 items-center"
            onClick={async () => {
              try {
                if (!confirm("Are you sure you want to delete this study?")) {
                  return;
                }
                setDeleting(true);
                await deleteBibleStudy({
                  data: {
                    study_id: bibleStudy?.id || "",
                  },
                });
                setDeleting(false);
                navigate({ to: "/study" });
              } catch (error) {
                console.error(error);
                setDeleting(false);
              }
            }}
          >
            {deleting && <LoaderCircle className="animate-spin size-5" />}
            <span>Delete Study</span>
          </Button>
        </div>
      )}
      {/* <Link
          to="/study"
          className="inline-flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors mb-4 md:mb-6"
        >
          <FaArrowLeftLong />
          Back to studies
        </Link> */}
    </div>
  );
};

export default BibleStudyPage;
