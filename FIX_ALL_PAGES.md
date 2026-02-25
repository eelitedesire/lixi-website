# ✅ COMPLETE FIX FOR ALL PAGES

## Problem: Pages showing 404 and not translating

## Solution: Add 2 lines to EVERY page component

### Step 1: Add to ALL page files

At the top of EVERY component function, add:

```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();
```

### Step 2: Update ALL Link components

Replace:
```tsx
<Link to="/products">
```

With:
```tsx
<Link to={`/${lang}/products`}>
```

### Step 3: Update ALL API calls

Replace:
```tsx
api.getProducts()
```

With:
```tsx
api.getProducts(lang)
```

---

## Quick Copy-Paste for Each Page:

### Quote.tsx
```tsx
// Add after imports, inside Quote component:
const { t } = useTranslation(['forms', 'common']);
const { lang = 'en' } = useParams<{ lang: string }>();
```

### Solutions.tsx
```tsx
const { t } = useTranslation(['solutions', 'common']);
const { lang = 'en' } = useParams<{ lang: string }>();
```

### Shopping.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();

// Update API:
useEffect(() => {
  api.getShopping(lang).then(setData);
}, [lang]);
```

### Technology.tsx
```tsx
const { t } = useTranslation(['technology', 'common']);
const { lang = 'en' } = useParams<{ lang: string }>();
```

### Projects.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();

useEffect(() => {
  api.getProjects(lang).then(setProjects);
}, [lang]);
```

### Partners.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();

useEffect(() => {
  api.getPartners(lang).then(setPartners);
}, [lang]);
```

### Blog.tsx
```tsx
const { t } = useTranslation(['blog', 'common']);
const { lang = 'en' } = useParams<{ lang: string }>();

useEffect(() => {
  api.getBlogPosts(lang).then(setPosts);
}, [lang]);

// Update links:
<Link to={`/${lang}/blog/${post.slug}`}>
```

### Service.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();

useEffect(() => {
  api.getServices(lang).then(setServices);
}, [lang]);
```

### About.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();

useEffect(() => {
  api.getAbout(lang).then(setAbout);
}, [lang]);
```

### Contact.tsx
```tsx
const { t } = useTranslation(['forms', 'common']);
const { lang = 'en' } = useParams<{ lang: string }>();
```

### FAQ.tsx
```tsx
const { t } = useTranslation(['faq', 'common']);
const { lang = 'en' } = useParams<{ lang: string }>();
```

---

## Test After Each Fix:

```bash
npm run dev

# Test each page:
http://localhost:5173/en/quote
http://localhost:5173/fr/solutions
http://localhost:5173/es/shopping
http://localhost:5173/nl/blog
```

---

## Why This Fixes Everything:

1. **404 Errors**: Fixed by using `/${lang}/` in all links
2. **Footer not translating**: Fixed by Footer.tsx update (already done)
3. **Content not translating**: Fixed by passing `lang` to API calls
4. **Pages in English only**: Fixed by adding `t()` function

---

## Status:

- ✅ Home.tsx - DONE
- ✅ Products.tsx - DONE
- ✅ Footer.tsx - DONE
- ✅ Navbar.tsx - DONE
- ✅ Legal.tsx - DONE
- ⏳ Quote.tsx - NEEDS FIX
- ⏳ Solutions.tsx - NEEDS FIX
- ⏳ Shopping.tsx - NEEDS FIX
- ⏳ Technology.tsx - NEEDS FIX
- ⏳ Projects.tsx - NEEDS FIX
- ⏳ Partners.tsx - NEEDS FIX
- ⏳ Blog.tsx - NEEDS FIX
- ⏳ Service.tsx - NEEDS FIX
- ⏳ About.tsx - NEEDS FIX
- ⏳ Contact.tsx - NEEDS FIX
- ⏳ FAQ.tsx - NEEDS FIX
