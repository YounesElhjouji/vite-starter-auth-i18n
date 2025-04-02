// src/routes/auth.routes.ts
import express from "express";
import {
  signupController,
  loginController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

// Default route (no auth required)
router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

// Signup route
router.post("/signup", signupController);

// Login route
router.post("/login", loginController);

// User info route (requires auth)
router.get("/userInfo", authMiddleware, (req, res) => {
  const user = (req as any).user; // Extract user info from the request object
  if (user) {
    res.status(200).json({ username: user.username });
  } else {
    res.status(200).json({ message: "No user logged in" });
  }
});

// Example protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: (req as any).user });
});

export default router;
