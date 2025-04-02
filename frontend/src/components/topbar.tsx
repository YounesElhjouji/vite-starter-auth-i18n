import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react"; // Import icons
import { Button } from "./ui/button";

export default function Topbar() {
  // State to track the current theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference, default to light
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Effect to apply the theme class to <html> and save preference
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]); // Re-run effect when isDarkMode changes

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const topbarHeightClass = "h-12"; // Adjust as needed

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 shadow-md px-4 flex justify-between items-center ${topbarHeightClass}`}
    >
      {/* Left side links */}
      <ul className="flex space-x-4 items-center">
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

      {/* Right side controls */}
      <div className="flex items-center space-x-2">
        {/* Dark Mode Toggle Button */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" /> // Sun icon for dark mode
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" /> // Moon icon for light mode
          )}
          <span className="sr-only">Toggle theme</span> {/* Accessibility */}
        </Button>

        {/* Login Button */}
        <Button variant="outline" size="sm">
          Login
        </Button>
      </div>
    </nav>
  );
}
