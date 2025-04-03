import { useTranslation } from "react-i18next";

interface HomePageProps {
  username: string | null;
}

function HomePage({ username }: HomePageProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <h1 className="text-3xl font-bold mb-4">{t("homePageTitle")}</h1>
      {username ? (
        <p className="text-lg">{t("loggedInAs", { username })}</p>
      ) : (
        <p className="text-lg mb-4">{t("notLoggedInMessage")}</p>
      )}
    </div>
  );
}

export default HomePage;
