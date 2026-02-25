import { SUPPORTED_LANGUAGES } from '@/i18n';

/**
 * Generate translation fields for a given base field
 * Example: generateTranslationFields('title') returns ['title_en', 'title_fr', 'title_es', 'title_nl', 'title_de']
 */
export function generateTranslationFields(baseField: string): string[] {
  return SUPPORTED_LANGUAGES.map(lang => `${baseField}_${lang}`);
}

/**
 * Get all translatable fields for a form
 */
export function getTranslatableFields(fields: string[]): string[] {
  const allFields: string[] = [];
  
  fields.forEach(field => {
    SUPPORTED_LANGUAGES.forEach(lang => {
      allFields.push(`${field}_${lang}`);
    });
  });
  
  return allFields;
}

/**
 * Convert a simple object to a translatable object
 * Example: { name: 'Battery' } => { name_en: 'Battery', name_fr: '', name_es: '', name_nl: '', name_de: '' }
 */
export function makeTranslatable(
  obj: Record<string, any>,
  fields: string[]
): Record<string, any> {
  const result = { ...obj };
  
  fields.forEach(field => {
    const value = obj[field];
    
    // If field already has translations, skip
    if (obj[`${field}_en`]) return;
    
    // Create translation fields
    SUPPORTED_LANGUAGES.forEach(lang => {
      result[`${field}_${lang}`] = lang === 'en' ? value : '';
    });
    
    // Remove the base field
    delete result[field];
  });
  
  return result;
}

/**
 * Language names for display in admin
 */
export const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  nl: 'Nederlands',
  de: 'Deutsch',
};

/**
 * Language flags for display
 */
export const LANGUAGE_FLAGS: Record<string, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  es: '🇪🇸',
  nl: '🇳🇱',
  de: '🇩🇪',
};
