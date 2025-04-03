import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  onLoginSuccess?: (username: string) => void; // Callback to update username state
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch("http://localhost:1111/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (onLoginSuccess) {
          onLoginSuccess(username); // Update username state in parent
        }
      } else {
        setError(data.error || t("loginFailed"));
      }
    } catch (err) {
      setError(t("loginFailed"));
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
        onChange={(e) => setUsername(e.target.value)}
        className="w-full"
      />
      <Input
        type="password"
        placeholder={t("passwordPlaceholder")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full">
        {t("loginButton")}
      </Button>
    </form>
  );
}
