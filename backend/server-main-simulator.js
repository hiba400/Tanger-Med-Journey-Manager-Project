const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

// Simulate the main server routes
app.get('/', (req, res) => {
  res.send('✅ Server is running');
});

// Test change password endpoint info (same as main server)
app.get('/test-change-password', (req, res) => {
  res.json({ 
    message: 'Change password endpoint is available',
    endpoints: {
      'POST /admin/login': 'Admin login',
      'PATCH /admin/change-password': 'Change password (authenticated)',
      'PATCH /admin/change-password-test': 'Change password (test - no auth)'
    }
  });
});

// Change password API (same as main server)
app.patch('/admin/change-password-test', (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    
    console.log('Password change request:', { email, currentPassword, newPassword });
    
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Email, current password and new password are required' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }
    
    // Simulate successful password change
    res.json({ 
      success: true, 
      message: 'Password updated successfully',
      admin: {
        id: 'test-id-123',
        email: email,
        name: 'Test Admin'
      }
    });
    
  } catch (err) {
    console.error('Error in password change test:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin update API (same as main server)
app.patch('/admin/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    
    console.log('Profile update request:', { id, name, email, phone });
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    // Simulate successful profile update
    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      admin: {
        id: id,
        name: name,
        email: email,
        phone: phone
      }
    });
    
  } catch (err) {
    console.error('Error in profile update:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Main server simulator running at http://localhost:${PORT}`);
  console.log('📧 Available endpoints (same as main server):');
  console.log('  - GET / (health check)');
  console.log('  - GET /test-change-password (endpoint info)');
  console.log('  - PATCH /admin/change-password-test (change password)');
  console.log('  - PATCH /admin/:id (update profile)');
  console.log('✅ This server simulates exactly what your main server should do!');
}); 