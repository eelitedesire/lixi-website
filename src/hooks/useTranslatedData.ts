import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslatedField } from '@/utils/i18n';

/**
 * Hook to automatically translate data objects
 * Extracts language-specific fields based on current language
 */
export function useTranslatedData<T extends Record<string, any>>(
  data: T | T[],
  fields: string[] = ['name', 'title', 'description', 'tagline', 'content']
): T | T[] {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  return useMemo(() => {
    const translateItem = (item: T): T => {
      const translated = { ...item };
      
      fields.forEach(field => {
        const langField = `${field}_${currentLang}`;
        const enField = `${field}_en`;
        
        if (item[langField]) {
          (translated as any)[field] = item[langField];
        }
        else if (item[enField]) {
          (translated as any)[field] = item[enField];
        }
      });
      
      return translated;
    };

    if (Array.isArray(data)) {
      return data.map(translateItem);
    }
    
    return translateItem(data);
  }, [data, currentLang, fields]);
}

/**
 * Hook to get a single translated field
 */
export function useTranslatedField<T = string>(
  obj: Record<string, any>,
  field: string
): T {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];
  
  return useMemo(() => {
    return getTranslatedField<T>(obj, field, currentLang);
  }, [obj, field, currentLang]);
}
