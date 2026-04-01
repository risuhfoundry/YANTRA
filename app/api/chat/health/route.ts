import { NextResponse } from 'next/server';
import { getYantraAiServiceTimeoutMs, getYantraAiServiceUrl } from '@/src/lib/yantra-ai-service';

export const runtime = 'nodejs';

export async function GET() {
  const serviceUrl = getYantraAiServiceUrl();

  try {
    const response = await fetch(`${serviceUrl}/health`, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(Math.min(getYantraAiServiceTimeoutMs(), 20_000)),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Yantra backend is unavailable.', detail: payload },
        { status: response.status },
      );
    }

    return NextResponse.json({
      status: payload?.status ?? 'ok',
      backend: serviceUrl,
    });
  } catch (error) {
    console.error('Yantra health route error:', error);
    return NextResponse.json(
      { error: 'Yantra backend is unavailable right now.' },
      { status: 503 },
    );
  }
}
