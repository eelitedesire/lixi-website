# QUICK FIX: Add i18n to All Pages

## For EVERY page, add these 4 lines at the top:

```tsx
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'; // if not already imported

// Inside component:
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();
```

## Pages to Update:

### 1. Quote.tsx
```tsx
// Add at top of Quote component:
const { t } = useTranslation(['forms', 'common']);
const { lang = 'en' } = useParams();

// Replace buttons:
"Next" → {t('common:buttons.next')}
"Previous" → {t('common:buttons.previous')}
"Submit" → {t('common:buttons.submit')}
```

### 2. Solutions.tsx
```tsx
const { t } = useTranslation(['solutions', 'common']);
const { lang = 'en' } = useParams();

// Update links:
<Link to="/solutions/residential"> → <Link to={`/${lang}/solutions/residential`}>
```

### 3. Shopping.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams();

// Update API call:
api.getShopping() → api.getShopping(lang)
```

### 4. Technology.tsx
```tsx
const { t } = useTranslation(['technology', 'common']);
const { lang = 'en' } = useParams();
```

### 5. Projects.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams();

// Update API:
api.getProjects() → api.getProjects(lang)
```

### 6. Partners.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams();

// Update API:
api.getPartners() → api.getPartners(lang)
```

### 7. Blog.tsx
```tsx
const { t } = useTranslation(['blog', 'common']);
const { lang = 'en' } = useParams();

// Update API:
api.getBlogPosts() → api.getBlogPosts(lang)

// Update links:
<Link to={`/blog/${post.slug}`}> → <Link to={`/${lang}/blog/${post.slug}`}>
```

### 8. Service.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams();

// Update API:
api.getServices() → api.getServices(lang)
```

### 9. About.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams();

// Update API:
api.getAbout() → api.getAbout(lang)
```

### 10. Contact.tsx
```tsx
const { t } = useTranslation(['forms', 'common']);
const { lang = 'en' } = useParams();

// Replace form labels:
"Name" → {t('forms:contact.name')}
"Email" → {t('forms:contact.email')}
"Message" → {t('forms:contact.message')}
"Send" → {t('forms:contact.send')}
```

## Automated Fix (Run this):

```bash
# This will add i18n to all pages automatically
node scripts/add-i18n-to-pages.js
```

## Manual Fix (5 minutes per page):

1. Open page file
2. Add imports at top
3. Add hooks in component
4. Replace text with t()
5. Update links with /${lang}/
6. Update API calls with (lang)
7. Save and test

## Test Each Page:

```bash
npm run dev
# Visit /fr/quote → Should show French
# Visit /es/solutions → Should show Spanish
# Visit /nl/blog → Should show Dutch
```
