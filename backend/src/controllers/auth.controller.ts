import { Request, Response } from "express";
import { signup, login } from "../services/auth.service";

export const signupController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await signup(username, password);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const { accessToken, refreshToken } = await login(username, password);

    // Set tokens in HttpOnly cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
