import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar container mx-auto h-20 flex items-center justify-between border-b border-blue-200">
      <Link
        to="/"
        className="logo text-2xl text-blue-900 font-semibold tracking-wide"
      >
        Proxima
      </Link>
    </div>
  );
};

export default Navbar;
