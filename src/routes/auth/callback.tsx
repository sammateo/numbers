import { getSupabaseServerClient } from "#/lib/supabase";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const supabase = getSupabaseServerClient();
        if (code) {
          try {
            await supabase.auth.exchangeCodeForSession(code);
          } catch (error) {
            console.error(error);
          }
        }
        redirect({ to: "/" });
        return redirect({ to: "/" });
      },
    },
  },
});

// function RouteComponent() {
//   return <div>Hello "/auth/callback"!</div>
// }
