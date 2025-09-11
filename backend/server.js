const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const memoryDB = require('./utils/memoryDB');
require('dotenv').config(); // Loads .env variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import routes
const requestRoutes = require('./routes/Request');
const driverRoutes = require('./routes/Driver');
const requestHistoryRoutes = require('./routes/RequestHistory');
const passengerRoutes = require('./routes/Passenger');
const adminRoutes = require('./routes/Admin');
const truckRoutes = require('./routes/Truck');

// Use routes
app.use('/request', requestRoutes);
app.use('/request-history', requestHistoryRoutes);
app.use('/driver', driverRoutes);
app.use('/truck', truckRoutes);
app.use('/admin', adminRoutes);
app.use('/passenger', passengerRoutes);

// MongoDB Atlas connection URI
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://salmakhayari69:9BK0YBIWHdDdgdEz@cluster0.3qvh78c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    console.log('🗂️ Using database:', mongoose.connection.db.databaseName);

    // Start server after successful connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('⚠️ Falling back to in-memory database...');
    memoryDB.initialize();

    // Start server with fallback DB
    app.listen(PORT, () => {
      console.log(`🚀 Server running with in-memory DB at http://localhost:${PORT}`);
    });
  });

// Test route
app.get('/', (req, res) => {
  res.send('✅ Server is running');
});

// Test change password route
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
