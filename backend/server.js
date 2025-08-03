const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Import routes (✅ these must come before app.use)
const requestRoutes = require('./routes/Request');
const driverRoutes = require('./routes/Driver');
const requestHistoryRoutes = require('./routes/RequestHistory'); // Assuming you have a RequestHistory.js route file
const passengerRoutes = require('./routes/Passenger');
const adminRoutes = require('./routes/Admin');
const truckRoutes = require('./routes/Truck'); // Assuming you have a Truck.js route file

// Use routes (✅ AFTER defining them)
app.use('/request', requestRoutes);
app.use('/request-history', requestHistoryRoutes); // Use RequestHistory routes
app.use('/driver', driverRoutes);
app.use('/truck', truckRoutes); // Add Truck routes
app.use('/admin', adminRoutes); // keep plural if your routes are defined that way
app.use('/passenger', passengerRoutes); // keep plural if your routes are defined that way

// MongoDB connection
mongoose.connect("mongodb://salmakhayari69:9BK0YBIWHdDdgdEz@ac-bmy70cy-shard-00-00.3qvh78c.mongodb.net:27017,ac-bmy70cy-shard-00-01.3qvh78c.mongodb.net:27017,ac-bmy70cy-shard-00-02.3qvh78c.mongodb.net:27017/?replicaSet=atlas-1077k7-shard-0&ssl=true&authSource=admin", {
  dbName: 'TM_Journey_Manager'
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.once('open', () => {
  console.log('Using database:', mongoose.connection.db.databaseName);
});

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
