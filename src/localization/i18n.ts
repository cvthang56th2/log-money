import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, de, vi} from './translations';

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  vi: {
    translation: vi,
  },
};

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3',
  // fallback language is set to english
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
