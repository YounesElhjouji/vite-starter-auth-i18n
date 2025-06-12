import axios from "axios";

// --- Types ---
export interface User {
  id: string;
  username: string;
  // Add more fields as needed
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
  // Add more fields as needed
}

export interface ErrorResponse {
  error: string;
}

// --- Base URL Logic ---
const isLocalhost = () =>
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (isLocalhost() ? "http://localhost:1111" : "");

// --- Axios Instance ---
export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Helper: Typed Error Handling ---
function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ErrorResponse | undefined;
    return data?.error || error.message;
  }
  return error instanceof Error ? error.message : String(error);
}

// --- API Calls ---

export async function fetchUserInfo(): Promise<User> {
  try {
    const { data } = await api.get<User>("/auth/userInfo");
    return data;
  } catch (error) {
    console.error("API Error (fetchUserInfo):", error);
    throw getErrorMessage(error);
  }
}

export async function loginUser(
  username: string,
  password: string,
): Promise<AuthResponse> {
  try {
    const { data } = await api.post<AuthResponse>("/auth/login", {
      username,
      password,
    });
    return data;
  } catch (error) {
    console.error("API Error (loginUser):", error);
    throw getErrorMessage(error);
  }
}

export async function registerUser(
  username: string,
  password: string,
): Promise<AuthResponse> {
  try {
    const { data } = await api.post<AuthResponse>("/auth/signup", {
      username,
      password,
    });
    return data;
  } catch (error) {
    console.error("API Error (registerUser):", error);
    throw getErrorMessage(error);
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("API Error (logoutUser):", error);
    throw getErrorMessage(error);
  }
}
