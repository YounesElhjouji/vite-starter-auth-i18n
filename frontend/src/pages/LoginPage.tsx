import LoginForm from "../components/LoginForm";
import { useTranslation } from "react-i18next";

interface LoginPageProps {
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function LoginPage({ setUsername }: LoginPageProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <h1 className="text-3xl font-bold mb-4">{t("loginPageTitle")}</h1>
      <LoginForm onLoginSuccess={setUsername} />
    </div>
  );
}
