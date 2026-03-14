import NewBibleStudyPage from "#/components/study/new/NewBibleStudyPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/study/new")({
  component: NewBibleStudyPage,
  pendingComponent: () => <div>Loading...</div>,
});
