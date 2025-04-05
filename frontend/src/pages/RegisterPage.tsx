import RegisterForm from "../components/RegisterForm";
import { useTranslation } from "react-i18next";

interface RegisterPageProps {
  setUsername: React.Dispatch<React.SetStateAction<string | null>>; // Add prop type
}

export default function RegisterPage({ setUsername }: RegisterPageProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <h1 className="text-3xl font-bold mb-4">{t("registerPageTitle")}</h1>
      <RegisterForm onLoginSuccess={setUsername} />
    </div>
  );
}
