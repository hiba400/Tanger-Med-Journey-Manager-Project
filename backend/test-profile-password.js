const http = require('http');

async function testProfilePasswordChange() {
  console.log('🧪 Testing Profile Password Change API...');
  
  try {
    // Test the change password API
    const response = await makeRequest('/admin/change-password-test', 'PATCH', {
      email: 'admin@test.com',
      currentPassword: 'admin123',
      newPassword: 'newpass123'
    });
    
    console.log('✅ Password change result:', response);
    
    if (response.success) {
      console.log('🎉 Password changed successfully!');
      
      // Now test with the new password
      console.log('\n🧪 Testing with new password...');
      const testResponse = await makeRequest('/admin/change-password-test', 'PATCH', {
        email: 'admin@test.com',
        currentPassword: 'newpass123',
        newPassword: 'admin123'
      });
      
      if (testResponse.success) {
        console.log('✅ Password reverted successfully!');
        console.log('🎉 All tests passed! The profile password change is working.');
      } else {
        console.log('❌ Failed to revert password:', testResponse.error);
      }
    } else {
      console.log('❌ Password change failed:', response.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

function makeRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
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
          const jsonData = JSON.parse(responseData);
          resolve(jsonData);
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
testProfilePasswordChange(); 