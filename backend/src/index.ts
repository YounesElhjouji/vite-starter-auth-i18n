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

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
