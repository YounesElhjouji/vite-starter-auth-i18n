import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { registerUser, loginUser } from "../services/api"; // Import API functions
import { useNavigate } from "react-router-dom"; // Import for redirect

interface RegisterFormProps {
  onLoginSuccess: (username: string) => void; // Callback to update username state
}

export default function RegisterForm({ onLoginSuccess }: RegisterFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUsernameState] = useState(""); // Renamed state setter
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Keep success for feedback
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError(t("passwordsDoNotMatch"));
      return;
    }

    setIsLoading(true);

    try {
      // 1. Register the user
      await registerUser(username, password); // Use API service

      // 2. Log the user in automatically
      await loginUser(username, password); // Use API service

      setSuccess(t("registerSuccess")); // Show success message briefly
      onLoginSuccess(username); // Update global state
      navigate("/"); // Redirect to home page
    } catch (err: any) {
      setError(err.message || t("registerFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
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
      <Input
        type="password"
        placeholder={t("confirmPasswordPlaceholder")}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full"
        disabled={isLoading}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t("loadingMessage") : t("registerButton")}
      </Button>
    </form>
  );
}
