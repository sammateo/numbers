import { createServerClient } from "@supabase/ssr";
import { getCookies, setCookie } from "@tanstack/react-start/server";

export function getSupabaseServerClient() {
  return createServerClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(getCookies()).map(([name, value]) => ({
            name,
            value,
          }));
        },
        setAll(cookies: any[]) {
          cookies.forEach(({ name, value, options }) => {
            setCookie(name, value, options);
          });
        },
        // get(name) {
        //   return getCookie(name);
        // },
        // set(name, value, options) {
        //   setCookie(name, value, options);
        // },
        // remove(name, options) {
        //   setCookie(name, "", { ...options, maxAge: 0 });
        // },
      },
    },
  );
}
