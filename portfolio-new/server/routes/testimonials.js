const express = require('express');
const router = express.Router();
const { Testimonial } = require('../models');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const filter = req.query.featured ? { featured: true } : {};
    const data = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
router.post('/', protect, async (req, res) => {
  try { const d = await Testimonial.create(req.body); res.status(201).json({ success: true, data: d }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
router.put('/:id', protect, async (req, res) => {
  try { const d = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ success: true, data: d }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
router.delete('/:id', protect, async (req, res) => {
  try { await Testimonial.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
module.exports = router;
