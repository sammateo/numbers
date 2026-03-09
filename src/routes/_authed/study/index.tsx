import BibleStudiesPage from "#/components/study/BibleStudiesPage";
import { getBibleStudies } from "#/server/bible_study/getBibleStudies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/study/")({
  component: BibleStudiesPage,
  loader: async ({ context }) =>
    await getBibleStudies({
      data: {
        creator_id: context.user?.id || "",
      },
    }),
});
