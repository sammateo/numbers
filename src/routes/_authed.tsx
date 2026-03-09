import { getUserSessionFn } from "#/auth/supabase";
import { getUserProfile } from "#/server/account/getUserProfile";
import { createFileRoute, isRedirect, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/_authed")({
  // pendingComponent: () => <div>loading...</div>,
  beforeLoad: async ({ location }) => {
    try {
      const { isAuthenticated, user } = await getUserSessionFn();
      if (!isAuthenticated) {
        throw redirect({ to: "/" });
      }
      if (isAuthenticated && location.pathname !== "/onboarding") {
        const profile = await getUserProfile({
          data: {
            id: user.id,
          },
        });

        //redirect users with no username to the onboarding flow
        if (!profile?.username) throw redirect({ to: "/onboarding" });
      }
    } catch (error) {
      if (isRedirect(error)) throw error;
      throw redirect({ to: "/" });
    }
  },
});
