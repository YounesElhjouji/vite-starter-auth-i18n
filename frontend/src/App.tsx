import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Topbar from "./components/topbar";
import RequireAuth from "./components/RequireAuth";
import RedirectIfAuth from "./components/RedirectIfAuth";
import { useState, useEffect } from "react";
import { fetchUserInfo } from "./services/api"; // Import the API function

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUserInfo(); // Use the API service function
        if (data && data.username) {
          setUsername(data.username);
        } else {
          setUsername(null);
        }
      } catch (error) {
        // Error likely means not authenticated or server issue
        console.error("Failed to fetch user info on load:", error);
        setUsername(null);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    checkAuthStatus();
  }, []);

  // Optional: Show a loading indicator while checking auth
  if (isLoading) {
    return <div>Loading application...</div>; // Or a spinner component
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Topbar username={username} setUsername={setUsername} />
        <main className="flex-grow pt-16 px-4">
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <HomePage username={username} /> // Removed setUsername prop
              }
            />

            {/* Protected route */}
            <Route
              path="/about"
              element={
                <RequireAuth username={username}>
                  <AboutPage />
                </RequireAuth>
              }
            />

            {/* Redirect if already authenticated */}
            <Route
              path="/login"
              element={
                <RedirectIfAuth username={username}>
                  <LoginPage setUsername={setUsername} />
                </RedirectIfAuth>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectIfAuth username={username}>
                  {/* Pass setUsername to RegisterPage if needed */}
                  <RegisterPage setUsername={setUsername} />
                </RedirectIfAuth>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
