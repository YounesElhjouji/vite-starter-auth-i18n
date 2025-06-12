// src/index.ts
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { config } from "./config";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Adjust origin for your frontend
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Only start the server if this file is run directly (not imported by Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 1111;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app; // Start the server
