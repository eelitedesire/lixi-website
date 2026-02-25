# i18n Best Practices & Scaling Guide

## 🎯 Translation Workflow

### 1. Development Process

```
1. Write feature in English first
2. Extract hardcoded text to translation keys
3. Add keys to en/[namespace].json
4. Copy structure to fr/, es/, nl/
5. Translate or mark as TODO
6. Test in all languages
```

### 2. Key Naming Conventions

**✅ Good:**
```json
{
  "hero": {
    "title": "Welcome to LIXI",
    "subtitle": "Energy Solutions",
    "cta": {
      "primary": "Get Started",
      "secondary": "Learn More"
    }
  }
}
```

**❌ Bad:**
```json
{
  "text1": "Welcome to LIXI",
  "text2": "Energy Solutions",
  "button1": "Get Started",
  "button2": "Learn More"
}
```

**Rules:**
- Use descriptive, hierarchical keys
- Group related translations
- Use camelCase for keys
- Keep nesting max 3 levels deep

### 3. Namespace Strategy

**When to create a new namespace:**
- Page has 20+ unique translations
- Content is reused across multiple pages
- Translations are domain-specific (e.g., technical terms)

**Current namespaces:**
```
common      → Shared UI (nav, footer, buttons)
home        → Home page only
products    → Products page + product cards
forms       → All forms (contact, quote, newsletter)
legal       → Privacy, terms, legal pages
solutions   → Solutions pages
trading     → Trading page
technology  → Technology page
blog        → Blog pages
faq         → FAQ page
```

## 🔄 Managing Translations at Scale

### 1. Translation Management Tools

For larger teams, consider:

