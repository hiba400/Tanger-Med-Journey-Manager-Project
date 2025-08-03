const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Passenger = require('../models/passenger'); // make sure filename casing matches exactly
const RequestHistory = require('../models/RequestHistory');

// POST /request — create passenger + request + log history
router.post('/', async (req, res) => {
  try {
    const { passengerInfo, carPlate, location } = req.body;

    if (!passengerInfo || !carPlate || !location || !location.lat || !location.lng) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create passenger document
    const passenger = new Passenger(passengerInfo);
    await passenger.save();

    // Create request document linked to passenger
    const request = new Request({
      passenger: passenger._id,
      carPlate,
      location,
      status: 'pending'
    });
    await request.save();

    // Log request creation in history
    const history = new RequestHistory({
      action: 'created',
      request: request._id
    });
    await history.save();

    res.status(201).json({ request, passenger });
  } catch (err) {
    console.error('Error creating request:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /request — get all requests with populated passenger & driver
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('passenger')

    res.json(requests);
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ error: err.message });
  }
});
// GET /request/:id — get single request by ID with populated passenger and 
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('passenger')
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (err) {
    console.error('Error fetching request by ID:', err);
    res.status(500).json({ error: err.message });
  }
});
router.get('/admin', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const requests = await Request.find(filter)
      .populate('passenger')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("Admin GET error:", err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH /request/:id/status — update status + log history
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = status;
    await request.save();

    const history = new RequestHistory({
      action: status,
      request: request._id
    });
    await history.save();

    res.json(request);
  } catch (err) {
    console.error('Error updating request status:', err);
    res.status(500).json({ error: err.message });
  }
});
// DELETE /request/:id — delete request by ID
router.delete('/:id', async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ message: 'Request deleted successfully' });
  } catch (err) {
    console.error('Error deleting request:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
