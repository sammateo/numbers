import { getRouteApi, redirect, useRouteContext } from "@tanstack/react-router";
import { CiCalendar } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import NewCard from "../study/NewCard";

const ProfilePage = () => {
  const { profile } = useRouteContext({ from: "__root__" });
  const routeApi = getRouteApi("/_authed/profile");
  const bibleStudies = routeApi.useLoaderData();
  if (!profile) {
    throw redirect({ to: "/onboarding" });
  }
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-2xl md:text-3xl shrink-0">
            {profile.username?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0 space-y-3 md:space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl mb-1">
                {profile.first_name} {profile.last_name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                @{profile.username}
              </p>
            </div>
            {/* {profile.bio && (
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {profile.bio}
              </p>
            )} */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CiCalendar className="w-4 h-4" />
                <span>
                  Joined {new Date(profile.created_at).toDateString()}
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <IoBookOutline className="w-4 h-4" />
                <span>{bibleStudies.length} studies</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl">Recently Created Studies</h2>
        <div className="grid gap-4 md:gap-5">
          {bibleStudies &&
            bibleStudies
              .slice(0, 3)
              .map((study) => <NewCard key={study.id} {...study} />)}
        </div>
      </section>
      {/* <section className="space-y-4">
        <h2 className="text-xl md:text-2xl">Collaborative Studies</h2>
        <div className="grid gap-4 md:gap-5">
          {sharedStudies.map((study) => (
            <NewCard key={study.id} {...study} />
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default ProfilePage;
