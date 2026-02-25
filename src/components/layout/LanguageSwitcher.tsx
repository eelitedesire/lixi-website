import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { SUPPORTED_LANGUAGES, type Language } from '@/i18n';

const LANGUAGE_CONFIG: Record<Language, { name: string; flag: string; fullName: string }> = {
  en: { name: 'EN', flag: '🇬🇧', fullName: 'English' },
  fr: { name: 'FR', flag: '🇫🇷', fullName: 'Français' },
  es: { name: 'ES', flag: '🇪🇸', fullName: 'Español' },
  nl: { name: 'NL', flag: '🇳🇱', fullName: 'Nederlands' },
  de: { name: 'DE', flag: '🇩🇪', fullName: 'Deutsch' },
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const langCode = i18n.language.split('-')[0];
  const currentLang = (SUPPORTED_LANGUAGES.includes(langCode as Language) ? langCode : 'en') as Language;

  const changeLanguage = (lang: Language) => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    // Remove current language prefix if exists
    if (SUPPORTED_LANGUAGES.includes(pathParts[0] as Language)) {
      pathParts.shift();
    }
    
    // Build new path with language prefix
    const newPath = `/${lang}/${pathParts.join('/')}`;
    
    i18n.changeLanguage(lang);
    navigate(newPath);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 text-brand-white hover:text-brand-green transition-colors px-3 py-2 rounded-lg hover:bg-brand-grey/50"
        aria-label="Change language"
      >
        <span className="text-xl">{LANGUAGE_CONFIG[currentLang].flag}</span>
        <span className="text-sm font-semibold hidden sm:inline">{LANGUAGE_CONFIG[currentLang].name}</span>
      </button>

      {/* Dropdown */}
      <div className="absolute top-full right-0 mt-2 w-44 glass rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-colors ${
              currentLang === lang
                ? 'bg-brand-green text-brand-black font-semibold'
                : 'text-brand-white hover:bg-brand-green hover:text-brand-black'
            }`}
          >
            <span className="text-xl">{LANGUAGE_CONFIG[lang].flag}</span>
            <span>{LANGUAGE_CONFIG[lang].fullName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
