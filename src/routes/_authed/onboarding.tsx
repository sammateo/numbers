import OnboardingPage from "#/components/onboarding/OnboardingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/onboarding")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OnboardingPage />;
}
