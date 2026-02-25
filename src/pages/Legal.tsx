import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Privacy = () => {
  const { t } = useTranslation('legal');
  return (
    <>
      <Helmet><title>{t('privacy.title')} | LIXI</title></Helmet>
      <div className="pt-20 bg-brand-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-24 prose prose-invert">
          <h1 className="font-display text-h2 text-brand-white">{t('privacy.title')}</h1>
          <p className="text-brand-white/70">{t('privacy.lastUpdated', { date: 'January 2024' })}</p>
          <p className="text-brand-white/70">{t('privacy.intro')}</p>
        </div>
      </div>
    </>
  );
};

export const Terms = () => {
  const { t } = useTranslation('legal');
  return (
    <>
      <Helmet><title>{t('terms.title')} | LIXI</title></Helmet>
      <div className="pt-20 bg-brand-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-24 prose prose-invert">
          <h1 className="font-display text-h2 text-brand-white">{t('terms.title')}</h1>
          <p className="text-brand-white/70">{t('terms.lastUpdated', { date: 'January 2024' })}</p>
          <p className="text-brand-white/70">{t('terms.intro')}</p>
        </div>
      </div>
    </>
  );
};

export const NotFound = () => {
  const { t } = useTranslation('common');
  const { lang = 'en' } = useParams<{ lang: string }>();
  return (
    <>
      <Helmet><title>{t('404.title')} | LIXI</title></Helmet>
      <div className="pt-20 bg-brand-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-9xl font-display text-brand-green mb-4">404</div>
          <h1 className="font-display text-h3 text-brand-white mb-4">{t('404.title')}</h1>
          <p className="text-brand-white/70 mb-8">{t('404.description')}</p>
          <Link to={`/${lang}`} className="inline-block bg-brand-green text-brand-black font-bold px-8 py-4 rounded-lg hover:scale-105 transition-transform">
            {t('404.backHome')}
          </Link>
        </div>
      </div>
    </>
  );
};
