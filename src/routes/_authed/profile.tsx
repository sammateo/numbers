import ProfilePage from "#/components/profile/ProfilePage";
import Loading from "#/components/utility/Loading";
import {
  getCompleteBibleStudies,
  getCompleteSharedBibleStudies,
} from "#/server/bible_study/getBibleStudies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/profile")({
  component: ProfilePage,
  loader: async ({ context }) => {
    const myStudies = await getCompleteBibleStudies({
      data: {
        creator_id: context.user?.id || "",
      },
    });
    const sharedStudies = await getCompleteSharedBibleStudies({
      data: {
        creator_id: context.user?.id || "",
      },
    });
    return { myStudies, sharedStudies };
  },
  pendingComponent: Loading,
});
