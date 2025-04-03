import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

interface HomePageProps {
  username: string | null;
}

function HomePage({ username }: HomePageProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <h1 className="text-3xl font-bold mb-4">{t("homePageTitle")}</h1>
      {username ? (
        <>
          <p className="text-lg mb-4">
            {t("welcomeBackMessage", { username })}
          </p>
          <p className="text-md">{t("loggedInHomeMessage")}</p>
        </>
      ) : (
        <>
          <p className="text-lg mb-4">{t("notLoggedInMessage")}</p>
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">{t("loginButton")}</Link>
          </Button>
        </>
      )}
    </div>
  );
}

export default HomePage;
