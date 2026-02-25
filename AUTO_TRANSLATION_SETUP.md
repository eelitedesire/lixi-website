# Automatic Database Translation Setup

## Overview
Your database content will now be automatically translated when you save it in the admin panel.

## Setup Options

### Option 1: LibreTranslate (Free, Open Source)

1. **Use Public Instance** (easiest):
   - Already configured to use `https://libretranslate.com/translate`
   - No API key needed
   - Rate limited (slower)

2. **Self-Host** (recommended for production):
   ```bash
   docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
   ```
   
   Then add to `.env`:
   ```env
   VITE_TRANSLATE_API_URL=http://localhost:5000/translate
   ```

### Option 2: Google Translate API (Paid, Best Quality)

1. **Get API Key**:
   - Go to https://console.cloud.google.com
   - Enable "Cloud Translation API"
   - Create API key

2. **Add to `.env`**:
   ```env
   VITE_GOOGLE_TRANSLATE_API_KEY=your-api-key-here
   ```

3. **Update translation service** to use Google instead of LibreTranslate

## Usage in Admin Panel

### Example: Product Form

```tsx
import TranslationInputWithAuto from '@/components/admin/TranslationInputWithAuto';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name_en: '',
    name_fr: '',
    name_es: '',
    name_nl: '',
    name_de: '',
    description_en: '',
    description_fr: '',
    description_es: '',
    description_nl: '',
    description_de: '',
  });

  const handleTranslationChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`${field}_${lang}`]: value
    }));
  };

  return (
    <form>
      {/* Product Name - with auto-translate button */}
      <TranslationInputWithAuto
        field="name"
        label="Product Name"
        value={formData}
        onChange={handleTranslationChange}
        required
        enableAutoTranslate={true}
      />

      {/* Description - with auto-translate button */}
      <TranslationInputWithAuto
        field="description"
        label="Description"
        value={formData}
        onChange={handleTranslationChange}
        type="textarea"
        enableAutoTranslate={true}
      />

      <button type="submit">Save Product</button>
    </form>
  );
};
```

## How It Works

1. **User enters English text** in the form
2. **Clicks "Auto-Translate" button**
3. **System automatically translates** to FR, ES, NL, DE
4. **All fields are populated** with translations
5. **User can edit** any translation if needed
6. **Save to database** with all language fields

## Batch Translation

To translate existing database content:

```tsx
import { batchTranslate } from '@/services/translationService';

// Translate all products
const products = await api.getProducts();
const translated = await batchTranslate(products, ['name', 'description', 'tagline']);

// Save back to database
for (const product of translated) {
  await api.updateProduct(product);
}
```

## Environment Variables

Add to `.env`:

```env
# LibreTranslate (free)
VITE_TRANSLATE_API_URL=https://libretranslate.com/translate
VITE_TRANSLATE_API_KEY=  # Optional, for self-hosted

# OR Google Translate (paid, better quality)
VITE_GOOGLE_TRANSLATE_API_KEY=your-google-api-key
```

## Translation Quality

- **LibreTranslate**: Good for basic translations, free
- **Google Translate**: Best quality, costs ~$20 per 1M characters
- **Manual editing**: Always review and edit translations for accuracy

## Supported Languages

- 🇬🇧 English (en) - Source language
- 🇫🇷 French (fr)
- 🇪🇸 Spanish (es)
- 🇳🇱 Dutch (nl)
- 🇩🇪 German (de)

## Next Steps

1. Add `.env` file with translation API settings
2. Update admin forms to use `TranslationInputWithAuto`
3. Enter English content and click "Auto-Translate"
4. Review and edit translations
5. Save to database

Your content will now automatically appear in the correct language based on the URL!
