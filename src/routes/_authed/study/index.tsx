import BibleStudiesPage from "#/components/study/BibleStudiesPage";
import Loading from "#/components/utility/Loading";
import { getCompleteBibleStudies } from "#/server/bible_study/getBibleStudies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/study/")({
  component: BibleStudiesPage,
  loader: async ({ context }) =>
    await getCompleteBibleStudies({
      data: {
        creator_id: context.user?.id || "",
      },
    }),
  pendingComponent: Loading,
});
