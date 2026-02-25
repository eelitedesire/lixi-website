# LIXI Website - Internationalization (i18n) Implementation Guide

## 📦 Installation Complete

All required packages have been installed:
- `i18next` - Core i18n framework
- `react-i18next` - React bindings
- `i18next-browser-languagedetector` - Auto-detect user language
- `i18next-http-backend` - Load translations dynamically (optional)

## 🌍 Supported Languages

- **English (en)** - Default
- **French (fr)**
- **Spanish (es)**
- **Dutch (nl)**

## 📁 Project Structure

```
src/
├── i18n/
│   ├── config.ts          # i18n configuration
│   └── index.ts           # Export file
├── locales/
│   ├── en/
│   │   ├── common.json    # Navigation, footer, buttons
│   │   ├── home.json      # Home page content
│   │   ├── products.json  # Products page
│   │   ├── trading.json   # Trading page
│   │   ├── technology.json
│   │   ├── blog.json
│   │   ├── faq.json
│   │   ├── forms.json     # Form labels & validation
│   │   ├── legal.json
│   │   └── solutions.json
│   ├── fr/                # French translations
│   ├── es/                # Spanish translations
│   └── nl/                # Dutch translations
└── components/
    └── layout/
        └── LanguageSwitcher.tsx
```

## 🚀 How It Works

### 1. Language-Prefixed Routing

All routes now include a language prefix:
- `/en/` - English
- `/fr/` - French  
- `/es/` - Spanish
- `/nl/` - Dutch

**Examples:**
- `/en/products` - Products page in English
- `/fr/about` - About page in French
- `/es/blog` - Blog in Spanish
- `/nl/contact` - Contact in Dutch

### 2. Automatic Language Detection

On first visit, the system:
1. Checks URL path for language prefix
2. Falls back to localStorage (if user previously selected)
3. Falls back to browser language
4. Defaults to English if none match

### 3. Language Persistence

Selected language is stored in `localStorage` and persists across sessions.

## 🔧 Usage in Components

### Basic Usage

```tsx
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

function MyComponent() {
  const { t } = useTranslation('common');
  const { lang = 'en' } = useParams<{ lang: string }>();

  return (
    <div>
      <h1>{t('nav.products')}</h1>
      <Link to={`/${lang}/products`}>
        {t('buttons.viewAll')}
      </Link>
    </div>
  );
}
```

### Multiple Namespaces

```tsx
const { t } = useTranslation(['home', 'common']);

// Use translations from different namespaces
<h1>{t('home:hero.title')}</h1>
<button>{t('common:buttons.getStarted')}</button>
```

### Interpolation (Dynamic Values)

```tsx
// In translation file:
// "description": "Join {{count}}+ installations"

// In component:
<p>{t('home:cta.description', { count: 1200 })}</p>
// Output: "Join 1,200+ installations"
```

### Pluralization

```tsx
// In translation file:
// "items": "{{count}} item",
// "items_plural": "{{count}} items"

// In component:
<span>{t('items', { count: cartItems.length })}</span>
```

## 🎨 Language Switcher

The `LanguageSwitcher` component is already integrated into the Navbar.

**Features:**
- Dropdown with all available languages
- Highlights current language
- Smooth transitions without page reload
- Updates URL with new language prefix

**Location:** `src/components/layout/LanguageSwitcher.tsx`

## 📝 Adding New Translations

### Step 1: Add to English (en)

Edit `/src/locales/en/[namespace].json`:

```json
{
  "newSection": {
    "title": "New Feature",
    "description": "This is a new feature"
  }
}
```

### Step 2: Translate to Other Languages

Copy the structure to `fr/`, `es/`, `nl/` and translate:

**French (fr):**
```json
{
  "newSection": {
    "title": "Nouvelle Fonctionnalité",
    "description": "Ceci est une nouvelle fonctionnalité"
  }
}
```

**Spanish (es):**
```json
{
  "newSection": {
    "title": "Nueva Característica",
    "description": "Esta es una nueva característica"
  }
}
```

**Dutch (nl):**
```json
{
  "newSection": {
    "title": "Nieuwe Functie",
    "description": "Dit is een nieuwe functie"
  }
}
```

### Step 3: Use in Component

```tsx
const { t } = useTranslation('common');

<h2>{t('newSection.title')}</h2>
<p>{t('newSection.description')}</p>
```

## 🔄 Translating Existing Pages

### Example: Products Page

**Before:**
```tsx
<h1>Battery Systems</h1>
<p>Premium LiFePO4 Energy Storage</p>
<Link to="/products">View All</Link>
```

**After:**
```tsx
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const { t } = useTranslation('products');
const { lang = 'en' } = useParams();

<h1>{t('title')}</h1>
<p>{t('subtitle')}</p>
<Link to={`/${lang}/products`}>{t('common:buttons.viewAll')}</Link>
```

## 🎯 Best Practices

### 1. Namespace Organization

- **common** - Shared UI elements (nav, footer, buttons)
- **[page]** - Page-specific content (home, products, blog)
- **forms** - Form labels and validation messages
- **legal** - Legal pages (privacy, terms)

### 2. Translation Keys

Use descriptive, hierarchical keys:

