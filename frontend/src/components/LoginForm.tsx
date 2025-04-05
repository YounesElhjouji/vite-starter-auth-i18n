import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { loginUser } from "../services/api"; // Import the API function
import { useNavigate } from "react-router-dom"; // Import for redirect

interface LoginFormProps {
  onLoginSuccess: (username: string) => void; // Callback to update username state
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUsernameState] = useState(""); // Renamed state setter
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await loginUser(username, password); // Use the API service function
      onLoginSuccess(username); // Update username state in parent
      navigate("/"); // Redirect to home page on successful login
    } catch (err: any) {
      setError(err.message || t("loginFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center space-y-4 w-full max-w-sm"
    >
      <Input
        type="text"
        placeholder={t("usernamePlaceholder")}
        value={username}
        onChange={(e) => setUsernameState(e.target.value)} // Use renamed setter
        className="w-full"
        disabled={isLoading}
      />
      <Input
        type="password"
        placeholder={t("passwordPlaceholder")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full"
        disabled={isLoading}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t("loadingMessage") : t("loginButton")}
      </Button>
    </form>
  );
}
