const mongoose = require('mongoose');
const Admin = require('./models/admin');

// MongoDB Atlas connection URI
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://salmakhayari69:9BK0YBIWHdDdgdEz@cluster0.3qvh78c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function createTestAdmin() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB Atlas');
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@test.com' });
    
    if (existingAdmin) {
      console.log('ℹ️ Admin already exists:', existingAdmin.email);
      console.log('Current password:', existingAdmin.password);
      return;
    }
    
    // Create new test admin
    const testAdmin = new Admin({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'admin123',
      phone: '0612345678'
    });
    
    const savedAdmin = await testAdmin.save();
    console.log('✅ Test admin created successfully!');
    console.log('Email:', savedAdmin.email);
    console.log('Password:', savedAdmin.password);
    console.log('Name:', savedAdmin.name);
    
  } catch (error) {
    console.error('❌ Error creating test admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the function
createTestAdmin(); 