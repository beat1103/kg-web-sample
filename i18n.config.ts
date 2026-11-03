import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// 브라우저에서만 i18next를 초기화
if (typeof window !== 'undefined') {
    i18n
        .use(Backend)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            fallbackLng: 'ko',  // 기본 언어
            // debug: process.env.NODE_ENV === 'development',
            interpolation: {
                escapeValue: false,
            },
            backend: {
                loadPath: '/locales/{{lng}}.json',
            }
        })
}

export default i18n