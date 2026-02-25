# i18n File Structure - Visual Guide

## 📁 Complete Directory Structure

```
lixi-website/
├── src/
│   ├── i18n/
│   │   ├── config.ts          ← Main i18n configuration
│   │   └── index.ts           ← Export file
│   │
│   ├── locales/
│   │   ├── en/                ← English (default)
│   │   │   ├── common.json    ← Navigation, footer, buttons
│   │   │   ├── home.json      ← Home page content
│   │   │   ├── products.json  ← Products page
│   │   │   ├── trading.json   ← Trading page
│   │   │   ├── technology.json
│   │   │   ├── blog.json
│   │   │   ├── faq.json
│   │   │   ├── forms.json     ← Form labels & validation
│   │   │   ├── legal.json
│   │   │   └── solutions.json
│   │   │
│   │   ├── fr/                ← French
│   │   │   ├── common.json
│   │   │   ├── home.json
│   │   │   ├── products.json
│   │   │   ├── trading.json
│   │   │   ├── technology.json
│   │   │   ├── blog.json
│   │   │   ├── faq.json
│   │   │   ├── forms.json
│   │   │   ├── legal.json
│   │   │   └── solutions.json
│   │   │
│   │   ├── es/                ← Spanish
│   │   │   ├── common.json
│   │   │   ├── home.json
│   │   │   ├── products.json
│   │   │   ├── trading.json
│   │   │   ├── technology.json
│   │   │   ├── blog.json
│   │   │   ├── faq.json
│   │   │   ├── forms.json
│   │   │   ├── legal.json
│   │   │   └── solutions.json
│   │   │
│   │   └── nl/                ← Dutch
│   │       ├── common.json
│   │       ├── home.json
│   │       ├── products.json
│   │       ├── trading.json
│   │       ├── technology.json
│   │       ├── blog.json
│   │       ├── faq.json
│   │       ├── forms.json
│   │       ├── legal.json
│   │       └── solutions.json
│   │
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.tsx     ← Updated with i18n
│   │       └── LanguageSwitcher.tsx  ← NEW
│   │
│   ├── App.tsx                ← Updated with language routing
│   └── main.tsx               ← Updated to initialize i18n
│
├── I18N_QUICKSTART.md         ← Start here!
├── I18N_GUIDE.md              ← Comprehensive guide
├── I18N_BEST_PRACTICES.md     ← Scaling guide
├── I18N_IMPLEMENTATION_SUMMARY.md
├── I18N_FILE_STRUCTURE.md     ← This file
└── TRANSLATION_EXAMPLE.md     ← Code examples
```

## 📊 File Count

| Category | Count |
|----------|-------|
| Configuration files | 2 |
| Translation files (EN) | 10 |
| Translation files (FR) | 10 |
| Translation files (ES) | 10 |
| Translation files (NL) | 10 |
| Components | 1 new |
| Modified files | 3 |
| Documentation | 6 |
| **TOTAL** | **52 files** |

## 🎯 Key Files Explained

### Configuration

**`src/i18n/config.ts`**
- Initializes i18next
- Defines supported languages
- Defines namespaces
- Imports all translations
- Configures language detection

**`src/i18n/index.ts`**
- Re-exports config
- Simplifies imports

### Translation Files

Each language has 10 namespace files:

1. **common.json** - Shared UI elements
   - Navigation menu
   - Footer content
   - Buttons
   - Units (kWh, V, Ah)
   - 404 page

2. **home.json** - Home page
   - Hero section
   - Value propositions
   - Solutions overview
   - CTA section
   - Partners section

3. **products.json** - Products
   - Product listings
   - Specifications
   - Filters
   - Comparison table

4. **trading.json** - Trading page
   - CARBONOZ platform
   - Live prices
   - How it works
   - Benefits

5. **technology.json** - Technology
   - Battery cell info
   - Solar integration
   - Inverter flow

6. **blog.json** - Blog
   - Post listings
   - Categories
   - Reading time

7. **faq.json** - FAQ
   - Questions
   - Search
   - Categories

8. **forms.json** - Forms
   - Contact form
   - Quote form
   - Newsletter
   - Validation messages

9. **legal.json** - Legal pages
   - Privacy policy
   - Terms of service

