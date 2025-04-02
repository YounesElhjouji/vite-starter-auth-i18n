import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 1111,
  databaseUrl: process.env.DATABASE_URL || "",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "default_access_secret",
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
  accessTokenExpiry: "15m", // Access token expires in 15 minutes
  refreshTokenExpiry: "7d", // Refresh token expires in 7 days
};
