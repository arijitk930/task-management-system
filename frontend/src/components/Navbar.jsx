import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useEffect, useMemo, useState } from "react";

const linkClass = (active) =>
  [
    "px-3 py-2 rounded-md text-sm font-medium transition",
    active ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100",
  ].join(" ");

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const path = location.pathname;
  const isActive = useMemo(() => (href) => path === href, [path]);

  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => setUser(res?.data?.data ?? null))
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    try {
      setLoggingOut(true);
      await api.post("/users/logout");
    } catch {
      // ignore; we still clear local auth
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setLoggingOut(false);
      navigate("/login");
    }
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-gray-900">
          Task Manager
        </Link>

        <nav className="flex items-center gap-2">
          <Link to="/" className={linkClass(isActive("/"))}>
            Dashboard
          </Link>
          <Link to="/projects" className={linkClass(isActive("/projects"))}>
            Projects
          </Link>
          <Link to="/profile" className={linkClass(isActive("/profile"))}>
            Profile
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-gray-600">
            {user?.name ? (
              <span>
                Signed in as <span className="font-medium">{user.name}</span>
              </span>
            ) : null}
          </div>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="text-sm px-3 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;