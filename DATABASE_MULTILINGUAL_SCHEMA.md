# Database Schema for Multilingual Content

## Update DynamoDB Tables

Add language-specific fields to all content tables:

### Products Table
```javascript
{
  id: "stack-48v",
  // English fields
  name_en: "LIXI Stack 48V",
  description_en: "Premium residential battery system",
  tagline_en: "Residential System",
  
  // French fields
  name_fr: "LIXI Stack 48V",
  description_fr: "Système de batterie résidentiel premium",
  tagline_fr: "Système Résidentiel",
  
  // Spanish fields
  name_es: "LIXI Stack 48V",
  description_es: "Sistema de batería residencial premium",
  tagline_es: "Sistema Residencial",
  
  // Dutch fields
  name_nl: "LIXI Stack 48V",
  description_nl: "Premium residentieel batterijsysteem",
  tagline_nl: "Residentieel Systeem",
  
  // Non-translatable fields
  slug: "stack-48v",
  price: 5999,
  image: "/images/products/stack-48v.jpg"
}
```

### Blog Posts Table
```javascript
{
  id: "post-1",
  slug_en: "lifepo4-vs-nmc",
  slug_fr: "lifepo4-vs-nmc",
  slug_es: "lifepo4-vs-nmc",
  slug_nl: "lifepo4-vs-nmc",
  
  title_en: "LiFePO4 vs NMC: Which Battery Chemistry is Right for You?",
  title_fr: "LiFePO4 vs NMC : Quelle chimie de batterie vous convient ?",
  title_es: "LiFePO4 vs NMC: ¿Qué química de batería es adecuada para ti?",
  title_nl: "LiFePO4 vs NMC: Welke batterijchemie is geschikt voor u?",
  
  content_en: "Full article in English...",
  content_fr: "Article complet en français...",
  content_es: "Artículo completo en español...",
  content_nl: "Volledig artikel in het Nederlands...",
  
  excerpt_en: "Short description...",
  excerpt_fr: "Brève description...",
  excerpt_es: "Breve descripción...",
  excerpt_nl: "Korte beschrijving..."
}
```

### FAQ Table
```javascript
{
  id: "faq-1",
  question_en: "What is the warranty period?",
  question_fr: "Quelle est la période de garantie ?",
  question_es: "¿Cuál es el período de garantía?",
  question_nl: "Wat is de garantieperiode?",
  
  answer_en: "10 years comprehensive warranty...",
  answer_fr: "Garantie complète de 10 ans...",
  answer_es: "Garantía integral de 10 años...",
  answer_nl: "10 jaar uitgebreide garantie..."
}
```

### Hero/CellTech/WhatWeDo Tables
Same pattern - add `_en`, `_fr`, `_es`, `_nl` suffixes to all text fields.

## Backend API Updates

Update API endpoints to accept language parameter:

```javascript
// GET /api/products?lang=fr
// GET /api/blog?lang=es
// GET /api/hero?lang=nl
```
