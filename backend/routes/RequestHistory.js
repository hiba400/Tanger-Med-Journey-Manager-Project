const express = require('express');
const router = express.Router();
const RequestHistory = require('../models/RequestHistory');

// Get all history logs
router.get('/', async (req, res) => {
  try {
    const histories = await RequestHistory.find()
      .populate('request')
      .populate('admin');
    res.json(histories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET request history by ID
router.get('/:id', async (req, res) => {
  try {
    const history = await RequestHistory.findById(req.params.id);
    if (!history) return res.status(404).json({ message: 'Request history not found' });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Add a new history log
router.post('/', async (req, res) => {
  try {
    const { action, request, admin } = req.body;

    const newHistory = new RequestHistory({
      action,
      request,
      admin
    });

    const savedHistory = await newHistory.save();
    res.status(201).json(savedHistory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
