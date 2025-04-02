import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export default function Topbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // ... (theme state logic remains the same)
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // ... (theme effect logic remains the same)
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

      {/* Right side controls - REORDERED */}
      <div className="flex items-center space-x-1">
        {/* Login Button - Moved earlier */}
        <Button variant="outline" size="sm">
          {t("login")}
        </Button>

        {/* Dark Mode Toggle Button */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">{t("toggleTheme")}</span>
        </Button>

        {/* Language Switcher Buttons - Moved to the end */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => changeLanguage("en")}
          disabled={i18n.resolvedLanguage === "en"}
          aria-label="Switch to English"
          className={cn(
            "text-xs", // Make text slightly smaller if needed
            i18n.resolvedLanguage !== "en" && "opacity-70", // Dim inactive
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
            "text-xs", // Make text slightly smaller if needed
            i18n.resolvedLanguage !== "fr" && "opacity-70", // Dim inactive
          )}
        >
          FR
        </Button>
      </div>
    </nav>
  );
}
