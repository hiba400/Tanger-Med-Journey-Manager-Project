const express = require('express');
const router = express.Router();
const Truck = require('../models/Truck'); // Your model
const memoryDB = require('../utils/memoryDB');

// GET all trucks
router.get('/', async (req, res) => {
  try {
    let trucks;
    try {
      trucks = await Truck.find(); // use lowercase "trucks"
    } catch (dbError) {
      console.log('MongoDB not available, using memory DB');
      trucks = await memoryDB.find('trucks');
    }
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    let saved;
    try {
      const newTruck = new Truck(req.body);
      saved = await newTruck.save();
    } catch (dbError) {
      console.log('MongoDB not available, using memory DB');
      saved = await memoryDB.create('trucks', req.body);
    }
    console.log('✅ Truck saved:', saved);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update by ID
router.patch('/:id', async (req, res) => {
  try {
    let updatedTruck;
    try {
      updatedTruck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true }); // lowercase variable
    } catch (dbError) {
      console.log('MongoDB not available, using memory DB');
      updatedTruck = await memoryDB.findByIdAndUpdate('trucks', req.params.id, req.body, { new: true });
    }
    if (!updatedTruck) return res.status(404).json({ message: 'Truck not found' });
    res.json(updatedTruck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE by ID
router.delete('/:id', async (req, res) => {
  try {
    let deletedTruck;
    try {
      deletedTruck = await Truck.findByIdAndDelete(req.params.id); // lowercase variable
    } catch (dbError) {
      console.log('MongoDB not available, using memory DB');
      deletedTruck = await memoryDB.findByIdAndDelete('trucks', req.params.id);
    }
    if (!deletedTruck) return res.status(404).json({ message: 'Truck not found' });
    res.json({ message: 'Truck deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all trucks
router.delete('/', async (req, res) => {
  try {
    const result = await Truck.deleteMany({});
    res.json({ message: 'All Trucks deleted', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
