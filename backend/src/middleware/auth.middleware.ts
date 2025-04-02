import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/auth.service";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return; // Explicitly return void after sending a response
  }

  try {
    const payload = verifyAccessToken(token);
    (req as any).user = payload; // Attach user info to the request object
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
    return; // Explicitly return void after sending a response
  }
};
