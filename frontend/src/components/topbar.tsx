import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { logoutUser } from "../services/api"; // Import the API function

interface TopbarProps {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Topbar({ username, setUsername }: TopbarProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  // ... (useState and useEffect for theme remain the same)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
  const topbarHeightClass = "h-12";
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logoutUser(); // Use the API service function
      setUsername(null); // Clear username state
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Failed to logout:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 shadow-md px-4 flex justify-between items-center",
        topbarHeightClass,
      )}
    >
      {/* Left side navigation links */}
      <div className="flex space-x-1 items-center">
        <Button
          variant={isActive("/") ? "secondary" : "ghost"}
          size="sm"
          asChild
        >
          <Link to="/">{t("home")}</Link>
        </Button>
        <Button
          variant={isActive("/about") ? "secondary" : "ghost"}
          size="sm"
          asChild
        >
          <Link to="/about">{t("about")}</Link>
        </Button>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-1">
        {username ? (
          <>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              {t("logout")}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">{t("login")}</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/register">{t("register")}</Link>
            </Button>
          </>
        )}

        {/* Dark Mode Toggle Button */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">{t("toggleTheme")}</span>
        </Button>

        {/* Language Switcher Buttons */}
        {/* ... (language buttons remain the same) ... */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => changeLanguage("en")}
          disabled={i18n.resolvedLanguage === "en"}
          aria-label="Switch to English"
          className={cn(
            "text-xs",
            i18n.resolvedLanguage !== "en" && "opacity-70",
          )}
        >
          EN
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => changeLanguage("fr")}
          disabled={i18n.resolvedLanguage === "fr"}
          aria-label="Switch to French"
          className={cn(
            "text-xs",
            i18n.resolvedLanguage !== "fr" && "opacity-70",
          )}
        >
          FR
        </Button>
      </div>
    </nav>
  );
}
