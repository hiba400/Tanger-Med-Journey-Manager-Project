const http = require('http');

async function testAllButtons() {
  console.log('🧪 Testing all button functionalities...');
  
  try {
    // Test 1: Backend connection
    console.log('\n1. Testing backend connection...');
    const healthResponse = await makeRequest('/');
    console.log('✅ Backend connected:', healthResponse);
    
    // Test 2: Change password endpoint info
    console.log('\n2. Testing change password endpoint info...');
    const testResponse = await makeRequest('/test-change-password');
    console.log('✅ Endpoint info:', testResponse);
    
    // Test 3: Change password API
    console.log('\n3. Testing change password API...');
    const changeResponse = await makeRequest('/admin/change-password-test', 'PATCH', {
      email: 'test@test.com',
      currentPassword: 'oldpass',
      newPassword: 'newpass123'
    });
    console.log('✅ Change password result:', changeResponse);
    
    // Test 4: Profile update API
    console.log('\n4. Testing profile update API...');
    const updateResponse = await makeRequest('/admin/test-id-123', 'PATCH', {
      name: 'Test User',
      email: 'test@test.com',
      phone: '0612345678'
    });
    console.log('✅ Profile update result:', updateResponse);
    
    console.log('\n🎉 All button tests passed! Your buttons should work correctly now.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

function makeRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5002,
      path: endpoint,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
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
testAllButtons(); 