// TEMPLATE: How to add i18n to ANY page

import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';

function MyPage() {
  // 1. Add these hooks at the top
  const { t } = useTranslation(['namespace', 'common']);
  const { lang = 'en' } = useParams<{ lang: string }>();

  // 2. Replace hardcoded text with t()
  return (
    <div>
      <h1>{t('namespace:title')}</h1>
      <p>{t('namespace:description')}</p>
      
      {/* 3. Update all Link components */}
      <Link to={`/${lang}/products`}>
        {t('common:buttons.viewAll')}
      </Link>
      
      {/* 4. Update API calls */}
      useEffect(() => {
        api.getData(lang).then(setData);
      }, [lang]);
    </div>
  );
}

// QUICK FIX FOR ALL PAGES:
// 1. Add: import { useTranslation } from 'react-i18next';
// 2. Add: import { useParams } from 'react-router-dom';
// 3. Add: const { t } = useTranslation('common');
// 4. Add: const { lang = 'en' } = useParams();
// 5. Replace text with: {t('key')}
// 6. Update links: to={`/${lang}/path`}
