import { useState } from 'react';
import TranslationInputWithAuto from '@/components/admin/TranslationInputWithAuto';
import { adminApi } from '@/services/api';

export default function ProductEditFormExample() {
  const [formData, setFormData] = useState({
    id: '',
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
    price: '',
  });

  const handleTranslationChange = (field: string, lang: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`${field}_${lang}`]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminApi.update('products', formData);
    alert('Product saved!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <TranslationInputWithAuto
        field="name"
        label="Product Name"
        value={formData}
        onChange={handleTranslationChange}
        required
        enableAutoTranslate={true}
      />

      <TranslationInputWithAuto
        field="description"
        label="Description"
        value={formData}
        onChange={handleTranslationChange}
        type="textarea"
        enableAutoTranslate={true}
      />

      <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-md">
        Save Product
      </button>
    </form>
  );
}
