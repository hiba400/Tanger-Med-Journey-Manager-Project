import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token if available
api.interceptors.request.use(
  (config) => {
    const adminData = localStorage.getItem('adminData') || sessionStorage.getItem('adminData');
    if (adminData) {
      const admin = JSON.parse(adminData);
      config.headers.Authorization = `Bearer ${admin.id}`; // Simple token using admin ID
    }
    console.log('Making request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.config.url);
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear stored auth data
      localStorage.removeItem('adminData');
      sessionStorage.removeItem('adminData');
      // Redirect to login route used by the app
      window.location.href = '/authentication/sign-in';
    }
    
    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  // Login
  login: async (email, password) => {
    return api.post('/admin/login', { email, password });
  },
  
  // Register
  register: async (adminData) => {
    return api.post('/admin/register', adminData);
  },
  
  // Logout (client-side only, but you can add server logout)
  logout: async () => {
    // Clear stored data
    localStorage.removeItem('adminData');
    sessionStorage.removeItem('adminData');
    return { success: true };
  },
  
  // Verify token (optional - for checking if user is still valid)
  verifyToken: async () => {
    return api.get('/admin/verify');
  }
};

// Truck API methods
export const truckAPI = {
  // Get all trucks
  getAll: async () => {
    return api.get('/truck');
  },
  
  // Add new truck
  create: async (truckData) => {
    return api.post('/truck', truckData);
  },
  
  // Update truck
  update: async (id, truckData) => {
    return api.patch(`/truck/${id}`, truckData);
  },
  
  // Delete truck
  delete: async (id) => {
    return api.delete(`/truck/${id}`);
  }
};

export default api; 