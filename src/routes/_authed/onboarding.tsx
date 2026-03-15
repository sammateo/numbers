import OnboardingPage from "#/components/onboarding/OnboardingPage";
import Loading from "#/components/utility/Loading";
import { getUserProfile } from "#/server/account/getUserProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/onboarding")({
  component: OnboardingPage,
  loader: async ({ context: { user } }) =>
    await getUserProfile({ data: { id: user?.id || "" } }),
  pendingComponent: Loading,
});
