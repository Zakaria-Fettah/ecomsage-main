
import api from './api';
import { toast } from 'sonner';

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  total: number;
}

export const cartService = {
  // Get user's cart
  getCart: async () => {
    try {
      const response = await api.get<Cart>('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (productId: number, quantity: number) => {
    try {
      const response = await api.post('/cart/items', { product_id: productId, quantity });
      toast.success('Produit ajouté au panier');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de l\'ajout au panier';
      toast.error(message);
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId: number, quantity: number) => {
    try {
      const response = await api.put(`/cart/items/${itemId}`, { quantity });
      toast.success('Panier mis à jour');
      return response.data;
    } catch (error) {
      console.error(`Error updating cart item ${itemId}:`, error);
      toast.error('Erreur lors de la mise à jour du panier');
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId: number) => {
    try {
      const response = await api.delete(`/cart/items/${itemId}`);
      toast.success('Produit retiré du panier');
      return response.data;
    } catch (error) {
      console.error(`Error removing cart item ${itemId}:`, error);
      toast.error('Erreur lors de la suppression du produit du panier');
      throw error;
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const response = await api.delete('/cart');
      toast.success('Panier vidé');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Erreur lors du vidage du panier');
      throw error;
    }
  },
};
