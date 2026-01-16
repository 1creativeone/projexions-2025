import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name');
  const email = data.get('email');
  const company = data.get('company');
  const revenue = data.get('revenue');
  const message = data.get('message');

  // Validate the data
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
      }),
      { status: 400 }
    );
  }

  // TODO: Send email or save to database
  // For now, just log it or integrate with your email service
  // Examples:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Resend
  // - Or save to database (Airtable, Notion, etc.)

  console.log('Contact form submission:', {
    name,
    email,
    company,
    revenue,
    message,
    timestamp: new Date().toISOString(),
  });

  // TODO: Replace with actual email sending logic
  // Example with fetch to your email service:
  /*
  try {
    await fetch('https://api.youremailservice.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.EMAIL_API_KEY}`,
      },
      body: JSON.stringify({
        to: 'your@email.com',
        from: 'noreply@projexions.com',
        subject: `New Contact: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nRevenue: ${revenue || 'N/A'}\n\nMessage:\n${message}`,
      }),
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        message: 'Error sending message',
      }),
      { status: 500 }
    );
  }
  */

  return new Response(
    JSON.stringify({
      message: 'Message sent successfully',
    }),
    { status: 200 }
  );
};

