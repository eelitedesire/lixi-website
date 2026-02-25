# Complete Multilingual Implementation Guide

## ✅ WHAT'S IMPLEMENTED

### 1. Static Content (UI Text) ✅
- Navbar, Footer, Buttons
- Home page sections
- All translation files (EN, FR, ES, NL)

### 2. Database Content (Admin-Added) 🔄
- Products, Blog Posts, FAQ
- Hero sections, Partners
- Solutions, Services, About

---

## 🚀 HOW TO MAKE DATABASE CONTENT MULTILINGUAL

### Step 1: Update Database Schema

Add language-specific fields to DynamoDB tables:

**Before:**
```json
{
  "id": "product-1",
  "name": "LIXI Stack 48V",
  "description": "Premium battery system"
}
```

**After:**
```json
{
  "id": "product-1",
  "name_en": "LIXI Stack 48V",
  "name_fr": "LIXI Stack 48V",
  "name_es": "LIXI Stack 48V",
  "name_nl": "LIXI Stack 48V",
  "description_en": "Premium battery system",
  "description_fr": "Système de batterie premium",
  "description_es": "Sistema de batería premium",
  "description_nl": "Premium batterijsysteem"
}
```

### Step 2: Update Admin Forms

Modify admin panels to have tabs for each language:

```tsx
// Example: ProductEditor.tsx
<Tabs>
  <Tab label="🇬🇧 English">
    <Input name="name_en" label="Product Name (EN)" />
    <Textarea name="description_en" label="Description (EN)" />
  </Tab>
  <Tab label="🇫🇷 Français">
    <Input name="name_fr" label="Nom du Produit (FR)" />
    <Textarea name="description_fr" label="Description (FR)" />
  </Tab>
  <Tab label="🇪🇸 Español">
    <Input name="name_es" label="Nombre del Producto (ES)" />
    <Textarea name="description_es" label="Descripción (ES)" />
  </Tab>
  <Tab label="🇳🇱 Nederlands">
    <Input name="name_nl" label="Productnaam (NL)" />
    <Textarea name="description_nl" label="Beschrijving (NL)" />
  </Tab>
</Tabs>
```

### Step 3: Update Backend API

Modify `backend/server.js` to return translated content:

```javascript
app.get('/api/products', async (req, res) => {
  const lang = req.query.lang || 'en';
  const products = await getProducts();
  
  // Transform each product
  const translated = products.map(p => ({
    ...p,
    name: p[`name_${lang}`] || p.name_en,
    description: p[`description_${lang}`] || p.description_en,
    tagline: p[`tagline_${lang}`] || p.tagline_en
  }));
  
  res.json(translated);
});
```

### Step 4: Frontend Fetches Translated Data

Already implemented! API calls now include language:

```tsx
// Home.tsx
useEffect(() => {
  api.getHero(lang).then(data => setHero(data[0]));
  api.getProducts(lang).then(data => setProducts(data));
  api.getBlogPosts(lang).then(data => setPosts(data));
}, [lang]);
```

---

## 📋 TABLES TO UPDATE

### Priority 1 (Visible on Home Page)
- ✅ `hero` - Hero section content
- ✅ `celltech` - CATL technology section
- ✅ `whatwedo` - Solutions cards
- ✅ `partners` - Partner descriptions
- ✅ `video` - Video showcase

### Priority 2 (Product Pages)
- ⏳ `products` - Product names, descriptions, features
- ⏳ `product-categories` - Category names

### Priority 3 (Content Pages)
- ⏳ `blog` - Blog post titles, content, excerpts
- ⏳ `solutions` - Solution descriptions
- ⏳ `services` - Service descriptions
- ⏳ `about` - About page content

### Priority 4 (Other)
- ⏳ `projects` - Project descriptions
- ⏳ `footer` - Footer sections
- ⏳ `sitesettings` - Site-wide settings

---

## 🔧 QUICK START (For Testing)

### Option A: Manual Database Update

