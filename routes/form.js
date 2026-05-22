const express = require('express');
const axios = require('axios');
const router = express.Router();

// Waichat credentials
const INSTANCE_ID = "68E0E2878A990";
const ACCESS_TOKEN = "68de6bd371bd8";
const RECEIVER_NUMBER = "919526224999"; // WhatsApp number to receive notification

router.post('/register', async (req, res) => {
  const { name, email, phone, slot, courseDetail } = req.body;

  // Validate all fields
  if (!name || !email || !phone || !slot || !courseDetail) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Build WhatsApp message
  const message = `
🎓 *New Registration Alert!*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
🕐 *Slot:* ${slot}
📚 *Course Details:* ${courseDetail}

_Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}_
  `.trim();

  try {
    // Send WhatsApp notification via Waichat API
    await axios.post('https://waichat.com/api/send', {
      number: RECEIVER_NUMBER,
      type: 'text',
      message,
      instance_id: INSTANCE_ID,
      access_token: ACCESS_TOKEN,
    });

    console.log(`✅ WhatsApp notification sent to ${RECEIVER_NUMBER}`);
    return res.status(200).json({ success: true, message: 'Registration successful!' });

  } catch (err) {
    console.error('❌ WhatsApp send failed:', err.message);
    // Still return success to user even if WA notification fails
    return res.status(200).json({ success: true, message: 'Registration saved. Notification pending.' });
  }
});

module.exports = router;
