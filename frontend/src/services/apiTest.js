import { healthCheck, adminAPI, truckAPI, driverAPI, passengerAPI, requestAPI, requestHistoryAPI } from './apiFetch.js';

// Test function to check all API endpoints
export const testAllAPIs = async () => {
  console.log('🧪 Testing API connection...');
  
  try {
    // Test health check
    console.log('1. Testing health check...');
    const health = await healthCheck();
    console.log('✅ Health check:', health);
    
    // Test admin endpoints
    console.log('2. Testing admin endpoints...');
    try {
      const adminTest = await adminAPI.verify();
      console.log('✅ Admin verify:', adminTest);
    } catch (error) {
      console.log('⚠️ Admin verify (expected if not logged in):', error.message);
    }
    
    // Test truck endpoints
    console.log('3. Testing truck endpoints...');
    try {
      const trucks = await truckAPI.getAll();
      console.log('✅ Trucks:', trucks);
    } catch (error) {
      console.log('❌ Truck getAll error:', error.message);
    }
    
    // Test driver endpoints
    console.log('4. Testing driver endpoints...');
    try {
      const drivers = await driverAPI.getAll();
      console.log('✅ Drivers:', drivers);
    } catch (error) {
      console.log('❌ Driver getAll error:', error.message);
    }
    
    // Test passenger endpoints
    console.log('5. Testing passenger endpoints...');
    try {
      const passengers = await passengerAPI.getAll();
      console.log('✅ Passengers:', passengers);
    } catch (error) {
      console.log('❌ Passenger getAll error:', error.message);
    }
    
    // Test request endpoints
    console.log('6. Testing request endpoints...');
    try {
      const requests = await requestAPI.getAll();
      console.log('✅ Requests:', requests);
    } catch (error) {
      console.log('❌ Request getAll error:', error.message);
    }
    
    // Test request history endpoints
    console.log('7. Testing request history endpoints...');
    try {
      const history = await requestHistoryAPI.getAll();
      console.log('✅ Request History:', history);
    } catch (error) {
      console.log('❌ Request History getAll error:', error.message);
    }
    
    console.log('🎉 API testing completed!');
    return true;
    
  } catch (error) {
    console.error('❌ API testing failed:', error);
    return false;
  }
};

// Test change password endpoint
export const testChangePassword = async (currentPassword, newPassword) => {
  try {
    console.log('🧪 Testing change password...');
    const result = await adminAPI.changePassword(currentPassword, newPassword);
    console.log('✅ Change password:', result);
    return result;
  } catch (error) {
    console.log('❌ Change password error:', error.message);
    throw error;
  }
};

// Test specific endpoint
export const testEndpoint = async (endpoint, method = 'GET', data = null) => {
  try {
    const url = `http://localhost:5000${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    
    console.log(`🧪 Testing ${method} ${endpoint}...`);
    const response = await fetch(url, options);
    const result = await response.json();
    
    console.log(`✅ ${method} ${endpoint}:`, result);
    return result;
    
  } catch (error) {
    console.error(`❌ ${method} ${endpoint} error:`, error);
    throw error;
  }
};

// Export for use in components
export default {
  testAllAPIs,
  testChangePassword,
  testEndpoint,
}; 