import type { User } from "@supabase/supabase-js";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export interface RouterContext {
  auth: {
    user: User;
    isAuthenticated: boolean;
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
