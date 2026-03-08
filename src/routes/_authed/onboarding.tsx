import OnboardingPage from "#/components/onboarding/OnboardingPage";
import { getUserProfile } from "#/server/account/getUserProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/onboarding")({
  component: RouteComponent,
  loader: async ({ context: { user } }) =>
    await getUserProfile({ data: { id: user?.id || "" } }),
});

function RouteComponent() {
  return <OnboardingPage />;
}
