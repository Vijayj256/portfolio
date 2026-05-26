const express = require('express');
const router = express.Router();
const { Experience } = require('../models');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const data = await Experience.find().sort({ startDate: -1 });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
router.post('/', protect, async (req, res) => {
  try { const d = await Experience.create(req.body); res.status(201).json({ success: true, data: d }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
router.put('/:id', protect, async (req, res) => {
  try { const d = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ success: true, data: d }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
router.delete('/:id', protect, async (req, res) => {
  try { await Experience.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
module.exports = router;
