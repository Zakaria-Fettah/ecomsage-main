
import axios from 'axios';
import { toast } from 'sonner';

// Base API URL - in production, point this to your Laravel backend
const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor - can be used to add auth tokens
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (401, 403, etc.)
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      console.error('Unauthorized access');
      // Clear auth data
      localStorage.removeItem('auth_token');
      toast.error('Session expirée. Veuillez vous reconnecter.');
    } else if (error.response?.status === 403) {
      toast.error('Vous n\'avez pas les permissions nécessaires pour cette action.');
    } else if (error.response?.status === 429) {
      toast.error('Trop de requêtes. Veuillez réessayer plus tard.');
    } else if (error.response?.status >= 500) {
      toast.error('Une erreur serveur est survenue. Veuillez réessayer plus tard.');
    } else if (error.code === 'ERR_NETWORK') {
      toast.error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
    }
    return Promise.reject(error);
  }
);

export default api;
