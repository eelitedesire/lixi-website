import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'es', 'nl', 'de'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

export const NAMESPACES = [
  'common',
  'home',
  'products',
  'trading',
  'technology',
  'blog',
  'faq',
  'forms',
  'legal',
  'solutions',
] as const;

export type Namespace = typeof NAMESPACES[number];

// Import all translations
import commonEn from '../locales/en/common.json';
import homeEn from '../locales/en/home.json';
import productsEn from '../locales/en/products.json';
import tradingEn from '../locales/en/trading.json';
import technologyEn from '../locales/en/technology.json';
import blogEn from '../locales/en/blog.json';
import faqEn from '../locales/en/faq.json';
import formsEn from '../locales/en/forms.json';
import legalEn from '../locales/en/legal.json';
import solutionsEn from '../locales/en/solutions.json';

import commonFr from '../locales/fr/common.json';
import homeFr from '../locales/fr/home.json';
import productsFr from '../locales/fr/products.json';
import tradingFr from '../locales/fr/trading.json';
import technologyFr from '../locales/fr/technology.json';
import blogFr from '../locales/fr/blog.json';
import faqFr from '../locales/fr/faq.json';
import formsFr from '../locales/fr/forms.json';
import legalFr from '../locales/fr/legal.json';
import solutionsFr from '../locales/fr/solutions.json';

import commonEs from '../locales/es/common.json';
import homeEs from '../locales/es/home.json';
import productsEs from '../locales/es/products.json';
import tradingEs from '../locales/es/trading.json';
import technologyEs from '../locales/es/technology.json';
import blogEs from '../locales/es/blog.json';
import faqEs from '../locales/es/faq.json';
import formsEs from '../locales/es/forms.json';
import legalEs from '../locales/es/legal.json';
import solutionsEs from '../locales/es/solutions.json';

import commonNl from '../locales/nl/common.json';
import homeNl from '../locales/nl/home.json';
import productsNl from '../locales/nl/products.json';
import tradingNl from '../locales/nl/trading.json';
import technologyNl from '../locales/nl/technology.json';
import blogNl from '../locales/nl/blog.json';
import faqNl from '../locales/nl/faq.json';
import formsNl from '../locales/nl/forms.json';
import legalNl from '../locales/nl/legal.json';
import solutionsNl from '../locales/nl/solutions.json';

import commonDe from '../locales/de/common.json';
import homeDe from '../locales/de/home.json';
import productsDe from '../locales/de/products.json';
import tradingDe from '../locales/de/trading.json';
import technologyDe from '../locales/de/technology.json';
import blogDe from '../locales/de/blog.json';
import faqDe from '../locales/de/faq.json';
import formsDe from '../locales/de/forms.json';
import legalDe from '../locales/de/legal.json';
import solutionsDe from '../locales/de/solutions.json';

const resources = {
  en: {
    common: commonEn,
    home: homeEn,
    products: productsEn,
    trading: tradingEn,
    technology: technologyEn,
    blog: blogEn,
    faq: faqEn,
    forms: formsEn,
    legal: legalEn,
    solutions: solutionsEn,
  },
  fr: {
    common: commonFr,
    home: homeFr,
    products: productsFr,
    trading: tradingFr,
    technology: technologyFr,
    blog: blogFr,
    faq: faqFr,
    forms: formsFr,
    legal: legalFr,
    solutions: solutionsFr,
  },
  es: {
    common: commonEs,
    home: homeEs,
    products: productsEs,
    trading: tradingEs,
    technology: technologyEs,
    blog: blogEs,
    faq: faqEs,
    forms: formsEs,
    legal: legalEs,
    solutions: solutionsEs,
  },
  nl: {
    common: commonNl,
    home: homeNl,
    products: productsNl,
    trading: tradingNl,
    technology: technologyNl,
    blog: blogNl,
    faq: faqNl,
    forms: formsNl,
    legal: legalNl,
    solutions: solutionsNl,
  },
  de: {
    common: commonDe,
    home: homeDe,
    products: productsDe,
    trading: tradingDe,
    technology: technologyDe,
    blog: blogDe,
    faq: faqDe,
    forms: formsDe,
    legal: legalDe,
    solutions: solutionsDe,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: NAMESPACES,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupFromPathIndex: 0,
    },
    react: {
      useSuspense: true,
    },
  });

// Sync language from URL to i18n
if (typeof window !== 'undefined') {
  const pathLang = window.location.pathname.split('/')[1];
  if (SUPPORTED_LANGUAGES.includes(pathLang as any)) {
    i18n.changeLanguage(pathLang);
  }
}

export default i18n;
