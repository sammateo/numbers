import ProfilePage from "#/components/profile/ProfilePage";
import Loading from "#/components/utility/Loading";
import { getCompleteBibleStudies } from "#/server/bible_study/getBibleStudies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/profile")({
  component: ProfilePage,
  loader: async ({ context }) =>
    await getCompleteBibleStudies({
      data: {
        creator_id: context.user?.id || "",
      },
    }),
  pendingComponent: Loading,
});
