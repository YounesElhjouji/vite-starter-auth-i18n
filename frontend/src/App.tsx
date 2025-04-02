import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Topbar from "./components/topbar";

function App() {
  return (
    <BrowserRouter>
      {/* Main container with dark/light mode background */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Fixed Top Navigation Bar */}

        <Topbar />
        {/* Content Area - Add padding-top to avoid overlap with fixed nav */}
        <main className="pt-16 px-4">
          {" "}
          {/* Adjust pt-16 based on your nav height */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Add a route for login later */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
