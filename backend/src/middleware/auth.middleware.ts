import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/auth.service";
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const payload = verifyAccessToken(token);

    // Type narrowing: Check if payload is a JwtPayload
    if (typeof payload === "string" || !("userId" in payload)) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Fetch the user from the database using the userId from the payload
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Attach user info to the request object
    (req as any).user = { id: user.id, username: user.username };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
};
