const express = require('express');
const router = express.Router();
const Truck = require('../models/Truck'); // Your model

// GET all trucks
router.get('/', async (req, res) => {
  try {
    const trucks = await Truck.find(); // use lowercase "trucks"
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newTruck = new Truck(req.body);
    const saved = await newTruck.save();
    console.log('✅ Truck saved:', saved);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedTruck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true }); // lowercase variable
    if (!updatedTruck) return res.status(404).json({ message: 'Truck not found' });
    res.json(updatedTruck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTruck = await Truck.findByIdAndDelete(req.params.id); // lowercase variable
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
