import { CreateStudyPage } from "#/components/study/new/CreateStudyPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/study/new")({
  component: CreateStudyPage,
  pendingComponent: () => <div>Loading...</div>,
});
