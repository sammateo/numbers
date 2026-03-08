import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/study/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/study/new"!</div>;
}
