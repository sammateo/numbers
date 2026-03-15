import type { User } from "@supabase/supabase-js";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { Profile } from "./types";

export interface RouterContext {
  auth: {
    user: User;
    isAuthenticated: boolean;
    profile: Profile;
  };
}

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: {
      // supabase,
      auth: {
        isAuthenticated: false,
        user: undefined!,
        profile: undefined!,
      },
    },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
