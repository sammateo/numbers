import { login, logout } from "#/auth/supabase";
import { Link, useRouteContext, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

export default function Header() {
  const triggerLogin = useServerFn(login);
  const triggerLogout = useServerFn(logout);
  const { isAuthenticated } = useRouteContext({ strict: false });

  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-lg flex flex-wrap justify-between items-center">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-(--chip-line) bg-(--chip-bg) px-3 py-1.5 text-sm text-(--sea-ink) no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
          >
            #
            {/* <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#56c6be,#7ed3bf)]" /> */}
            Numbers
          </Link>
        </h2>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-2 sm:w-auto sm:flex-nowrap sm:pb-0">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
          >
            Home
          </Link>
          <Link
            to="/study"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
          >
            Bible Studies
          </Link>
          <Link
            to="/about"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
          >
            About
          </Link>
          <a
            href="https://tanstack.com/start/latest/docs/framework/react/overview"
            className="nav-link"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </div>
      </nav>
      <button
        className="inline-block rounded border cursor-pointer border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
        onClick={async () => {
          if (isAuthenticated) await triggerLogout();
          else await triggerLogin();

          router.invalidate();
        }}
      >
        {isAuthenticated ? "Sign Out" : "Sign In"}
      </button>
    </header>
  );
}
