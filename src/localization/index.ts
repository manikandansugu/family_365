import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {english} from './locals/en';

export const resources = {
  en: {
    translation: english,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
