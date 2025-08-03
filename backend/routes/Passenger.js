const express = require('express');
const router = express.Router();
const Passenger = require('../models/passenger');

// GET all passengers
router.get('/', async (req, res) => {
  try {
    const passenger = await Passenger.find();
    res.json(passenger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newPassenger = new Passenger(req.body);
    const saved = await newPassenger.save();
    console.log('✅ Passenger saved:', saved); // 👀 SEE this in your terminal
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Error saving passenger:', err);
    res.status(400).json({ error: err.message });
  }
});




// PATCH update passenger by ID
router.patch('/:id', async (req, res) => {
  try {
    const passenger = await Passenger.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!passenger) return res.status(404).json({ message: 'Passenger not found' });
    res.json(passenger);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE passenger by ID
router.delete('/:id', async (req, res) => {
  try {
    const passenger = await Passenger.findByIdAndDelete(req.params.id);
    if (!passenger) return res.status(404).json({ message: 'Passenger not found' });
    res.json({ message: 'Passenger deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE all passengers — use with caution!
router.delete('/', async (req, res) => {
  try {
    const result = await Passenger.deleteMany({});
    res.json({ message: 'All passengers deleted', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
