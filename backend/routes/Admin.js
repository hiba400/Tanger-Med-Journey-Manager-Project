const express = require('express');
const router = express.Router();
const Admin = require('../models/admin'); // make sure this path is correct
const { authenticateAdmin } = require('../utils/adminAuth');
const memoryDB = require('../utils/memoryDB');

// POST admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    let admin;
    
    // Try MongoDB first, then fallback to memory DB
    try {
      admin = await Admin.findOne({ email: email });
    } catch (dbError) {
      console.log('MongoDB not available, using memory DB');
      admin = await memoryDB.findOne('admins', { email: email });
    }
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Check password (in production, use bcrypt to compare hashed passwords)
    if (admin.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Return admin data (excluding password)
    const adminData = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone
    };
    
    res.json({ 
      success: true, 
      message: 'Login successful',
      admin: adminData 
    });
  } catch (err) {
    console.error('❌ Error in admin login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST admin register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Check if admin already exists with this email
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }
    
    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password,
      phone
    });
    
    const savedAdmin = await newAdmin.save();
    
    // Return admin data (excluding password)
    const adminData = {
      id: savedAdmin._id,
      name: savedAdmin.name,
      email: savedAdmin.email,
      phone: savedAdmin.phone
    };
    
    res.status(201).json({ 
      success: true, 
      message: 'Admin registered successfully',
      admin: adminData 
    });
  } catch (err) {
    console.error('❌ Error in admin registration:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find(); // ✅ Correct usage
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new admin
router.post('/', async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const saved = await newAdmin.save();
    console.log('✅ Admin saved:', saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Error saving Admin:', err);
    res.status(400).json({ error: err.message });
  }
});

// IMPORTANT: Specific routes must come BEFORE parameterized routes
// PATCH change password (protected route)
router.patch('/change-password', authenticateAdmin, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }
    
    let admin;
    
    // Try MongoDB first, then fallback to memory DB
    try {
      admin = await Admin.findById(req.admin.id);
    } catch (dbError) {
      console.log('MongoDB not available, using memory DB');
      admin = await memoryDB.findOne('admins', { _id: req.admin.id });
    }
    
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    
    // Verify current password
    if (admin.password !== currentPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    // Update password
    try {
      if (admin.save) {
        // MongoDB document
        admin.password = newPassword;
        await admin.save();
      } else {
        // Memory DB document
        await memoryDB.updateOne('admins', { _id: req.admin.id }, { password: newPassword });
      }
    } catch (updateError) {
      console.error('Error updating password:', updateError);
      return res.status(500).json({ error: 'Failed to update password' });
    }
    
    res.json({ 
      success: true, 
      message: 'Password updated successfully' 
    });
  } catch (err) {
    console.error('❌ Error in password change:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH change password (test route - no authentication required)
router.patch('/change-password-test', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Email, current password and new password are required' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }
    
    let admin;
    
    // Try MongoDB first, then fallback to memory DB
    try {
      admin = await Admin.findOne({ email: email });
    } catch (dbError) {
      console.log('MongoDB not available, using memory DB');
      admin = await memoryDB.findOne('admins', { email: email });
    }
    
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found with this email' });
    }
    
    // Verify current password
    if (admin.password !== currentPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    // Update password
    try {
      if (admin.save) {
        // MongoDB document
        admin.password = newPassword;
        await admin.save();
        console.log('✅ Password updated in MongoDB');
      } else {
        // Memory DB document
        await memoryDB.updateOne('admins', { email: email }, { password: newPassword });
        console.log('✅ Password updated in Memory DB');
      }
    } catch (updateError) {
      console.error('Error updating password:', updateError);
      return res.status(500).json({ error: 'Failed to update password' });
    }
    
    res.json({ 
      success: true, 
      message: 'Password updated successfully',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (err) {
    console.error('❌ Error in password change test:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET verify token (protected route)
router.get('/verify', authenticateAdmin, async (req, res) => {
  try {
    res.json({ 
      success: true, 
      message: 'Token is valid',
      admin: req.admin 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Parameterized routes must come AFTER specific routes
// PATCH update Admin by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdmin) return res.status(404).json({ message: 'Admin not found' });
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE Admin by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all Admins
router.delete('/', async (req, res) => {
  try {
    const result = await Admin.deleteMany({});
    res.json({ message: 'All admins deleted', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 