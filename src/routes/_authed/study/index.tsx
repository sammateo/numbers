import { useUserStore } from "#/store/useUserStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/study/")({
  component: RouteComponent,
});

function RouteComponent() {
  const username = useUserStore((s) => s.username);
  return (
    <div>
      <h1>Your Studies</h1>
      <p>Hi {username}</p>
    </div>
  );
}
