import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ua"],
    fallbackLng: "en",
    detection: {
      order: ["path", "cookie", "localStorage", "navigator", "htmlTag", "subdomain"],
      caches: ["cookie"]
    },
    backend: {
      loadPath: "/resources/locales/{{lng}}/translation.json"
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
