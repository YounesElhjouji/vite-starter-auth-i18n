import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  // Load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(HttpApi)
  // Detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true, // Set to false in production
    fallbackLng: "en", // Default language
    supportedLngs: ["en", "fr"], // Supported languages
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    // Configure language detector
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie", "localStorage"], // Where to cache detected language
    },
    // Configure backend
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
    },
  });

export default i18n;
