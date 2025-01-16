import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

const mailerSend = new MailerSend({
  apiKey: import.meta.env.VITE_MAILERSEND_API_KEY || '',
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const sentFrom = new Sender('contact@fellyph.com.br', 'Contact Form');
  const recipients = [
    new Recipient('your@email.com', 'Your Name')
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('New Contact Form Submission')
    .setHtml(`
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `);

  try {
    await mailerSend.email.send(emailParams);
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
}