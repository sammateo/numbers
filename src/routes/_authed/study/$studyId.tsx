import BibleStudyPage from "#/components/study/BibleStudyPage";
import { getBibleStudy } from "#/server/bible_study/getBiblyStudy";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/study/$studyId")({
  component: BibleStudyPage,
  loader: async ({ params }) => {
    return await getBibleStudy({
      data: {
        study_id: params.studyId,
      },
    });
  },
  pendingComponent: () => <div>Loading Study...</div>,
});
