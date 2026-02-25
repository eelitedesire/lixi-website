/**
 * Helper to add translation fields to your existing data
 * 
 * USAGE IN ADMIN:
 * When you edit a product/blog/etc in admin, the form should have:
 * - name_en (English - required)
 * - name_fr (French - optional)
 * - name_es (Spanish - optional)
 * - name_nl (Dutch - optional)
 * - name_de (German - optional)
 * 
 * Same for description, title, tagline, etc.
 */

export const TRANSLATION_INSTRUCTIONS = `
To make your content translatable:

1. In your database/admin, add these fields for each translatable item:
   - name_en, name_fr, name_es, name_nl, name_de
   - description_en, description_fr, description_es, description_nl, description_de
   - title_en, title_fr, title_es, title_nl, title_de
   - tagline_en, tagline_fr, tagline_es, tagline_nl, tagline_de

2. The system will automatically:
   - Show the correct language based on URL (/fr/products, /de/products, etc.)
   - Fall back to English if translation is missing
   - Work with the useTranslatedData hook

3. For now, you can:
   - Keep English content in the base fields (name, description)
   - Add translation fields gradually
   - The site will work in English until translations are added
`;

console.log(TRANSLATION_INSTRUCTIONS);
