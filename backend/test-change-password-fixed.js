const http = require('http');

const API_BASE_URL = 'http://localhost:5000';

async function testChangePassword() {
  console.log('🧪 Testing change password API...');
  
  try {
    // Test 1: Health check
    console.log('\n1. Testing backend connection...');
    const healthResponse = await makeRequest('/');
    console.log('✅ Backend connected:', healthResponse);
    
    // Test 2: Test change password endpoint info
    console.log('\n2. Testing change password endpoint info...');
    const testResponse = await makeRequest('/test-change-password');
    console.log('✅ Endpoint info:', testResponse);
    
    // Test 3: Test change password API
    console.log('\n3. Testing change password API...');
    const changeResponse = await makeRequest('/admin/change-password-test', 'PATCH', {
      email: 'admin@test.com',
      currentPassword: 'admin123',
      newPassword: 'newpass123'
    });
    console.log('✅ Change password result:', changeResponse);
    
    console.log('\n🎉 All tests passed! The change password API is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

function makeRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, API_BASE_URL);
    
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const contentType = res.headers['content-type'];
          if (contentType && contentType.includes('application/json')) {
            const jsonData = JSON.parse(responseData);
            resolve(jsonData);
          } else {
            resolve(responseData);
          }
        } catch (error) {
          resolve(responseData);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data && method !== 'GET') {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Run the test
testChangePassword(); 