import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import Cache from "i18next-localstorage-cache";
import { initReactI18next } from "react-i18next";

i18next
  .use(Cache)
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init(
    {
      debug: process.env.NODE_ENV === "development" ? true : false,
      fallbackLng: "en",
      supportedLngs: ["en", "ar"],
      loadPath: "/locales/{{lng}}/translation.json",
      detection: {
        order: ["localStorage", "cookie"],
        cache: ["localStorage", "cookie"],
      },
      react: { useSuspense: false },
      interpolation: { escapeValue: false },
    },
    (err, t) => {}
  );

export default i18next;
