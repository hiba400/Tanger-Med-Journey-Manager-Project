const API_BASE_URL = 'http://localhost:5000';

// Helper function to get auth token
const getAuthToken = () => {
  const adminData = localStorage.getItem('adminData') || sessionStorage.getItem('adminData');
  if (adminData) {
    const admin = JSON.parse(adminData);
    return admin.id;
  }
  return null;
};

// Helper function to make HTTP requests
const makeRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log('Making request:', config.method || 'GET', `${API_BASE_URL}${endpoint}`);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      // Handle authentication errors
      if (response.status === 401) {
        localStorage.removeItem('adminData');
        sessionStorage.removeItem('adminData');
        window.location.href = '/authentication/sign-in';
        throw new Error('Unauthorized');
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    console.log('Response received:', response.status, endpoint);
    
    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Admin API methods
export const adminAPI = {
  // Login
  login: async (email, password) => {
    return makeRequest('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  // Register
  register: async (adminData) => {
    return makeRequest('/admin/register', {
      method: 'POST',
      body: JSON.stringify(adminData),
    });
  },
  
  // Verify token
  verify: async () => {
    return makeRequest('/admin/verify');
  },
  
  // Change password
  changePassword: async (currentPassword, newPassword) => {
    return makeRequest('/admin/change-password', {
      method: 'PATCH',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
  
  // Logout (client-side only)
  logout: async () => {
    localStorage.removeItem('adminData');
    sessionStorage.removeItem('adminData');
    return { success: true };
  }
};

// Truck API methods
export const truckAPI = {
  // Get all trucks
  getAll: async () => {
    return makeRequest('/truck');
  },
  
  // Add new truck
  create: async (truckData) => {
    return makeRequest('/truck', {
      method: 'POST',
      body: JSON.stringify(truckData),
    });
  },
  
  // Update truck
  update: async (id, truckData) => {
    return makeRequest(`/truck/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(truckData),
    });
  },
  
  // Delete truck
  delete: async (id) => {
    return makeRequest(`/truck/${id}`, {
      method: 'DELETE',
    });
  }
};

// Driver API methods
export const driverAPI = {
  // Get all drivers
  getAll: async () => {
    return makeRequest('/driver');
  },
  
  // Add new driver
  create: async (driverData) => {
    return makeRequest('/driver', {
      method: 'POST',
      body: JSON.stringify(driverData),
    });
  },
  
  // Update driver
  update: async (id, driverData) => {
    return makeRequest(`/driver/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(driverData),
    });
  },
  
  // Delete driver
  delete: async (id) => {
    return makeRequest(`/driver/${id}`, {
      method: 'DELETE',
    });
  }
};

// Passenger API methods
export const passengerAPI = {
  // Get all passengers
  getAll: async () => {
    return makeRequest('/passenger');
  },
  
  // Add new passenger
  create: async (passengerData) => {
    return makeRequest('/passenger', {
      method: 'POST',
      body: JSON.stringify(passengerData),
    });
  },
  
  // Update passenger
  update: async (id, passengerData) => {
    return makeRequest(`/passenger/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(passengerData),
    });
  },
  
  // Delete passenger
  delete: async (id) => {
    return makeRequest(`/passenger/${id}`, {
      method: 'DELETE',
    });
  }
};

// Request API methods
export const requestAPI = {
  // Get all requests
  getAll: async () => {
    return makeRequest('/request');
  },
  
  // Add new request
  create: async (requestData) => {
    return makeRequest('/request', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },
  
  // Update request
  update: async (id, requestData) => {
    return makeRequest(`/request/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(requestData),
    });
  },
  
  // Delete request
  delete: async (id) => {
    return makeRequest(`/request/${id}`, {
      method: 'DELETE',
    });
  }
};

// Request History API methods
export const requestHistoryAPI = {
  // Get all request history
  getAll: async () => {
    return makeRequest('/request-history');
  },
  
  // Add new request history entry
  create: async (historyData) => {
    return makeRequest('/request-history', {
      method: 'POST',
      body: JSON.stringify(historyData),
    });
  },
  
  // Update request history
  update: async (id, historyData) => {
    return makeRequest(`/request-history/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(historyData),
    });
  },
  
  // Delete request history
  delete: async (id) => {
    return makeRequest(`/request-history/${id}`, {
      method: 'DELETE',
    });
  }
};

// Health check
export const healthCheck = async () => {
  return makeRequest('/');
};

// Export all APIs
export default {
  admin: adminAPI,
  truck: truckAPI,
  driver: driverAPI,
  passenger: passengerAPI,
  request: requestAPI,
  requestHistory: requestHistoryAPI,
  healthCheck,
}; 