
import api from './api';
import { Category } from '@/lib/data';
import { toast } from 'sonner';

export interface CategoryData {
  id?: number;
  name: string;
  image?: string | File;
  description?: string;
}

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get a single category by ID
  getCategory: async (id: number) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  },

  // Create a new category (admin only)
  createCategory: async (categoryData: CategoryData) => {
    try {
      // Handle form data if there's an image upload
      const formData = new FormData();
      Object.entries(categoryData).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await api.post('/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Catégorie créée avec succès');
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Erreur lors de la création de la catégorie');
      throw error;
    }
  },

  // Update an existing category (admin only)
  updateCategory: async (id: number, categoryData: CategoryData) => {
    try {
      // Handle form data if there's an image upload
      const formData = new FormData();
      formData.append('_method', 'PUT'); // Laravel requires this for PUT requests with FormData
      
      Object.entries(categoryData).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await api.post(`/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Catégorie mise à jour avec succès');
      return response.data;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      toast.error('Erreur lors de la mise à jour de la catégorie');
      throw error;
    }
  },

  // Delete a category (admin only)
  deleteCategory: async (id: number) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      toast.success('Catégorie supprimée avec succès');
      return response.data;
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      toast.error('Erreur lors de la suppression de la catégorie');
      throw error;
    }
  },
};
