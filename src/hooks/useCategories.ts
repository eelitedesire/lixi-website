import { useState, useEffect } from 'react';
import { ProductCategory, defaultCategories } from '@/data/productCategories';
import { adminApi } from '@/services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState<ProductCategory[]>(defaultCategories);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await adminApi.list('product-categories');
        const catData = data.find((item: any) => item.id === 'categories-data');
        if (catData?.categories) setCategories(catData.categories);
      } catch {
        setCategories(defaultCategories);
      }
    };
    loadCategories();
  }, []);

  return categories;
};
