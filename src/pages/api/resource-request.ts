import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get('email');
  const resourceSlug = data.get('resource');

  // Validate the data
  if (!email || !resourceSlug) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
      }),
      { status: 400 }
    );
  }

  // TODO: Send email with resource link or add to email list
  // Examples:
  // - SendGrid with template
  // - Mailchimp list
  // - ConvertKit
  // - Or save to database and send via cron job

  console.log('Resource request:', {
    email,
    resourceSlug,
    timestamp: new Date().toISOString(),
  });

  // TODO: Replace with actual email service integration
  // This should send the resource link to the user's email
  // and optionally add them to your email list

  return new Response(
    JSON.stringify({
      message: 'Resource sent to your email',
    }),
    { status: 200 }
  );
};

