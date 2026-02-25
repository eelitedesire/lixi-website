import { useState } from 'react';
import TranslationInputWithAuto from '@/components/admin/TranslationInputWithAuto';
import { adminApi } from '@/services/api';

/**
 * UNIVERSAL TRANSLATION EXAMPLES
 * Use TranslationInputWithAuto for ANY content type
 */

// ============================================
// 1. PRODUCTS
// ============================================
export function ProductForm() {
  const [formData, setFormData] = useState({
    name_en: '', name_fr: '', name_es: '', name_nl: '', name_de: '',
    description_en: '', description_fr: '', description_es: '', description_nl: '', description_de: '',
    tagline_en: '', tagline_fr: '', tagline_es: '', tagline_nl: '', tagline_de: '',
    price: '', image: '',
  });

  const handleChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({ ...prev, [`${field}_${lang}`]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); adminApi.create('products', formData); }}>
      <TranslationInputWithAuto field="name" label="Product Name" value={formData} onChange={handleChange} required enableAutoTranslate />
      <TranslationInputWithAuto field="tagline" label="Tagline" value={formData} onChange={handleChange} enableAutoTranslate />
      <TranslationInputWithAuto field="description" label="Description" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <button type="submit">Save Product</button>
    </form>
  );
}

// ============================================
// 2. BLOG POSTS
// ============================================
export function BlogForm() {
  const [formData, setFormData] = useState({
    title_en: '', title_fr: '', title_es: '', title_nl: '', title_de: '',
    excerpt_en: '', excerpt_fr: '', excerpt_es: '', excerpt_nl: '', excerpt_de: '',
    content_en: '', content_fr: '', content_es: '', content_nl: '', content_de: '',
    category: '', author: '', date: '',
  });

  const handleChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({ ...prev, [`${field}_${lang}`]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); adminApi.create('blog', formData); }}>
      <TranslationInputWithAuto field="title" label="Blog Title" value={formData} onChange={handleChange} required enableAutoTranslate />
      <TranslationInputWithAuto field="excerpt" label="Excerpt" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <TranslationInputWithAuto field="content" label="Content" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <button type="submit">Save Blog Post</button>
    </form>
  );
}

// ============================================
// 3. PROJECTS
// ============================================
export function ProjectForm() {
  const [formData, setFormData] = useState({
    title_en: '', title_fr: '', title_es: '', title_nl: '', title_de: '',
    description_en: '', description_fr: '', description_es: '', description_nl: '', description_de: '',
    location: '', capacity: '', year: '', category: '',
  });

  const handleChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({ ...prev, [`${field}_${lang}`]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); adminApi.create('projects', formData); }}>
      <TranslationInputWithAuto field="title" label="Project Title" value={formData} onChange={handleChange} required enableAutoTranslate />
      <TranslationInputWithAuto field="description" label="Description" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <button type="submit">Save Project</button>
    </form>
  );
}

// ============================================
// 4. PARTNERS
// ============================================
export function PartnerForm() {
  const [formData, setFormData] = useState({
    name_en: '', name_fr: '', name_es: '', name_nl: '', name_de: '',
    description_en: '', description_fr: '', description_es: '', description_nl: '', description_de: '',
    logo: '', website: '',
  });

  const handleChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({ ...prev, [`${field}_${lang}`]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); adminApi.create('partners', formData); }}>
      <TranslationInputWithAuto field="name" label="Partner Name" value={formData} onChange={handleChange} required enableAutoTranslate />
      <TranslationInputWithAuto field="description" label="Description" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <button type="submit">Save Partner</button>
    </form>
  );
}

// ============================================
// 5. HERO SECTION
// ============================================
export function HeroForm() {
  const [formData, setFormData] = useState({
    title_en: '', title_fr: '', title_es: '', title_nl: '', title_de: '',
    subtitle_en: '', subtitle_fr: '', subtitle_es: '', subtitle_nl: '', subtitle_de: '',
    description_en: '', description_fr: '', description_es: '', description_nl: '', description_de: '',
    ctaText_en: '', ctaText_fr: '', ctaText_es: '', ctaText_nl: '', ctaText_de: '',
    ctaUrl: '', backgroundImage: '',
  });

  const handleChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({ ...prev, [`${field}_${lang}`]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); adminApi.create('hero', formData); }}>
      <TranslationInputWithAuto field="title" label="Hero Title" value={formData} onChange={handleChange} required enableAutoTranslate />
      <TranslationInputWithAuto field="subtitle" label="Subtitle" value={formData} onChange={handleChange} enableAutoTranslate />
      <TranslationInputWithAuto field="description" label="Description" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <TranslationInputWithAuto field="ctaText" label="Button Text" value={formData} onChange={handleChange} enableAutoTranslate />
      <button type="submit">Save Hero</button>
    </form>
  );
}

