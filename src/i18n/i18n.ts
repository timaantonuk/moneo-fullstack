import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Import translations
import enTranslation from "./locales/en.json"
import ruTranslation from "./locales/ru.json"
import deTranslation from "./locales/de.json"

i18n
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next
    .use(initReactI18next)
    // init i18next
    .init({
        resources: {
            en: {
                translation: enTranslation,
            },
            ru: {
                translation: ruTranslation,
            },
            de: {
                translation: deTranslation,
            },
        },
        fallbackLng: "en",
        debug: process.env.NODE_ENV === "development",

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        // React already safes from XSS
        react: {
            useSuspense: true,
        },
    })

export default i18n

