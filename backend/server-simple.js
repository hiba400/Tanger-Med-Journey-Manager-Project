const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simple in-memory storage for testing
const admins = [
    {
        id: '1',
        email: 'admin@test.com',
        password: 'admin123',
        name: 'Test Admin'
    }
];

// Health check
app.get('/', (req, res) => {
    res.send('✅ Simple test server is running');
});

// Test change password endpoint info
app.get('/test-change-password', (req, res) => {
    res.json({ 
        message: 'Change password endpoint is available',
        endpoints: {
            'POST /admin/login': 'Admin login',
            'PATCH /admin/change-password-test': 'Change password (test - no auth)'
        },
        testAdmin: {
            email: 'admin@test.com',
            password: 'admin123'
        }
    });
});

// Admin login
app.post('/admin/login', (req, res) => {
    const { email, password } = req.body;
    
    const admin = admins.find(a => a.email === email && a.password === password);
    
    if (admin) {
        res.json({
            success: true,
            message: 'Login successful',
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email
            }
        });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
});

// Change password test endpoint
app.patch('/admin/change-password-test', (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
        
        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Email, current password and new password are required' });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters long' });
        }
        
        const admin = admins.find(a => a.email === email);
        
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found with this email' });
        }
        
        // Verify current password
        if (admin.password !== currentPassword) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }
        
        // Update password
        admin.password = newPassword;
        console.log('✅ Password updated for admin:', admin.email);
        
        res.json({ 
            success: true, 
            message: 'Password updated successfully',
            admin: {
                id: admin.id,
                email: admin.email,
                name: admin.name
            }
        });
    } catch (err) {
        console.error('❌ Error in password change:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Simple test server running at http://localhost:${PORT}`);
    console.log('📧 Test admin: admin@test.com / admin123');
    console.log('🔗 Test endpoints:');
    console.log('  - GET / (health check)');
    console.log('  - GET /test-change-password (endpoint info)');
    console.log('  - POST /admin/login (admin login)');
    console.log('  - PATCH /admin/change-password-test (change password)');
});