// ============================================
// 6. SERVICES
// ============================================
export function ServiceForm() {
  const [formData, setFormData] = useState({
    name_en: '', name_fr: '', name_es: '', name_nl: '', name_de: '',
    description_en: '', description_fr: '', description_es: '', description_nl: '', description_de: '',
    features_en: '', features_fr: '', features_es: '', features_nl: '', features_de: '',
    price: '', region: '',
  });

  const handleChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({ ...prev, [`${field}_${lang}`]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); adminApi.create('services', formData); }}>
      <TranslationInputWithAuto field="name" label="Service Name" value={formData} onChange={handleChange} required enableAutoTranslate />
      <TranslationInputWithAuto field="description" label="Description" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <TranslationInputWithAuto field="features" label="Features" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <button type="submit">Save Service</button>
    </form>
  );
}

// ============================================
// 7. SOLUTIONS
// ============================================
export function SolutionForm() {
  const [formData, setFormData] = useState({
    title_en: '', title_fr: '', title_es: '', title_nl: '', title_de: '',
    description_en: '', description_fr: '', description_es: '', description_nl: '', description_de: '',
    benefits_en: '', benefits_fr: '', benefits_es: '', benefits_nl: '', benefits_de: '',
    type: '', capacity: '',
  });

  const handleChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({ ...prev, [`${field}_${lang}`]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); adminApi.create('solutions', formData); }}>
      <TranslationInputWithAuto field="title" label="Solution Title" value={formData} onChange={handleChange} required enableAutoTranslate />
      <TranslationInputWithAuto field="description" label="Description" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <TranslationInputWithAuto field="benefits" label="Benefits" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <button type="submit">Save Solution</button>
    </form>
  );
}

// ============================================
// 8. FAQ
// ============================================
export function FAQForm() {
  const [formData, setFormData] = useState({
    question_en: '', question_fr: '', question_es: '', question_nl: '', question_de: '',
    answer_en: '', answer_fr: '', answer_es: '', answer_nl: '', answer_de: '',
    category: '',
  });

  const handleChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({ ...prev, [`${field}_${lang}`]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); adminApi.create('faq', formData); }}>
      <TranslationInputWithAuto field="question" label="Question" value={formData} onChange={handleChange} required enableAutoTranslate />
      <TranslationInputWithAuto field="answer" label="Answer" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <button type="submit">Save FAQ</button>
    </form>
  );
}

// ============================================
// 9. ABOUT PAGE
// ============================================
export function AboutForm() {
  const [formData, setFormData] = useState({
    title_en: '', title_fr: '', title_es: '', title_nl: '', title_de: '',
    subtitle_en: '', subtitle_fr: '', subtitle_es: '', subtitle_nl: '', subtitle_de: '',
    mission_en: '', mission_fr: '', mission_es: '', mission_nl: '', mission_de: '',
    vision_en: '', vision_fr: '', vision_es: '', vision_nl: '', vision_de: '',
  });

  const handleChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({ ...prev, [`${field}_${lang}`]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); adminApi.create('about', formData); }}>
      <TranslationInputWithAuto field="title" label="Title" value={formData} onChange={handleChange} required enableAutoTranslate />
      <TranslationInputWithAuto field="subtitle" label="Subtitle" value={formData} onChange={handleChange} enableAutoTranslate />
      <TranslationInputWithAuto field="mission" label="Mission" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <TranslationInputWithAuto field="vision" label="Vision" value={formData} onChange={handleChange} type="textarea" enableAutoTranslate />
      <button type="submit">Save About</button>
    </form>
  );
}

/**
 * USAGE PATTERN (Same for ALL content types):
 * 
 * 1. Add translation fields to state: name_en, name_fr, name_es, name_nl, name_de
 * 2. Use TranslationInputWithAuto component
 * 3. Set enableAutoTranslate={true}
 * 4. User enters English, clicks "Auto-Translate"
 * 5. All languages filled automatically
 * 6. Save to database
 * 7. Frontend displays correct language based on URL
 */
