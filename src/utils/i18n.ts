import { useTranslation } from 'react-i18next';

/**
 * Get translated field from database object
 * @param obj - Database object with language-suffixed fields
 * @param field - Base field name (e.g., 'name', 'description')
 * @param lang - Language code (e.g., 'en', 'fr', 'es', 'nl')
 * @returns Translated value or fallback to English
 */
export function getTranslatedField<T>(
  obj: Record<string, any>,
  field: string,
  lang: string = 'en'
): T {
  const translatedField = `${field}_${lang}`;
  const fallbackField = `${field}_en`;
  
  return (obj[translatedField] || obj[fallbackField] || obj[field]) as T;
}

/**
 * Hook to get translated content from database objects
 */
export function useTranslatedContent() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  return {
    t: (obj: Record<string, any>, field: string) => 
      getTranslatedField(obj, field, currentLang),
    lang: currentLang
  };
}

/**
 * Transform database object to use current language
 * @param obj - Database object with language-suffixed fields
 * @param lang - Language code
 * @returns Object with translated fields
 */
export function translateObject<T extends Record<string, any>>(
  obj: T,
  lang: string = 'en'
): T {
  const translated: any = { ...obj };
  
  // Find all fields with language suffixes
  Object.keys(obj).forEach(key => {
    if (key.endsWith('_en') || key.endsWith('_fr') || key.endsWith('_es') || key.endsWith('_nl') || key.endsWith('_de')) {
      const baseField = key.replace(/_(en|fr|es|nl|de)$/, '');
      const langField = `${baseField}_${lang}`;
      const fallbackField = `${baseField}_en`;
      
      // Set the base field to the translated value
      if (!translated[baseField]) {
        translated[baseField] = obj[langField] || obj[fallbackField] || obj[key];
      }
    }
  });
  
  return translated;
}
