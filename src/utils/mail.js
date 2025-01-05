const nodemailer = require('nodemailer');
require('dotenv').config();




// Create a transporter only once
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider's SMTP
  auth: {
    user: process.env.EMAIL_USER,  // Your email address
    pass: process.env.EMAIL_PASS   // Your email password or app-specific password
  }
});

// Send email function
async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address from .env
    to,                           // Recipient address
    subject,                      // Email subject
    text                          // Email content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (err) {
    console.error('Error sending email: ', err);
  }
}

module.exports={
  sendEmail
}