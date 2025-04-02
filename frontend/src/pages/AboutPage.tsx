import { useTranslation } from "react-i18next"; // Import useTranslation

export default function AboutPage() {
  const { t } = useTranslation(); // Use the hook

  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <h1 className="text-2xl font-semibold mb-4">
        {t("aboutTitle")} {/* Use t function */}
      </h1>
      <p>{t("aboutContent")}</p> {/* Use t function */}
      <p>{t("aboutExtra")}</p> {/* Use t function */}
    </div>
  );
}
