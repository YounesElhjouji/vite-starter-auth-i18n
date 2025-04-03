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

function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:1111/api/auth/userInfo",
          {
            credentials: "include",
          },
        );
        const data = await response.json();
        if (data.username) {
          setUsername(data.username);
        } else {
          setUsername(null);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setUsername(null);
      }
    };

    fetchUserInfo();
  }, []);

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
                <HomePage username={username} setUsername={setUsername} />
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
                  <RegisterPage />
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
