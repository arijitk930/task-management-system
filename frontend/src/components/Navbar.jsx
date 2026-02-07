import { Link, useLocation } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { useLogout } from "../hooks/useLogout";

const linkBase =
  "px-3 py-2 rounded-lg text-sm font-medium transition-colors";
const linkInactive = "text-slate-600 hover:text-slate-900 hover:bg-slate-100";
const linkActive = "bg-violet-100 text-violet-700";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const isActive = (href) => path === href;

  const { data: user } = useMe();
  const { logout, isPending } = useLogout();

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="font-semibold text-slate-900 hover:text-violet-600 transition-colors"
        >
          Task Manager
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`${linkBase} ${isActive("/") ? linkActive : linkInactive}`}
          >
            Dashboard
          </Link>
          <Link
            to="/tasks"
            className={`${linkBase} ${isActive("/tasks") ? linkActive : linkInactive}`}
          >
            Tasks
          </Link>
          <Link
            to="/profile"
            className={`${linkBase} ${isActive("/profile") ? linkActive : linkInactive}`}
          >
            Profile
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-slate-500">
            {user?.name ? (
              <span>
                <span className="font-medium text-slate-700">{user.name}</span>
              </span>
            ) : null}
          </div>
          <button
            onClick={logout}
            disabled={isPending}
            className="text-sm px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-60 transition-colors"
          >
            {isPending ? "Logging out…" : "Logout"}
          </button>
        </div>
      </div>
    </header>
  );
}