✅ **Good:**
```json
{
  "hero": {
    "title": "Welcome",
    "subtitle": "Get started today"
  }
}
```

❌ **Bad:**
```json
{
  "text1": "Welcome",
  "text2": "Get started today"
}
```

### 3. Keep Translations Consistent

Use the same terminology across all languages:
- "Get Quote" → "Demander un Devis" (FR) → "Solicitar Cotización" (ES)

### 4. Handle Missing Translations

i18next will fall back to English if a translation is missing. Always ensure English translations are complete.

## 🔍 SEO Considerations

### 1. Language-Specific Meta Tags

```tsx
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

<Helmet>
  <html lang={i18n.language} />
  <title>{t('meta.title')}</title>
  <meta name="description" content={t('meta.description')} />
</Helmet>
```

### 2. Hreflang Tags

Add alternate language links for SEO:

```tsx
<Helmet>
  <link rel="alternate" hrefLang="en" href="https://lixi.de/en/products" />
  <link rel="alternate" hrefLang="fr" href="https://lixi.de/fr/products" />
  <link rel="alternate" hrefLang="es" href="https://lixi.de/es/products" />
  <link rel="alternate" hrefLang="nl" href="https://lixi.de/nl/products" />
</Helmet>
```

### 3. Sitemap

Generate separate sitemaps for each language or include all language versions in one sitemap.

## ⚡ Performance

### Bundle Size

Translations are imported statically, so all languages are included in the bundle. For production optimization:

**Current:** ~50KB for all 4 languages (gzipped)

**To optimize further (optional):**
1. Use `i18next-http-backend` to load translations on-demand
2. Code-split by language
3. Lazy-load non-critical namespaces

### No Page Reload

Language switching happens instantly without page reload, maintaining:
- Scroll position
- Form state
- Animation state
- Canvas performance

## 🧪 Testing

### Test Language Switching

1. Start dev server: `npm run dev`
2. Visit `http://localhost:5173/en`
3. Click language switcher (Globe icon in navbar)
4. Select different language
5. Verify URL changes to `/fr`, `/es`, or `/nl`
6. Verify content updates without page reload

### Test All Routes

```bash
# English
http://localhost:5173/en
http://localhost:5173/en/products
http://localhost:5173/en/about

# French
http://localhost:5173/fr
http://localhost:5173/fr/products
http://localhost:5173/fr/about

# Spanish
http://localhost:5173/es

# Dutch
http://localhost:5173/nl
```

## 🚢 Production Build

```bash
npm run build
```

Verify:
- ✅ Build completes without errors
- ✅ All translation files are included
- ✅ Bundle size is acceptable (<300KB gzipped)
- ✅ No console warnings

## 📊 Translation Coverage

### Current Status

| Namespace | EN | FR | ES | NL |
|-----------|----|----|----|----|
| common    | ✅ | ✅ | ✅ | ✅ |
| home      | ✅ | ✅ | ✅ | ✅ |
| products  | ✅ | ✅ | ✅ | ✅ |
| trading   | ✅ | ✅ | ✅ | ✅ |
| technology| ✅ | ✅ | ✅ | ✅ |
| blog      | ✅ | ✅ | ✅ | ✅ |
| faq       | ✅ | ✅ | ✅ | ✅ |
| forms     | ✅ | ✅ | ✅ | ✅ |
| legal     | ✅ | ✅ | ✅ | ✅ |
| solutions | ✅ | ✅ | ✅ | ✅ |

## 🔧 Troubleshooting

### Issue: Translations not loading

**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run dev
```

### Issue: Language not persisting

**Solution:**
Check localStorage in browser DevTools:
```js
localStorage.getItem('i18nextLng')
```

### Issue: Wrong language on first load

**Solution:**
Ensure URL includes language prefix: `/en/` not just `/`

### Issue: TypeScript errors

**Solution:**
Add type definitions:
```tsx
import type { TFunction } from 'i18next';

const t: TFunction = useTranslation().t;
```

## 📚 Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [Translation Best Practices](https://www.i18next.com/principles/fallback)

## 🎯 Next Steps

1. **Translate Remaining Pages:**
   - Update all page components to use `useTranslation`
   - Replace hardcoded text with translation keys
   - Update all `Link` components with language prefix

2. **Add More Languages:**
   - Create new folder in `/src/locales/[lang]`
   - Copy all namespace files from `en/`
   - Translate content
   - Add language to `SUPPORTED_LANGUAGES` in `config.ts`

3. **Dynamic Content:**
   - Translate product descriptions from database
   - Translate blog posts
   - Translate FAQ content

4. **SEO Optimization:**
   - Add hreflang tags to all pages
   - Generate language-specific sitemaps
   - Add structured data in each language

## ✅ Implementation Checklist

- [x] Install i18n packages
- [x] Create i18n configuration
- [x] Create translation files (EN, FR, ES, NL)
- [x] Create LanguageSwitcher component
- [x] Update App.tsx with language routing
- [x] Update Navbar with translations
- [x] Add language persistence
- [x] Test language switching
- [ ] Translate all pages
- [ ] Add SEO meta tags
- [ ] Test production build
- [ ] Deploy to production

---

**Built with ⚡ by LIXI Energy Systems**
