import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useLoaderData,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Header from "../components/Header";

import { getUserSessionFn } from "#/auth/supabase";
import type { RouterContext } from "#/router";
import { getUserProfile } from "#/server/account/getUserProfile";
import { useUserStore } from "#/store/useUserStore";
import { useEffect } from "react";
import appCss from "../styles.css?url";
import SideBar from "#/components/navigation/SideBar";

// const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRouteWithContext<RouterContext>()({
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
  loader: async ({ context }) => {
    if (context.isAuthenticated) {
      const profile = await getUserProfile({
        data: { id: context.user?.id || "" },
      });
      return { profile };
    }
  },
  beforeLoad: async () => {
    try {
      const { user, isAuthenticated } = await getUserSessionFn();
      return { user, isAuthenticated };
    } catch (error) {
      return { user: null, isAuthenticated: false };
    }
  },
  pendingComponent: () => (
    <div className="bg-red-300 w-screen h-screen">loading...</div>
  ),
  notFoundComponent: () => <div>404 Not Found</div>,
  pendingMs: 0,
  pendingMinMs: 200,
  wrapInSuspense: true,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const data = useLoaderData({ from: "__root__" });
  const profile = data?.profile;
  const setUserName = useUserStore((s) => s.setUsername);
  const setFirstName = useUserStore((s) => s.setFirstName);
  const setLastName = useUserStore((s) => s.setLastName);
  useEffect(() => {
    setUserName(profile?.username || "");
    setFirstName(profile?.first_name || "");
    setLastName(profile?.last_name || "");
  }, [profile]);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} /> */}
        <HeadContent />
      </head>
      <body className="font-sans antialiased w-screen wrap-anywhere selection:bg-[rgba(79,184,178,0.24)] flex bg-background">
        {/* <SupabaseAuthProvider> */}
        <SideBar />
        <div className="flex-1">
          <Header />
          <div className="px-4 py-2 h-[94vh] overflow-scroll">{children}</div>
        </div>
        {/* <Footer /> */}
        {/* </SupabaseAuthProvider> */}
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
