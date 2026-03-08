import { getUserSessionFn } from "#/auth/supabase";
import { createFileRoute, isRedirect, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async () => {
    try {
      const { isAuthenticated } = await getUserSessionFn();
      if (!isAuthenticated) {
        throw redirect({ to: "/" });
      }
    } catch (error) {
      if (isRedirect(error)) throw error;
      throw redirect({ to: "/" });
    }
  },
});
