import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface RegisterFormProps {
  onLoginSuccess?: (username: string) => void; // Callback to update username state
}

export default function RegisterForm({ onLoginSuccess }: RegisterFormProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(t("passwordsDoNotMatch"));
      return;
    }

    try {
      // Register the user
      const registerResponse = await fetch(
        "http://localhost:1111/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );

      const registerData = await registerResponse.json();

      if (registerResponse.ok) {
        // Log the user in automatically after successful registration
        const loginResponse = await fetch(
          "http://localhost:1111/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies
            body: JSON.stringify({ username, password }),
          },
        );

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          setSuccess(t("registerSuccess"));
          if (onLoginSuccess) {
            onLoginSuccess(username); // Update username state in parent
          }
        } else {
          setError(loginData.error || t("loginFailed"));
        }
      } else {
        setError(registerData.error || t("registerFailed"));
      }
    } catch (err) {
      setError(t("registerFailed"));
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
      <Input
        type="password"
        placeholder={t("confirmPasswordPlaceholder")}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      <Button type="submit" className="w-full">
        {t("registerButton")}
      </Button>
    </form>
  );
}
