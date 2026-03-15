import { login, logout } from "#/auth/supabase";
import { useNavigationBarStore } from "#/store/useNavigationBarStore";
import { useRouteContext, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { IoMenu } from "react-icons/io5";

export default function Header() {
  const triggerLogin = useServerFn(login);
  const triggerLogout = useServerFn(logout);
  const { isAuthenticated } = useRouteContext({ strict: false });
  const setSideBarOpen = useNavigationBarStore((s) => s.setOpen);

  const router = useRouter();
  return (
    <header className="z-50 border-b bg-sidebar px-4 flex flex-wrap justify-between items-center">
      <nav className="flex flex-wrap w-full items-center justify-between gap-x-3 gap-y-2 py-2 sm:py-2">
        <div>
          <button
            onClick={() => setSideBarOpen(true)}
            className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors -ml-2"
          >
            <IoMenu className="lg:hidden cursor-pointer text-xl" />
          </button>
        </div>

        {/* <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold "></div> */}
        <button
          className="inline-block justify-self-end rounded border cursor-pointer border-indigo-600 bg-indigo-600 px-5 py-2 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          onClick={async () => {
            if (isAuthenticated) await triggerLogout();
            else await triggerLogin();

            router.invalidate();
          }}
        >
          {isAuthenticated ? "Sign Out" : "Sign In"}
        </button>
      </nav>
    </header>
  );
}
