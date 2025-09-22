// routes/requests.js — endpoints for creating / viewing help requests

const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/requests — create a new help request (must be logged in)
router.post('/', authMiddleware, requestController.createRequest);

// GET /api/requests — list all help requests (public or maybe filtered to user)
router.get('/', requestController.getAllRequests);

// GET /api/requests/:id — view a single request’s details
router.get('/:id', requestController.getRequestById);

// PUT /api/requests/:id — update a request (for example, user can edit, or admin change status)
router.put('/:id', authMiddleware, requestController.updateRequest);

// DELETE /api/requests/:id — delete a request (maybe admin only, or owner)
router.delete('/:id', authMiddleware, requestController.deleteRequest);

module.exports = router;