10. **solutions.json** - Solutions
    - Residential
    - Commercial
    - Industrial

### Components

**`src/components/layout/LanguageSwitcher.tsx`**
- Globe icon button
- Language dropdown
- Handles language switching
- Updates URL with language prefix

### Modified Files

**`src/App.tsx`**
- Added language routing (`:lang` parameter)
- Redirect root to `/en/`
- Wrapped routes with LanguageWrapper

**`src/main.tsx`**
- Import i18n configuration
- Initialize before React render

**`src/components/layout/Navbar.tsx`**
- Import useTranslation
- Replace hardcoded text with t()
- Add LanguageSwitcher component
- Update links with language prefix

## 🗂️ Namespace Organization

```
common/
├── nav.*           → Navigation menu items
├── footer.*        → Footer sections & links
├── buttons.*       → All button labels
├── common.*        → Generic UI text
├── units.*         → Measurement units
└── 404.*           → Not found page

home/
├── hero.*          → Hero section
├── valueProps.*    → Value propositions
├── solutions.*     → Solutions overview
├── products.*      → Products section
├── cellTech.*      → CATL cell technology
├── cta.*           → Call-to-action
└── partners.*      → Partners section

products/
├── title, subtitle, description
├── filters.*       → Category filters
├── specs.*         → Technical specifications
├── features.*      → Key features
└── comparison.*    → Product comparison

forms/
├── contact.*       → Contact form
├── quote.*         → Quote request form
├── newsletter.*    → Newsletter signup
└── validation.*    → Form validation messages

... (and 6 more namespaces)
```

## 📝 Translation File Example

**`src/locales/en/common.json`**
```json
{
  "nav": {
    "products": "Products",
    "solutions": "Solutions",
    "about": "About"
  },
  "buttons": {
    "getStarted": "Get Started",
    "learnMore": "Learn More"
  }
}
```

**`src/locales/fr/common.json`**
```json
{
  "nav": {
    "products": "Produits",
    "solutions": "Solutions",
    "about": "À Propos"
  },
  "buttons": {
    "getStarted": "Commencer",
    "learnMore": "En Savoir Plus"
  }
}
```

## 🔍 Finding Files

### To edit translations:
```bash
# English
src/locales/en/[namespace].json

# French
src/locales/fr/[namespace].json

# Spanish
src/locales/es/[namespace].json

# Dutch
src/locales/nl/[namespace].json
```

### To add new language:
```bash
# 1. Create folder
mkdir src/locales/de

# 2. Copy English files
cp src/locales/en/*.json src/locales/de/

# 3. Update config
# Edit src/i18n/config.ts
```

### To modify configuration:
```bash
src/i18n/config.ts
```

### To update language switcher:
```bash
src/components/layout/LanguageSwitcher.tsx
```

## 🎨 Visual Flow

```
User visits site
       ↓
URL: /en/products
       ↓
App.tsx detects :lang param
       ↓
i18n.changeLanguage('en')
       ↓
Loads en/products.json
       ↓
Component uses t('products:title')
       ↓
Displays: "Battery Systems"

User clicks language switcher
       ↓
Selects "FR"
       ↓
LanguageSwitcher updates URL
       ↓
URL: /fr/products
       ↓
i18n.changeLanguage('fr')
       ↓
Loads fr/products.json
       ↓
Component re-renders
       ↓
Displays: "Systèmes de Batteries"
```

## 📦 Bundle Structure

```
dist/
├── assets/
│   ├── index-[hash].js        ← Main bundle
│   │   ├── React
│   │   ├── Router
│   │   ├── i18next
│   │   └── All translations (EN, FR, ES, NL)
│   └── index-[hash].css
└── index.html
```

**Size:** ~50KB for all translations (gzipped)

## 🚀 Quick Access

| Task | File |
|------|------|
| Add translation | `src/locales/[lang]/[namespace].json` |
| Change config | `src/i18n/config.ts` |
| Update switcher | `src/components/layout/LanguageSwitcher.tsx` |
| Modify routing | `src/App.tsx` |
| Read docs | `I18N_QUICKSTART.md` |

---

**Built with ⚡ by LIXI Energy Systems**
