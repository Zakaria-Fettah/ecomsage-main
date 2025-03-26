
import api from './api';
import { toast } from 'sonner';

export interface OrderItem {
  id: number;
  product_id: number;
  order_id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    image: string;
  };
}

export interface Order {
  id: number;
  user_id: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  total: number;
  payment_status: 'pending' | 'paid' | 'failed';
  shipping_address: string;
  billing_address: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface OrderData {
  shipping_address: string;
  billing_address?: string;
  payment_method: string;
  notes?: string;
}

export const orderService = {
  // Get all orders for the current user
  getOrders: async () => {
    try {
      const response = await api.get<Order[]>('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get a specific order by ID
  getOrder: async (id: number) => {
    try {
      const response = await api.get<Order>(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  },

  // Create a new order from the current cart
  createOrder: async (orderData: OrderData) => {
    try {
      const response = await api.post<Order>('/orders', orderData);
      toast.success('Commande passée avec succès!');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de la création de la commande';
      toast.error(message);
      throw error;
    }
  },

  // Cancel an order (if possible)
  cancelOrder: async (id: number) => {
    try {
      const response = await api.put<Order>(`/orders/${id}/cancel`);
      toast.success('Commande annulée');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Impossible d\'annuler cette commande';
      toast.error(message);
      throw error;
    }
  },

  // Admin/Seller: Update order status
  updateOrderStatus: async (id: number, status: Order['status']) => {
    try {
      const response = await api.put<Order>(`/orders/${id}/status`, { status });
      toast.success('Statut de la commande mis à jour');
      return response.data;
    } catch (error) {
      console.error(`Error updating order status ${id}:`, error);
      toast.error('Erreur lors de la mise à jour du statut');
      throw error;
    }
  },
};
