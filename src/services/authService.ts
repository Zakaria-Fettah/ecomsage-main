
import api from './api';
import { toast } from 'sonner';

export interface UserData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: 'client' | 'admin' | 'vendeur';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: 'client' | 'admin' | 'vendeur';
  };
  token: string;
}

export const authService = {
  // Register a new user
  register: async (userData: UserData) => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        toast.success('Inscription réussie!');
      }
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de l\'inscription';
      toast.error(message);
      throw error;
    }
  },

  // Login user
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        toast.success('Connexion réussie!');
      }
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Identifiants incorrects';
      toast.error(message);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      localStorage.removeItem('auth_token');
      toast.success('Déconnexion réussie');
      return response.data;
    } catch (error) {
      console.error('Error during logout:', error);
      // Remove token even if the API call fails
      localStorage.removeItem('auth_token');
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },

  // Get authenticated user's data
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  // Check if user has required role
  hasRole: async (requiredRoles: string[]) => {
    try {
      const user = await authService.getCurrentUser();
      return requiredRoles.includes(user.role);
    } catch (error) {
      return false;
    }
  }
};
