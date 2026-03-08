import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Header from "../components/Header";

import { getUserSessionFn, SupabaseAuthProvider } from "#/auth/supabase";
import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  beforeLoad: async () => {
    try {
      const { session, user, isAuthenticated } = await getUserSessionFn();
      // console.log(user);
      return { session, user, isAuthenticated };
    } catch (error) {
      // console.error("hi", error);
      return { session: null, user: null, isAuthenticated: false };
    }
    // const supabase = context.supabase;
    // const {
    //   data: { session },
    //   error,
    // } = await supabase.auth.getSession();
    // if (error) {
    //   console.error(error);
    // }
    // console.log(session);
    // if (!session?.user) return { user: null };
    // const { data: profile } = await supabase
    //   .schema("numbers")
    //   .from("profiles")
    //   .select("*")
    //   .eq("id", session.user.id)
    //   .single();
    // console.log(profile);
    // return { user: session.user.id, profile };
  },
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
        <SupabaseAuthProvider>
          <Header />
          {children}
          {/* <Footer /> */}
        </SupabaseAuthProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
