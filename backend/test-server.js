const http = require('http');

const API_BASE_URL = 'http://localhost:5000';

// Test function
async function testServer() {
    console.log('🧪 Testing server connection...');
    
    try {
        // Test 1: Health check
        console.log('\n1. Testing health check...');
        const healthResponse = await makeRequest('/');
        console.log('✅ Health check:', healthResponse);
        
        // Test 2: Test change password endpoint info
        console.log('\n2. Testing change password endpoint info...');
        const testResponse = await makeRequest('/test-change-password');
        console.log('✅ Test endpoint:', testResponse);
        
        // Test 3: Try to change password (this will fail without valid admin)
        console.log('\n3. Testing change password (expected to fail without valid admin)...');
        try {
            const changeResponse = await makeRequest('/admin/change-password-test', 'PATCH', {
                email: 'test@test.com',
                currentPassword: 'oldpass',
                newPassword: 'newpass123'
            });
            console.log('✅ Change password:', changeResponse);
        } catch (error) {
            console.log('⚠️ Change password (expected):', error.message);
        }
        
        console.log('\n🎉 Server tests completed!');
        
    } catch (error) {
        console.error('❌ Server test failed:', error.message);
    }
}

// Helper function to make HTTP requests
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

// Run tests
testServer(); 