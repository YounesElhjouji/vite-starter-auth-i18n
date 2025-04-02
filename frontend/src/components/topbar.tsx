import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Topbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 shadow-md px-4 py-2 flex justify-between items-center">
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

      <div>
        <Button>Login</Button>
      </div>
    </nav>
  );
}
