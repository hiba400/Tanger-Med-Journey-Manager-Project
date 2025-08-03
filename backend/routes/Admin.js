const express = require('express');
const router = express.Router();
const Admin = require('../models/admin'); // make sure this path is correct

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
