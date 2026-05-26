const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { Contact } = require('../models');
const { protect } = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });

    const contact = await Contact.create({ name, email, subject, message });

    // Send email notification (optional — won't fail if not configured)
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
        html: `<h3>New Contact from Portfolio</h3>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Subject:</strong> ${subject}</p>
               <p><strong>Message:</strong></p><p>${message}</p>`,
      });
    } catch (emailErr) {
      console.log('Email notification failed (not critical):', emailErr.message);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!', data: contact });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin routes
router.get('/', protect, async (req, res) => {
  try {
    const msgs = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: msgs });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.patch('/:id/read', protect, async (req, res) => {
  try {
    const m = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json({ success: true, data: m });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
