import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SARVAM_STT_URL = 'https://api.sarvam.ai/speech-to-text';

function requireSarvamKey() {
  const key = process.env.SARVAM_API_KEY?.trim();

  if (!key) {
    throw new Error('Missing SARVAM_API_KEY in the Next.js environment.');
  }

  return key;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Audio file is required.' }, { status: 400 });
    }

    const payload = new FormData();
    payload.append('file', file, file.name || 'yantra-room.webm');
    payload.append('model', process.env.YANTRA_SARVAM_STT_MODEL?.trim() || 'saaras:v3');
    payload.append('language_code', process.env.YANTRA_SARVAM_STT_LANGUAGE?.trim() || 'unknown');
    payload.append('with_timestamps', 'false');
    payload.append('with_diarization', 'false');

    const mode = process.env.YANTRA_SARVAM_STT_MODE?.trim();
    if (mode) {
      payload.append('mode', mode);
    }

    const response = await fetch(SARVAM_STT_URL, {
      method: 'POST',
      headers: {
        'api-subscription-key': requireSarvamKey(),
      },
      body: payload,
      cache: 'no-store',
    });

    const data = (await response.json().catch(() => ({}))) as {
      transcript?: string;
      language_code?: string;
      error?: { message?: string };
      detail?: string;
    };

    if (!response.ok || !data.transcript?.trim()) {
      return NextResponse.json(
        {
          error:
            data.error?.message ||
            data.detail ||
            'Sarvam could not transcribe the audio.',
        },
        { status: response.status || 500 },
      );
    }

    return NextResponse.json({
      transcript: data.transcript.trim(),
      languageCode: data.language_code ?? null,
    });
  } catch (error) {
    console.error('Sarvam STT route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Sarvam STT failed.' },
      { status: 500 },
    );
  }
}
