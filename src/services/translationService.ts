/**
 * Automatic Translation Service
 * Translates content from English to other languages automatically
 */

const SUPPORTED_LANGUAGES = ['fr', 'es', 'nl', 'de'] as const;
type Language = typeof SUPPORTED_LANGUAGES[number];

// Using LibreTranslate (free, self-hosted option) or Google Translate API
const TRANSLATE_API_URL = import.meta.env.VITE_TRANSLATE_API_URL || 'https://libretranslate.com/translate';
const TRANSLATE_API_KEY = import.meta.env.VITE_TRANSLATE_API_KEY || '';

/**
 * Translate text from English to target language
 */
async function translateText(text: string, targetLang: Language): Promise<string> {
  if (!text || text.trim() === '') return text;
  
  try {
    const response = await fetch(TRANSLATE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text',
        api_key: TRANSLATE_API_KEY || undefined,
      }),
    });

    if (!response.ok) {
      console.error(`Translation failed for ${targetLang}:`, response.statusText);
      return text; // Return original text if translation fails
    }

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error(`Translation error for ${targetLang}:`, error);
    return text; // Return original text on error
  }
}

/**
 * Translate multiple fields of an object
 */
export async function translateFields(
  data: Record<string, any>,
  fields: string[]
): Promise<Record<string, any>> {
  const result = { ...data };
  
  // Get English values
  const englishValues: Record<string, string> = {};
  fields.forEach(field => {
    englishValues[field] = data[`${field}_en`] || data[field] || '';
  });

  // Translate to all languages
  for (const lang of SUPPORTED_LANGUAGES) {
    for (const field of fields) {
      const englishText = englishValues[field];
      if (englishText) {
        // Check if translation already exists
        if (!data[`${field}_${lang}`] || data[`${field}_${lang}`] === '') {
          result[`${field}_${lang}`] = await translateText(englishText, lang);
        } else {
          result[`${field}_${lang}`] = data[`${field}_${lang}`];
        }
      }
    }
  }

  return result;
}

/**
 * Auto-translate when saving in admin
 * Call this before saving to database
 */
export async function autoTranslate(
  data: Record<string, any>,
  translatableFields: string[] = ['name', 'title', 'description', 'tagline', 'content']
): Promise<Record<string, any>> {
  console.log('Auto-translating content...');
  
  // Ensure English fields exist
  translatableFields.forEach(field => {
    if (data[field] && !data[`${field}_en`]) {
      data[`${field}_en`] = data[field];
    }
  });

  // Translate all fields
  const translated = await translateFields(data, translatableFields);
  
  console.log('Translation complete!');
  return translated;
}

/**
 * Batch translate multiple items
 */
export async function batchTranslate(
  items: Record<string, any>[],
  translatableFields: string[]
): Promise<Record<string, any>[]> {
  const results = [];
  
  for (const item of items) {
    const translated = await autoTranslate(item, translatableFields);
    results.push(translated);
    
    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
}
