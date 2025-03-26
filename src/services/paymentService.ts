
import api from './api';
import { toast } from 'sonner';

export interface PaymentData {
  order_id: number;
  payment_method: 'credit_card' | 'paypal' | 'stripe';
  amount: number;
  currency?: string;
  // For credit card payments
  card_number?: string;
  expiration_month?: string;
  expiration_year?: string;
  cvv?: string;
  // Stripe-specific
  stripe_token?: string;
  // PayPal-specific
  paypal_order_id?: string;
}

export interface Payment {
  id: number;
  order_id: number;
  user_id: number;
  amount: number;
  currency: string;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed';
  transaction_id: string;
  created_at: string;
  updated_at: string;
}

export const paymentService = {
  // Process a payment for an order
  processPayment: async (paymentData: PaymentData) => {
    try {
      const response = await api.post<Payment>('/payments', paymentData);
      toast.success('Paiement effectué avec succès');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors du paiement';
      toast.error(message);
      throw error;
    }
  },

  // Get payment history for the current user
  getPaymentHistory: async () => {
    try {
      const response = await api.get<Payment[]>('/payments/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error;
    }
  },

  // Get a specific payment by ID
  getPayment: async (id: number) => {
    try {
      const response = await api.get<Payment>(`/payments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching payment ${id}:`, error);
      throw error;
    }
  },

  // Process a Stripe payment (assuming you're using Stripe)
  processStripePayment: async (orderId: number, stripeToken: string, amount: number) => {
    try {
      const response = await api.post<Payment>('/payments/stripe', {
        order_id: orderId,
        stripe_token: stripeToken,
        amount: amount
      });
      toast.success('Paiement effectué avec succès');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors du paiement Stripe';
      toast.error(message);
      throw error;
    }
  },

  // Get Stripe public key
  getStripePublicKey: async () => {
    try {
      const response = await api.get('/payments/stripe/public-key');
      return response.data.publicKey;
    } catch (error) {
      console.error('Error fetching Stripe public key:', error);
      throw error;
    }
  }
};
