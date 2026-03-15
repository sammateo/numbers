import { useNavigationBarStore } from "#/store/useNavigationBarStore";
import { Link, useRouteContext } from "@tanstack/react-router";
import { AiOutlineClose } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { FiPlusCircle, FiBookOpen } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { RiUserShared2Line } from "react-icons/ri";
const SideBar = () => {
  const open = useNavigationBarStore((s) => s.open);
  const setOpen = useNavigationBarStore((s) => s.setOpen);
  const onClose = () => setOpen(false);
  const { isAuthenticated } = useRouteContext({ from: "__root__" });

  const navLinks = [
    {
      icon: FaHome,
      label: "Home",
      path: "/",
      auth: false,
    },
    {
      icon: FiPlusCircle,
      label: "Create Study",
      path: "/study/new",
      auth: true,
    },
    {
      icon: FiBookOpen,
      label: "My Studies",
      path: "/study",
      auth: true,
    },
    {
      icon: RiUserShared2Line,
      label: "Shared with Me",
      path: "/study",
      auth: true,
    },
    {
      icon: BsPerson,
      label: "Profile",
      path: "/study",
      auth: true,
    },
  ];
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`flex h-screen w-64 flex-col justify-between border-e border-gray-100 bg-sidebar z-50 fixed lg:static ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="px-4 py-6">
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/"
              onClick={onClose}
              className="grid h-10 w-40 place-content-center rounded-lg bg-gray-100 text-lg font-medium text-gray-600"
            >
              # Numbers
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors -ml-2"
            >
              <AiOutlineClose className="lg:hidden cursor-pointer text-xl" />
            </button>
          </div>

          <ul className="mt-6 space-y-1">
            {navLinks.map((link) => {
              if (!isAuthenticated && link.auth) return;
              if (isAuthenticated && link.path === "/") return;
              return (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    onClick={onClose}
                    activeOptions={{ exact: true }}
                    activeProps={{ className: "bg-sidebar-accent" }}
                    className="flex items-center justify-start gap-2 rounded-lg px-2 py-2 text-md font-medium text-gray-500 hover:bg-sidebar-accent hover:text-gray-700"
                  >
                    <link.icon className="w-5" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&amp;fit=crop&amp;q=80&amp;w=1160"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">John Doe</strong>

                <span> @johndoe </span>
              </p>
            </div>
          </a>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
