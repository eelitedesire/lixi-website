import { useState } from 'react';
import { autoTranslate } from '@/services/translationService';

/**
 * Hook for automatic translation in admin forms
 */
export function useAutoTranslate() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translate = async (
    data: Record<string, any>,
    fields: string[]
  ): Promise<Record<string, any> | null> => {
    setIsTranslating(true);
    setError(null);

    try {
      const translated = await autoTranslate(data, fields);
      setIsTranslating(false);
      return translated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed');
      setIsTranslating(false);
      return null;
    }
  };

  return { translate, isTranslating, error };
}
