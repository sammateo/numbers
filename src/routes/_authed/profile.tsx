import ProfilePage from "#/components/profile/ProfilePage";
import { getBibleStudies } from "#/server/bible_study/getBibleStudies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/profile")({
  component: ProfilePage,
  loader: async ({ context }) =>
    await getBibleStudies({
      data: {
        creator_id: context.user?.id || "",
      },
    }),
});
