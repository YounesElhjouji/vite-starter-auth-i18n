import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 shadow-md px-4 py-2 flex justify-between items-center">
      {/* Left side links */}
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="hover:text-blue-500 dark:hover:text-blue-400"
          >
            About
          </Link>
        </li>
      </ul>

      {/* Right side login button */}
      <div>
        {/* You can replace this with a Link or button logic later */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm">
          Login
        </button>
      </div>
    </nav>
  );
}
