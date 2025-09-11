const mongoose = require('mongoose');
const Admin = require('./models/admin');

// MongoDB Atlas connection URI
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://salmakhayari69:9BK0YBIWHdDdgdEz@cluster0.3qvh78c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function createFreshAdmin() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB Atlas');
    
    // Delete existing admin with this email
    const deletedAdmin = await Admin.deleteOne({ email: 'admin@test.com' });
    console.log('🗑️ Deleted existing admin:', deletedAdmin.deletedCount);
    
    // Create new fresh admin
    const freshAdmin = new Admin({
      name: 'Fresh Test Admin',
      email: 'admin@test.com',
      password: 'admin123',
      phone: '0612345678'
    });
    
    const savedAdmin = await freshAdmin.save();
    console.log('✅ Fresh admin created successfully!');
    console.log('Email:', savedAdmin.email);
    console.log('Password:', savedAdmin.password);
    console.log('Name:', savedAdmin.name);
    console.log('ID:', savedAdmin._id);
    
  } catch (error) {
    console.error('❌ Error creating fresh admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the function
createFreshAdmin(); 