**Option A: Translation Management System (TMS)**
- [Lokalise](https://lokalise.com/)
- [Crowdin](https://crowdin.com/)
- [Phrase](https://phrase.com/)

**Benefits:**
- Collaborative translation
- Translation memory
- Automated workflows
- Quality assurance

**Option B: Keep JSON Files (Current)**
- Simple for small teams
- Version controlled
- No external dependencies
- Free

### 2. Translation Checklist

Before deploying new translations:

```
□ All keys exist in all languages
□ No missing translations (check console)
□ Formatting is consistent
□ Special characters are escaped
□ Pluralization rules are correct
□ Date/number formats are localized
□ RTL languages handled (if applicable)
□ SEO meta tags translated
□ Error messages translated
□ Form validation messages translated
```

### 3. Quality Assurance

**Automated checks:**

```bash
# Check for missing keys
npm run i18n:check

# Validate JSON syntax
npm run i18n:validate

# Find unused keys
npm run i18n:unused
```

**Manual checks:**
- Test all user flows in each language
- Verify text doesn't overflow containers
- Check mobile responsiveness
- Test form submissions
- Verify error messages

## 📊 Translation Coverage Tracking

### Create a coverage script:

```js
// scripts/check-translations.js
const fs = require('fs');
const path = require('path');

const languages = ['en', 'fr', 'es', 'nl'];
const namespaces = ['common', 'home', 'products', ...];

function countKeys(obj, prefix = '') {
  let count = 0;
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      count += countKeys(obj[key], `${prefix}${key}.`);
    } else {
      count++;
    }
  }
  return count;
}

languages.forEach(lang => {
  console.log(`\n${lang.toUpperCase()}:`);
  namespaces.forEach(ns => {
    const file = path.join(__dirname, `../src/locales/${lang}/${ns}.json`);
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const keys = countKeys(data);
    console.log(`  ${ns}: ${keys} keys`);
  });
});
```

Run: `node scripts/check-translations.js`

## 🌍 Adding New Languages

### Step-by-Step Guide

**1. Create language folder:**
```bash
mkdir src/locales/de  # German
```

**2. Copy English files:**
```bash
cp src/locales/en/*.json src/locales/de/
```

**3. Update config:**
```ts
// src/i18n/config.ts
export const SUPPORTED_LANGUAGES = ['en', 'fr', 'es', 'nl', 'de'] as const;
```

**4. Import translations:**
```ts
// src/i18n/config.ts
import commonDe from '../locales/de/common.json';
// ... import all namespaces

const resources = {
  // ... existing languages
  de: {
    common: commonDe,
    // ... all namespaces
  }
};
```

**5. Update LanguageSwitcher:**
```ts
const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'EN',
  fr: 'FR',
  es: 'ES',
  nl: 'NL',
  de: 'DE',  // Add new language
};
```

**6. Translate content:**
- Hire professional translator
- Use translation service
- Crowdsource from community

**7. Test thoroughly:**
```
http://localhost:5173/de
http://localhost:5173/de/products
http://localhost:5173/de/contact
```

## 🎨 Handling Dynamic Content

### Database Content Translation

**Option 1: Separate columns**
```sql
CREATE TABLE products (
  id INT,
  name_en VARCHAR(255),
  name_fr VARCHAR(255),
  name_es VARCHAR(255),
  name_nl VARCHAR(255),
  description_en TEXT,
  description_fr TEXT,
  ...
);
```

**Option 2: JSON field**
```sql
CREATE TABLE products (
  id INT,
  name JSON,  -- {"en": "Battery", "fr": "Batterie"}
  description JSON
);
```

**Option 3: Translation table**
```sql
CREATE TABLE products (
  id INT,
  ...
);

CREATE TABLE product_translations (
  product_id INT,
  language VARCHAR(2),
  name VARCHAR(255),
  description TEXT
);
```

**Recommended:** Option 3 (most flexible)

### Fetching Translated Content

```tsx
const { i18n } = useTranslation();
const currentLang = i18n.language;

// Fetch product with translations
const product = await api.getProduct(id, currentLang);

// Or fetch all translations and select
const product = await api.getProduct(id);
const name = product.translations[currentLang]?.name || product.name;
```

## 🔍 SEO Best Practices

### 1. Hreflang Tags

```tsx
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { lang, slug } = useParams();
  
  return (
    <Helmet>
      <link rel="alternate" hrefLang="en" href={`https://lixi.de/en/products/${slug}`} />
      <link rel="alternate" hrefLang="fr" href={`https://lixi.de/fr/products/${slug}`} />
      <link rel="alternate" hrefLang="es" href={`https://lixi.de/es/products/${slug}`} />
      <link rel="alternate" hrefLang="nl" href={`https://lixi.de/nl/products/${slug}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://lixi.de/en/products/${slug}`} />
    </Helmet>
  );
}
```

### 2. Language-Specific Sitemaps

Generate separate sitemaps:
- `sitemap-en.xml`
- `sitemap-fr.xml`
- `sitemap-es.xml`
- `sitemap-nl.xml`

Or include all in one:
```xml
<url>
  <loc>https://lixi.de/en/products</loc>
  <xhtml:link rel="alternate" hreflang="fr" href="https://lixi.de/fr/products"/>
  <xhtml:link rel="alternate" hreflang="es" href="https://lixi.de/es/products"/>
  <xhtml:link rel="alternate" hreflang="nl" href="https://lixi.de/nl/products"/>
</url>
```

### 3. Canonical URLs

```tsx
<Helmet>
  <link rel="canonical" href={`https://lixi.de/${lang}/products`} />
</Helmet>
```

### 4. Open Graph Tags

```tsx
<Helmet>
  <meta property="og:locale" content={lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`} />
  <meta property="og:title" content={t('meta.title')} />
  <meta property="og:description" content={t('meta.description')} />
</Helmet>
```

## 📱 Mobile Considerations

### 1. Text Overflow

Some languages are longer than English:

**English:** "Get Started" (11 chars)
**German:** "Jetzt Starten" (13 chars)
**French:** "Commencer" (9 chars)

**Solution:**
```css
.button {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
```

Or use responsive design:
```tsx
<button className="px-4 py-2 text-sm md:text-base">
  {t('buttons.getStarted')}
</button>
```

### 2. Language Switcher on Mobile

Current implementation works on mobile, but consider:
- Bottom sheet for language selection
- Flag icons for visual recognition
- Larger touch targets (min 44x44px)

## 🚀 Performance Optimization

### 1. Code Splitting by Language (Advanced)

```ts
// Lazy load translations
const loadTranslations = async (lang: string) => {
  const translations = await import(`./locales/${lang}/common.json`);
  return translations.default;
};
```

### 2. Preload Critical Translations

```tsx
// In index.html
<link rel="preload" href="/locales/en/common.json" as="fetch" crossorigin>
```

### 3. Cache Translations

```ts
// Service Worker
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/locales/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

## 🧪 Testing Strategy

### 1. Unit Tests

```tsx
import { renderWithI18n } from './test-utils';

test('renders translated text', () => {
  const { getByText } = renderWithI18n(<MyComponent />, { lng: 'fr' });
  expect(getByText('Commencer')).toBeInTheDocument();
});
```

### 2. E2E Tests

```js
// Cypress
describe('Language Switching', () => {
  it('switches to French', () => {
    cy.visit('/en');
    cy.get('[data-testid="language-switcher"]').click();
    cy.contains('FR').click();
    cy.url().should('include', '/fr');
    cy.contains('Commencer');
  });
});
```

### 3. Visual Regression Tests

Use tools like:
- Percy
- Chromatic
- BackstopJS

To catch layout issues in different languages.

## 📈 Analytics

Track language usage:

```tsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Track language changes
    const handleLanguageChange = (lng: string) => {
      // Google Analytics
      gtag('event', 'language_change', {
        language: lng
      });
      
      // AWS Pinpoint
      analytics.record({
        name: 'LanguageChanged',
        attributes: { language: lng }
      });
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);
}
```

## 🎓 Training Team Members

### For Developers:

1. Always use translation keys, never hardcode text
2. Add English translations first
3. Test in all languages before PR
4. Update translation files in same commit as code

### For Content Writers:

1. Write clear, concise English
2. Avoid idioms and slang
3. Use consistent terminology
4. Provide context for translators

### For Translators:

1. Maintain brand voice
2. Keep technical terms consistent
3. Test translations in UI
4. Ask questions if context unclear

## 🔒 Security Considerations

### 1. XSS Prevention

i18next escapes HTML by default, but be careful with:

```tsx
// ❌ Dangerous
<div dangerouslySetInnerHTML={{ __html: t('content') }} />

// ✅ Safe
<div>{t('content')}</div>

// ✅ Safe with HTML
<Trans i18nKey="content">
  Welcome to <strong>LIXI</strong>
</Trans>
```

### 2. Input Validation

Translate validation messages:

```tsx
const schema = z.object({
  email: z.string().email(t('forms:validation.email')),
  name: z.string().min(2, t('forms:validation.minLength', { min: 2 }))
});
```

## 📚 Resources

- [i18next Best Practices](https://www.i18next.com/principles/fallback)
- [React i18next Guide](https://react.i18next.com/guides/quick-start)
- [W3C Internationalization](https://www.w3.org/International/)
- [Google I18n Guidelines](https://developers.google.com/international/)

---

**Built with ⚡ by LIXI Energy Systems**
