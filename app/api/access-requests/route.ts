import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type AccessRequestBody = {
  name?: string;
  email?: string;
  message?: string;
};

function validateAccessRequest(data: AccessRequestBody) {
  const errors: string[] = [];

  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (data.message && typeof data.message !== 'string') {
    errors.push('Message must be text');
  }

  return errors;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AccessRequestBody;

    // Validate request
    const errors = validateAccessRequest(body);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(', ') }, { status: 400 });
    }

    // TODO: Store the request in a database
    // For now, just log it and return success
    console.log('Access request received:', {
      name: body.name,
      email: body.email,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your access request has been received. We will reach out to you soon!',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error processing access request:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 },
    );
  }
}
