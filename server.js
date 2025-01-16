import express from 'express';
import cors from 'cors';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: 'Name, email, and message are required'
      });
    }

    const sentFrom = new Sender("contact@yourdomain.com", "Contact Form");
    const recipients = [
      new Recipient("admin@yourdomain.com", "Admin")
    ];
    
    // Add CC and BCC recipients
    const cc = [
      new Recipient("manager@yourdomain.com", "Manager")
    ];
    const bcc = [
      new Recipient("archive@yourdomain.com", "Archive")
    ];

    // Add personalization for template variables
    const personalization = [
      {
        email: "admin@yourdomain.com",
        data: {
          senderName: name,
          senderEmail: email,
          senderPhone: phone || 'Not provided',
          senderMessage: message
        },
      }
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setCc(cc)
      .setBcc(bcc)
      .setReplyTo(email)
      .setSubject('New Contact Form Submission')
      .setPersonalization(personalization)
      .setHtml(`
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `)
      .setText(`
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        ${phone ? `Phone: ${phone}\n` : ''}
        Message:
        ${message}
      `);

    await mailerSend.email.send(emailParams);
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});