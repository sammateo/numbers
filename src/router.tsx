import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { supabase } from "./auth/supabase";
import type { Session, User } from "@supabase/supabase-js";
// import type { SupabaseClient } from "@supabase/supabase-js";

export interface RouterContext {
  // supabase: SupabaseClient;
  auth: {
    session: Session;
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
        isLoggedIn: false,
        session: null,
        user: null,
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
