
import api from './api';
import { Product } from '@/lib/data';
import { toast } from 'sonner';

export interface ProductData {
  id?: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image?: string | File;
  inventory_count?: number;
  is_featured?: boolean;
  is_new?: boolean;
}

export const productService = {
  // Get all products with optional filters
  getProducts: async (filters?: Record<string, any>) => {
    try {
      const response = await api.get('/products', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get a single product by ID
  getProduct: async (id: number) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId: number) => {
    try {
      const response = await api.get(`/categories/${categoryId}/products`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      throw error;
    }
  },
  
  // Create a new product (admin/seller only)
  createProduct: async (productData: ProductData) => {
    try {
      // Handle form data if there's an image upload
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (value !== undefined) {
          if (typeof value === 'boolean') {
            formData.append(key, value ? '1' : '0');
          } else {
            formData.append(key, value);
          }
        }
      });

      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Produit créé avec succès');
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Erreur lors de la création du produit');
      throw error;
    }
  },

  // Update an existing product (admin/seller only)
  updateProduct: async (id: number, productData: ProductData) => {
    try {
      // Handle form data if there's an image upload
      const formData = new FormData();
      formData.append('_method', 'PUT'); // Laravel requires this for PUT requests with FormData
      
      Object.entries(productData).forEach(([key, value]) => {
        if (value !== undefined) {
          if (typeof value === 'boolean') {
            formData.append(key, value ? '1' : '0');
          } else {
            formData.append(key, value);
          }
        }
      });

      const response = await api.post(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Produit mis à jour avec succès');
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      toast.error('Erreur lors de la mise à jour du produit');
      throw error;
    }
  },

  // Delete a product (admin/seller only)
  deleteProduct: async (id: number) => {
    try {
      const response = await api.delete(`/products/${id}`);
      toast.success('Produit supprimé avec succès');
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      toast.error('Erreur lors de la suppression du produit');
      throw error;
    }
  },

  // Get featured products
  getFeaturedProducts: async () => {
    try {
      const response = await api.get('/products', { params: { is_featured: true } });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  // Get new products
  getNewProducts: async () => {
    try {
      const response = await api.get('/products', { params: { is_new: true } });
      return response.data;
    } catch (error) {
      console.error('Error fetching new products:', error);
      throw error;
    }
  },
};
