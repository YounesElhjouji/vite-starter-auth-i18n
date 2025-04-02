import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Wrap App with Suspense for loading translations */}
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </StrictMode>,
);
