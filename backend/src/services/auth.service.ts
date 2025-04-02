import { PrismaClient } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config";
import { comparePassword, hashPassword } from "../utils/hash.utils";

const prisma = new PrismaClient();

export const signup = async (username: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    throw new Error("Username already exists");
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
    },
  });

  return user;
};

export const login = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  // Explicitly cast options to SignOptions
  const accessToken = jwt.sign({ userId: user.id }, config.accessTokenSecret, {
    expiresIn: config.accessTokenExpiry,
  } as SignOptions);

  const refreshToken = jwt.sign(
    { userId: user.id },
    config.refreshTokenSecret,
    { expiresIn: config.refreshTokenExpiry } as SignOptions,
  );

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.accessTokenSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.refreshTokenSecret);
};
