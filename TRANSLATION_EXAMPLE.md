// Example: How to translate Home.tsx
// Add these imports at the top:
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

// Inside the Home component, add:
const { t } = useTranslation(['home', 'common']);
const { lang = 'en' } = useParams<{ lang: string }>();

// Replace hardcoded text with translation keys:

// HERO SECTION - Replace:
// <span className="text-brand-green text-sm font-semibold">{hero.badge}</span>
// With:
<span className="text-brand-green text-sm font-semibold">{t('home:hero.badge')}</span>

// VALUE PROPS - Replace the array with:
const valueProps = [
  { 
    icon: Battery, 
    title: t('home:valueProps.premiumCells.title'), 
    desc: t('home:valueProps.premiumCells.desc')
  },
  { 
    icon: Shield, 
    title: t('home:valueProps.germanEngineering.title'), 
    desc: t('home:valueProps.germanEngineering.desc')
  },
  { 
    icon: TrendingDown, 
    title: t('home:valueProps.cutCosts.title'), 
    desc: t('home:valueProps.cutCosts.desc')
  },
  { 
    icon: Zap, 
    title: t('home:valueProps.scalable.title'), 
    desc: t('home:valueProps.scalable.desc')
  },
];

// SOLUTIONS SECTION - Replace:
// <span className="mono-label text-brand-green">What We Do</span>
// With:
<span className="mono-label text-brand-green">{t('home:solutions.badge')}</span>

// Update all Link components to include language prefix:
// <Link to="/products">
// Becomes:
<Link to={`/${lang}/products`}>

// CTA SECTION - Use interpolation for dynamic content:
<p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto" ref={systemsRef}>
  {t('home:cta.description', { count: systemsCount.toLocaleString() })}
</p>

// BUTTONS - Replace:
// Get Started
// With:
{t('common:buttons.getStarted')}

// View All Products
// With:
{t('common:buttons.viewAll')} {t('home:products.title')}
