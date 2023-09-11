import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="border-b border-stone-400/40 backdrop-blur-2xl">
      <div className="navbar container mx-auto h-20 flex items-center justify-between">
        <Link
          to="/"
          className="logo text-2xl text-blue-900 font-semibold tracking-wide"
        >
          Proxima
        </Link>
        <nav className="flex gap-5">
          {!user && (
            <div className="flex gap-5">
              <Link to="login" className="hover:text-sky-400 duration-300">
                Login
              </Link>
              <Link to="signup" className="hover:text-sky-400 duration-300">
                Signup
              </Link>
            </div>
          )}
          {user && (
            <div className="flex gap-5 items-center">
              <span>{user.email}</span>
              <button
                onClick={handleLogout}
                type="submit"
                className="bg-red-600 text-rose-50 py-3 px-5 rounded-lg hover:bg-red-600/90 duration-300 tracking-wide"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
