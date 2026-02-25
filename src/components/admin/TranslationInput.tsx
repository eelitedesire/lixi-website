import { SUPPORTED_LANGUAGES } from '@/i18n';
import { LANGUAGE_NAMES, LANGUAGE_FLAGS } from '@/utils/translationHelpers';

interface TranslationInputProps {
  field: string;
  label: string;
  value: Record<string, string>;
  onChange: (field: string, lang: string, value: string) => void;
  type?: 'text' | 'textarea';
  required?: boolean;
}

export default function TranslationInput({
  field,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: TranslationInputProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
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
          * English is required. Other languages are optional and will fall back to English if not provided.
        </p>
      )}
    </div>
  );
}
