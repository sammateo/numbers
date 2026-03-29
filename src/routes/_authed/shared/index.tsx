import SharedStudiesPage from "#/components/shared/SharedStudiesPage";
import Loading from "#/components/utility/Loading";
import { getCompleteSharedBibleStudies } from "#/server/bible_study/getBibleStudies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/shared/")({
  component: SharedStudiesPage,
  loader: async ({ context }) =>
    await getCompleteSharedBibleStudies({
      data: {
        creator_id: context.user?.id || "",
      },
    }),
  pendingComponent: Loading,
});
