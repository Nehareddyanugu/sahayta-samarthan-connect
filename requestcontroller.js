// controllers/requestController.js

const Request = require('../models/Request');

// Create a new help request
exports.createRequest = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;
    const userId = req.user._id;

    const reqNew = await Request.create({
      user: userId,
      title,
      description,
      category,
      location
    });

    res.status(201).json(reqNew);
  } catch (error) {
    console.error('Error in createRequest:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('user', 'name email'); // include user info
    res.json(requests);
  } catch (error) {
    console.error('Error in getAllRequests:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get one request by id
exports.getRequestById = async (req, res) => {
  try {
    const reqId = req.params.id;
    const reqObj = await Request.findById(reqId).populate('user', 'name email');
    if (!reqObj) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(reqObj);
  } catch (error) {
    console.error('Error in getRequestById:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a request
exports.updateRequest = async (req, res) => {
  try {
    const reqId = req.params.id;
    const updates = req.body;

    // Optionally: check if current user is owner or admin

    const reqObj = await Request.findById(reqId);
    if (!reqObj) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Only owner or admin can update
    if (reqObj.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed' });
    }

    // Apply updates
    Object.assign(reqObj, updates);
    const updated = await reqObj.save();
    res.json(updated);
  } catch (error) {
    console.error('Error in updateRequest:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a request
exports.deleteRequest = async (req, res) => {
  try {
    const reqId = req.params.id;

    const reqObj = await Request.findById(reqId);
    if (!reqObj) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Only owner or admin can delete
    if (reqObj.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await reqObj.remove();
    res.json({ message: 'Request removed' });
  } catch (error) {
    console.error('Error in deleteRequest:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
