import BibleStudyPage from "#/components/study/BibleStudyPage";
import {
  getBibleStudy,
  getCompleteBibleStudy,
} from "#/server/bible_study/getBibleStudy";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/study/$studyId")({
  component: BibleStudyPage,
  loader: async ({ params }) => {
    // const study = await getCompleteBibleStudy({
    //   data: {
    //     study_id: params.studyId,
    //   },
    // });
    // console.log(study);
    return await getCompleteBibleStudy({
      data: {
        study_id: params.studyId,
      },
    });
  },
  pendingComponent: () => <div>Loading Study...</div>,
});
