import { NextResponse } from 'next/server';
import {
  createAccessRequest,
  normalizeAccessRequest,
  validateAccessRequest,
} from '@/src/lib/supabase/access-requests';
import { hasSupabaseEnv } from '@/src/lib/supabase/env';

export const runtime = 'nodejs';

type AccessRequestBody = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json({ error: 'Supabase is not configured yet.' }, { status: 500 });
  }

  try {
    const body = (await request.json()) as AccessRequestBody;

    const errors = validateAccessRequest(body);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(', ') }, { status: 400 });
    }

    await createAccessRequest(normalizeAccessRequest(body));

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
