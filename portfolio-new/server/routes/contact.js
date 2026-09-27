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

    try {
      const emailUser = process.env.EMAIL_USER;
      const emailPass = process.env.EMAIL_PASS;
      if (!emailUser || !emailPass) {
        throw new Error('EMAIL_USER and EMAIL_PASS must be configured to send email notifications.');
      }

      const port = Number(process.env.EMAIL_PORT || 587);
      if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error('EMAIL_PORT must be a valid TCP port.');
      }

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port,
        secure: port === 465,
        auth: { user: emailUser, pass: emailPass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || emailUser,
        to: process.env.EMAIL_TO || emailUser,
        replyTo: email,
        subject: 'New portfolio contact form message',
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'No subject'}\n\n${message}`,
      });
    } catch (emailErr) {
      console.error('Contact message saved, but email notification failed:', emailErr.message);
      return res.status(502).json({
        success: false,
        message: 'Your message was received and saved, but the email notification could not be delivered. You do not need to resend it.',
      });
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
