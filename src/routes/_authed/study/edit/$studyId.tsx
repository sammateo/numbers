import { CreateStudyPage } from "#/components/study/new/CreateStudyPage";
import Loading from "#/components/utility/Loading";
import { getCompleteBibleStudy } from "#/server/bible_study/getBibleStudy";
import { useCreateBibleStudyStore } from "#/store/useCreateBibleStudyStore";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authed/study/edit/$studyId")({
  component: RouteComponent,
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

function RouteComponent() {
  const data = Route.useLoaderData();
  const setTitle = useCreateBibleStudyStore((s) => s.setTitle);
  const setTopic = useCreateBibleStudyStore((s) => s.setTopic);
  const setDescription = useCreateBibleStudyStore((s) => s.setDescription);
  const setContent = useCreateBibleStudyStore((s) => s.setContent);
  const setVisibility = useCreateBibleStudyStore((s) => s.setVisibility);
  const setVerses = useCreateBibleStudyStore((s) => s.setVerses);
  const setCollaborators = useCreateBibleStudyStore((s) => s.setCollaborators);
  const setCreator = useCreateBibleStudyStore((s) => s.setCreator);

  useEffect(() => {
    if (!data) return;
    setTitle(data?.title || "");
    setTopic(data?.topic || "");
    setDescription(data?.description || "");
    setContent(data?.content || "");
    setVisibility(data?.visibility || "private");
    setVerses(data?.verses || []);
    setCollaborators(data?.collaborators || []);
    setCreator(data.creator);
  }, [data]);
  return <CreateStudyPage type="edit" study_id={data?.id} />;
}
