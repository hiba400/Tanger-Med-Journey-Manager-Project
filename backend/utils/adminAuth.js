const Admin = require('../models/admin');

// Middleware to verify admin authentication
const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // For now, we'll use the admin ID as a simple token
    // In production, you should use JWT tokens
    const admin = await Admin.findById(token);
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    
    // Add admin info to request object
    req.admin = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Server error during authentication.' });
  }
};

// Optional: Middleware to check if admin is authenticated (for optional routes)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const admin = await Admin.findById(token);
      
      if (admin) {
        req.admin = {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone
        };
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication for optional routes
    next();
  }
};

module.exports = {
  authenticateAdmin,
  optionalAuth
}; 