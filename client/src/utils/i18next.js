import translationEN from "../locales/en-US/translation.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const ns = ["translation"];
const supportedLngs = ["en-US", "en"];

const resources = {
  "en-US": {
    translation: translationEN,
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en-US",
    fallbackLng: "en-US",
    react: { useSuspense: false },
    defaultNS: "translation",
    supportedLngs,
    ns,
  });

export default i18n;
