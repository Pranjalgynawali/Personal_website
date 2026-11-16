const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendContactMessage(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { status: 400, body: { error: 'Please enter your contact details and message.' } };
  }

  if (typeof payload.website === 'string' && payload.website.trim()) {
    return { status: 200, body: { ok: true } };
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || name.length > 100 || /[\r\n]/.test(name)) {
    return { status: 400, body: { error: 'Please enter a valid name.' } };
  }
  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return { status: 400, body: { error: 'Please enter a valid email address.' } };
  }
  if (!message || message.length > 5000) {
    return { status: 400, body: { error: 'Please enter a message under 5,000 characters.' } };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL_TO;
  const sender = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !recipient || !sender) {
    return { status: 503, body: { error: 'The contact form is not configured yet. Please email gyawalipranjal231@gmail.com directly.' } };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Website message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error('Resend rejected contact email:', response.status);
      return { status: 502, body: { error: 'Your message could not be sent right now. Please try again later.' } };
    }

    return { status: 200, body: { ok: true } };
  } catch (error) {
    console.error('Unable to send contact email:', error);
    return { status: 502, body: { error: 'Your message could not be sent right now. Please try again later.' } };
  }
}

module.exports = { sendContactMessage };