1. Open DynamoDB console
2. Find `lixi-hero` table
3. Edit item, add fields:
```json
{
  "badge_fr": "Solutions Énergétiques d'Entreprise",
  "title_fr": "LIXI Solaire &",
  "titleHighlight_fr": "Stockage d'Électricité",
  "description_fr": "Découvrez la puissance..."
}
```

### Option B: Use Seed Script

```bash
cd backend
node seed-multilingual.js
```

This will populate all tables with sample translations.

---

## 📝 ADMIN WORKFLOW

When admin adds new content:

1. **Create Product** (Admin Panel)
   - Fill English fields (required)
   - Fill French fields (optional)
   - Fill Spanish fields (optional)
   - Fill Dutch fields (optional)

2. **Save to Database**
   - All language fields saved
   - Missing translations fall back to English

3. **Frontend Display**
   - User selects language
   - API fetches with `?lang=fr`
   - Backend returns French fields
   - Falls back to English if missing

---

## 🎯 TRANSLATION PRIORITY

### Must Translate
- Product names & descriptions
- Hero section
- CTA buttons
- Navigation items

### Should Translate
- Blog post titles & excerpts
- Solution descriptions
- Service descriptions
- FAQ questions & answers

### Can Skip
- Technical specifications (voltage, capacity)
- Product codes/SKUs
- Email addresses
- Phone numbers

---

## 🔄 MIGRATION STEPS

### 1. Backup Current Data
```bash
aws dynamodb scan --table-name lixi-products > backup-products.json
```

### 2. Add Language Fields
```bash
node backend/migrate-add-language-fields.js
```

### 3. Populate Translations
- Use Google Translate API
- Or manually translate in admin panel
- Or hire professional translators

### 4. Update Backend
```bash
cd backend
npm install
# Update server.js with language support
node server.js
```

### 5. Test
```bash
# Test API
curl http://localhost:3000/api/products?lang=fr

# Test Frontend
npm run dev
# Visit /fr and verify content changes
```

---

## 📊 EXAMPLE: Complete Product Translation

```json
{
  "id": "stack-48v",
  "slug": "stack-48v",
  
  "name_en": "LIXI Stack 48V",
  "name_fr": "LIXI Stack 48V",
  "name_es": "LIXI Stack 48V",
  "name_nl": "LIXI Stack 48V",
  
  "tagline_en": "Residential System",
  "tagline_fr": "Système Résidentiel",
  "tagline_es": "Sistema Residencial",
  "tagline_nl": "Residentieel Systeem",
  
  "description_en": "Premium 14kWh battery system for homes",
  "description_fr": "Système de batterie premium de 14kWh pour maisons",
  "description_es": "Sistema de batería premium de 14kWh para hogares",
  "description_nl": "Premium 14kWh batterijsysteem voor woningen",
  
  "features_en": ["8000+ cycles", "CATL cells", "10-year warranty"],
  "features_fr": ["8000+ cycles", "Cellules CATL", "Garantie 10 ans"],
  "features_es": ["8000+ ciclos", "Celdas CATL", "Garantía de 10 años"],
  "features_nl": ["8000+ cycli", "CATL cellen", "10 jaar garantie"],
  
  "price": 5999,
  "voltage": "48V",
  "capacity_kwh": 14,
  "image": "/images/products/stack-48v.jpg"
}
```

---

## ✅ TESTING CHECKLIST

- [ ] Switch to French → Hero text changes
- [ ] Switch to Spanish → Product names change
- [ ] Switch to Dutch → Blog titles change
- [ ] Admin adds product → All languages saved
- [ ] Missing translation → Falls back to English
- [ ] API returns correct language
- [ ] All pages translate (not just Home)

---

## 🚀 DEPLOYMENT

1. Update database schema
2. Deploy backend with language support
3. Frontend already supports it!
4. Train admin users on multilingual forms

---

**Status:** Frontend ready ✅ | Backend needs update ⏳ | Database needs migration ⏳
