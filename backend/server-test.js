const http = require('http');

const PORT = 3001;

// Simple in-memory storage for testing
const admins = [
    {
        id: '1',
        email: 'admin@test.com',
        password: 'admin123',
        name: 'Test Admin'
    }
];

// Create HTTP server
const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Parse URL
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const path = url.pathname;
    
    console.log(`${req.method} ${path}`);
    
    // Route handling
    if (path === '/' && req.method === 'GET') {
        // Health check
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('✅ Test server is running on port 3001');
        
    } else if (path === '/test-change-password' && req.method === 'GET') {
        // Test endpoint info
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Change password endpoint is available',
            endpoints: {
                'POST /admin/login': 'Admin login',
                'PATCH /admin/change-password-test': 'Change password (test)'
            },
            testAdmin: {
                email: 'admin@test.com',
                password: 'admin123'
            }
        }));
        
    } else if (path === '/admin/login' && req.method === 'POST') {
        // Admin login
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const { email, password } = JSON.parse(body);
                const admin = admins.find(a => a.email === email && a.password === password);
                
                if (admin) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: true,
                        message: 'Login successful',
                        admin: {
                            id: admin.id,
                            name: admin.name,
                            email: admin.email
                        }
                    }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid email or password' }));
                }
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        
    } else if (path === '/admin/change-password-test' && req.method === 'PATCH') {
        // Change password
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const { email, currentPassword, newPassword } = JSON.parse(body);
                
                if (!email || !currentPassword || !newPassword) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Email, current password and new password are required' }));
                    return;
                }
                
                if (newPassword.length < 6) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'New password must be at least 6 characters long' }));
                    return;
                }
                
                const admin = admins.find(a => a.email === email);
                
                if (!admin) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Admin not found with this email' }));
                    return;
                }
                
                // Verify current password
                if (admin.password !== currentPassword) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Current password is incorrect' }));
                    return;
                }
                
                // Update password
                admin.password = newPassword;
                console.log('✅ Password updated for admin:', admin.email);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'Password updated successfully',
                    admin: {
                        id: admin.id,
                        email: admin.email,
                        name: admin.name
                    }
                }));
                
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        
    } else {
        // 404 Not Found
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Test server running at http://localhost:${PORT}`);
    console.log('📧 Test admin: admin@test.com / admin123');
    console.log('🔗 Available endpoints:');
    console.log('  - GET / (health check)');
    console.log('  - GET /test-change-password (endpoint info)');
    console.log('  - POST /admin/login (admin login)');
    console.log('  - PATCH /admin/change-password-test (change password)');
});

// Handle server errors
server.on('error', (error) => {
    console.error('❌ Server error:', error);
}); 