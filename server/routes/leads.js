const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { protect } = require('../middleware/auth');

// CREATE - Add new lead (user-specific)
router.post('/', protect, async (req, res) => {
  try {
    const lead = new Lead({
      ...req.body,
      userId: req.user._id,
    });
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Get all leads for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const { dueToday } = req.query;
    let filter = { userId: req.user._id };

    if (dueToday === 'true') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      filter.nextFollowUp = { $lte: tomorrow };
    }

    const leads = await Lead.find(filter).sort({ nextFollowUp: 1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get single lead by ID (only if owned by user)
router.get('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findOne({ 
      _id: req.params.id,
      userId: req.user._id 
    });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Update lead by ID (only if owned by user)
router.patch('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Delete lead by ID (only if owned by user)
router.delete('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({ 
      _id: req.params.id,
      userId: req.user._id 
    });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted successfully', lead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
