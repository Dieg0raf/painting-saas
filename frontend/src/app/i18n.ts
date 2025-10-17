import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '@/public/locales/en/translation.json';
import translationES from '@/public/locales/es/translation.json';

const resources = {
    en: {
        translation: translationEN,
    },
    es: {
        translation: translationES,
    },
};

i18n

    .use(initReactI18next)
    .init({
        lng: 'en',
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;