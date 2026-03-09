import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/study/$studyId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { studyId } = Route.useParams();
  return <div>Study: {studyId}</div>;
}
