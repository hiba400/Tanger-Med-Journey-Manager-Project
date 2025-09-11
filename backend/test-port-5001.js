const http = require('http');

async function testPort5001() {
  console.log('🧪 Testing API on port 5001...');
  
  try {
    // Test 1: Health check
    console.log('\n1. Testing backend connection...');
    const healthResponse = await makeRequest('/');
    console.log('✅ Backend connected:', healthResponse);
    
    // Test 2: Test change password endpoint info
    console.log('\n2. Testing change password endpoint info...');
    const testResponse = await makeRequest('/test-change-password');
    console.log('✅ Endpoint info:', testResponse);
    
    console.log('\n🎉 All tests passed! The API is working on port 5001.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

function makeRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5001,
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
testPort5001(); 