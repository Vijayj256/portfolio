// routes/skills.js
const express = require('express');
const router = express.Router();
const { Skill } = require('../models');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json({ success: true, data: skills });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
router.post('/', protect, async (req, res) => {
  try { const s = await Skill.create(req.body); res.status(201).json({ success: true, data: s }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
router.put('/:id', protect, async (req, res) => {
  try { const s = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ success: true, data: s }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
router.delete('/:id', protect, async (req, res) => {
  try { await Skill.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
module.exports = router;
