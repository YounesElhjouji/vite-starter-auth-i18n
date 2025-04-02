import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500">
                About
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
