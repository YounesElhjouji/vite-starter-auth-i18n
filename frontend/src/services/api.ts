// Get the base URL from the environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:1111"; // Fallback just in case

// Helper function to handle fetch responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Try to parse error JSON
    throw new Error(
      errorData.error || `HTTP error! status: ${response.status}`,
    );
  }
  // Handle cases where the response might be empty (e.g., logout)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return {}; // Return empty object for non-JSON or empty responses
};

// --- Authentication API Calls ---

export const fetchUserInfo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/userInfo`, {
      method: "GET",
      credentials: "include", // Send cookies
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("API Error (fetchUserInfo):", error);
    throw error; // Re-throw the error for components to handle
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    // Login might not return a body, but handleResponse checks content-type
    return await handleResponse(response);
  } catch (error) {
    console.error("API Error (loginUser):", error);
    throw error;
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("API Error (registerUser):", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    // Logout typically doesn't return a body
    return await handleResponse(response);
  } catch (error) {
    console.error("API Error (logoutUser):", error);
    throw error;
  }
};

// --- Add other API calls here as needed ---
