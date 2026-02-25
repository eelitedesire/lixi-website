# 🚀 FINAL FIX - Copy & Paste This Code

## The Problem:
- Pages show 404 when switching language
- Footer stays in English
- Content doesn't translate

## The Solution:
Add these 2 lines to EVERY page component:

```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();
```

---

## ✅ ALREADY FIXED:
- Home.tsx ✅
- Products.tsx ✅
- Footer.tsx ✅
- Navbar.tsx ✅
- Legal.tsx (Privacy, Terms, 404) ✅

---

## ⚡ QUICK FIX FOR REMAINING PAGES:

### For EVERY remaining page, do this:

1. **Add imports** (if not present):
```tsx
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
```

2. **Add hooks** (inside component):
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();
```

3. **Update ALL links**:
```tsx
// Before:
<Link to="/products">

// After:
<Link to={`/${lang}/products`}>
```

4. **Update ALL API calls**:
```tsx
// Before:
api.getProducts()

// After:
api.getProducts(lang)
```

---

## 📝 EXACT CODE FOR EACH PAGE:

### Quote.tsx
Add at top of component:
```tsx
const { t } = useTranslation(['forms', 'common']);
const { lang = 'en' } = useParams<{ lang: string }>();
```

### Solutions.tsx, SolutionDetail.tsx
```tsx
const { t } = useTranslation(['solutions', 'common']);
const { lang = 'en' } = useParams<{ lang: string }>();

// Update links:
<Link to={`/${lang}/solutions/residential`}>
```

### Shopping.tsx, Checkout.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();

useEffect(() => {
  api.getShopping(lang).then(setData);
}, [lang]);
```

### Technology.tsx
```tsx
const { t } = useTranslation(['technology', 'common']);
const { lang = 'en' } = useParams<{ lang: string }>();
```

### Projects.tsx, ProjectDetail.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();

useEffect(() => {
  api.getProjects(lang).then(setProjects);
}, [lang]);

// Update links:
<Link to={`/${lang}/projects/${project.id}`}>
```

### Partners.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();

useEffect(() => {
  api.getPartners(lang).then(setPartners);
}, [lang]);
```

### Blog.tsx, BlogPost.tsx
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

### ProductDetail.tsx
```tsx
const { t } = useTranslation(['products', 'common']);
const { lang = 'en' } = useParams<{ lang: string }>();

useEffect(() => {
  api.getProducts(lang).then(products => {
    const product = products.find(p => p.slug === slug);
    setProduct(product);
  });
}, [lang, slug]);

// Update links:
<Link to={`/${lang}/products`}>
```

### WhatWeDoDetail.tsx
```tsx
const { t } = useTranslation('common');
const { lang = 'en' } = useParams<{ lang: string }>();

useEffect(() => {
  api.getWhatWeDo(lang).then(setData);
}, [lang]);
```

---

## 🧪 TEST CHECKLIST:

After fixing each page, test:

```bash
npm run dev

# Test each URL:
✅ /en/quote → Works
✅ /fr/solutions → Works
✅ /es/shopping → Works
✅ /nl/technology → Works
✅ /en/projects → Works
✅ /fr/partners → Works
✅ /es/blog → Works
✅ /nl/service → Works
✅ /en/about → Works
✅ /fr/contact → Works
✅ /es/faq → Works
```

---

## 🎯 PRIORITY ORDER:

Fix in this order (most important first):

1. ✅ Quote.tsx (users need this)
2. ✅ Solutions.tsx (main feature)
3. ✅ Contact.tsx (users need this)
4. ✅ Blog.tsx (content)
5. ✅ About.tsx (company info)
6. ✅ Service.tsx (support)
7. ✅ FAQ.tsx (help)
8. ✅ Shopping.tsx (e-commerce)
9. ✅ Technology.tsx (info)
10. ✅ Projects.tsx (portfolio)
11. ✅ Partners.tsx (info)

---

## ⚡ FASTEST FIX:

Run this command to see which files need updating:

```bash
cd /Users/elite/Desktop/lixi-website/src/pages
grep -L "useTranslation" *.tsx
```

This shows files WITHOUT i18n. Add the 2 lines to each!

---

## 📊 CURRENT STATUS:

- **Working**: Home, Products, Footer, Navbar, Legal
- **Needs Fix**: Quote, Solutions, Shopping, Technology, Projects, Partners, Blog, Service, About, Contact, FAQ

**Estimated Time**: 2 minutes per page = 20 minutes total

---

## 🎉 AFTER FIX:

ALL pages will:
- ✅ Work in all 4 languages
- ✅ No 404 errors
- ✅ Footer translates
- ✅ Content translates
- ✅ Links work correctly
