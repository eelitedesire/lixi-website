# Automatic Translation System

## Overview
The website now supports 5 languages: English (en), French (fr), Spanish (es), Dutch (nl), and German (de).

## How It Works

### 1. Database Structure
Store content with language-specific fields:
```json
{
  "id": "product-1",
  "name_en": "Battery Pack",
  "name_fr": "Pack de Batterie",
  "name_es": "Paquete de Batería",
  "name_nl": "Batterijpakket",
  "name_de": "Batteriepaket",
  "description_en": "High capacity battery",
  "description_fr": "Batterie haute capacité",
  "description_es": "Batería de alta capacidad",
  "description_nl": "Batterij met hoge capaciteit",
  "description_de": "Hochkapazitätsbatterie"
}
```

### 2. Frontend Usage

#### Automatic Translation Hook
Use `useTranslatedData` to automatically translate arrays or objects:

```tsx
import { useTranslatedData } from '@/hooks/useTranslatedData';

const MyComponent = () => {
  const [products, setProducts] = useState([]);
  
  // Automatically translates name, title, description, tagline
  const translatedProducts = useTranslatedData(products);
  
  // Or specify custom fields
  const translatedProducts = useTranslatedData(products, ['name', 'description', 'features']);
  
  return (
    <div>
      {translatedProducts.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};
```

#### Manual Translation
Use `getTranslatedField` for individual fields:

```tsx
import { getTranslatedField } from '@/utils/i18n';
import { useTranslation } from 'react-i18next';

const MyComponent = ({ product }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];
  
  const name = getTranslatedField(product, 'name', currentLang);
  
  return <h2>{name}</h2>;
};
```

### 3. Admin Panel Usage

#### Using TranslationInput Component
```tsx
import TranslationInput from '@/components/admin/TranslationInput';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name_en: '',
    name_fr: '',
    name_es: '',
    name_nl: '',
    name_de: '',
  });
  
  const handleTranslationChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`${field}_${lang}`]: value
    }));
  };
  
  return (
    <form>
      <TranslationInput
        field="name"
        label="Product Name"
        value={formData}
        onChange={handleTranslationChange}
        required
      />
      
      <TranslationInput
        field="description"
        label="Description"
        value={formData}
        onChange={handleTranslationChange}
        type="textarea"
      />
    </form>
  );
};
```

#### Helper Functions
```tsx
import { makeTranslatable, generateTranslationFields } from '@/utils/translationHelpers';

// Convert existing data to translatable format
const oldProduct = { name: 'Battery', description: 'High capacity' };
const newProduct = makeTranslatable(oldProduct, ['name', 'description']);
// Result: { name_en: 'Battery', name_fr: '', name_es: '', name_nl: '', name_de: '', ... }

// Get all translation field names
const fields = generateTranslationFields('title');
// Result: ['title_en', 'title_fr', 'title_es', 'title_nl', 'title_de']
```

## Translatable Fields

Common fields that should have translations:
- `name` - Product/item names
- `title` - Page/section titles
- `description` - Descriptions
- `tagline` - Short taglines
- `content` - Long-form content
- `category` - Category names
- `features` - Feature descriptions

## Fallback Behavior

1. If a translation for the current language doesn't exist, it falls back to English
2. If English doesn't exist, it uses the base field (without language suffix)
3. English translations are required, others are optional

## Language Codes

- `en` - English (default)
- `fr` - French
- `es` - Spanish
- `nl` - Dutch
- `de` - German

## API Integration

All API endpoints support the `lang` parameter:
```
GET /api/products?lang=fr
GET /api/blog?lang=de
GET /api/services?lang=es
```

The backend should return data with the appropriate language fields populated.
