import BibleStudyPage from "#/components/study/BibleStudyPage";
import Loading from "#/components/utility/Loading";
import { getCompleteBibleStudy } from "#/server/bible_study/getBibleStudy";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/study/$studyId")({
  component: BibleStudyPage,
  loader: async ({ params }) => {
    try {
      return await getCompleteBibleStudy({
        data: {
          study_id: params.studyId,
        },
      });
    } catch (error) {
      console.error(error);
      throw redirect({ to: "/" });
    }
  },
  pendingComponent: Loading,
});
