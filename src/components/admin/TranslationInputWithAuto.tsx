import { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '@/i18n';
import { LANGUAGE_NAMES, LANGUAGE_FLAGS } from '@/utils/translationHelpers';
import { autoTranslate } from '@/services/translationService';

interface TranslationInputWithAutoProps {
  field: string;
  label: string;
  value: Record<string, string>;
  onChange: (field: string, lang: string, value: string) => void;
  type?: 'text' | 'textarea';
  required?: boolean;
  enableAutoTranslate?: boolean;
}

export default function TranslationInputWithAuto({
  field,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  enableAutoTranslate = true,
}: TranslationInputWithAutoProps) {
  const [isTranslating, setIsTranslating] = useState(false);

  const handleAutoTranslate = async () => {
    const englishValue = value[`${field}_en`];
    
    if (!englishValue || englishValue.trim() === '') {
      alert('Please enter English text first');
      return;
    }

    setIsTranslating(true);

    try {
      const translated = await autoTranslate({ [`${field}_en`]: englishValue }, [field]);
      
      // Update all language fields
      SUPPORTED_LANGUAGES.forEach(lang => {
        if (lang !== 'en' && translated[`${field}_${lang}`]) {
          onChange(field, lang, translated[`${field}_${lang}`]);
        }
      });
      
      alert('Translation complete!');
    } catch (error) {
      console.error('Translation error:', error);
      alert('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {enableAutoTranslate && (
          <button
            type="button"
            onClick={handleAutoTranslate}
            disabled={isTranslating || !value[`${field}_en`]}
            className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {isTranslating ? (
              <>
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Translating...
              </>
            ) : (
              <>
                🌐 Auto-Translate
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {SUPPORTED_LANGUAGES.map(lang => (
          <div key={lang} className="flex items-start gap-2">
            <div className="flex items-center gap-2 min-w-[120px] pt-2">
              <span className="text-xl">{LANGUAGE_FLAGS[lang]}</span>
              <span className="text-sm font-medium text-gray-600">
                {LANGUAGE_NAMES[lang]}
              </span>
            </div>
            
            {type === 'textarea' ? (
              <textarea
                value={value[`${field}_${lang}`] || ''}
                onChange={(e) => onChange(field, lang, e.target.value)}
                required={required && lang === 'en'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder={lang === 'en' ? `Enter ${label.toLowerCase()}` : `${LANGUAGE_NAMES[lang]} translation`}
              />
            ) : (
              <input
                type="text"
                value={value[`${field}_${lang}`] || ''}
                onChange={(e) => onChange(field, lang, e.target.value)}
                required={required && lang === 'en'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={lang === 'en' ? `Enter ${label.toLowerCase()}` : `${LANGUAGE_NAMES[lang]} translation`}
              />
            )}
          </div>
        ))}
      </div>
      
      {required && (
        <p className="text-xs text-gray-500">
          * English is required. Click "Auto-Translate" to automatically translate to other languages.
        </p>
      )}
    </div>
  );
}
