// Simple admin auth middleware placeholder
// Replace with real authentication logic in production
module.exports = (req, res, next) => {
  // Example: check for admin token in headers
  const adminToken = req.headers['x-admin-token'];
  if (adminToken && adminToken === process.env.ADMIN_TOKEN) {
    return next();
  }
  return res.status(403).json({ message: 'Admin access required' });
}; 