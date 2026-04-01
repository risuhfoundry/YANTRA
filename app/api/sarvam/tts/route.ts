import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SARVAM_TTS_URL = 'https://api.sarvam.ai/text-to-speech';

type TtsBody = {
  text?: string;
  languageCode?: string;
};

function requireSarvamKey() {
  const key = process.env.SARVAM_API_KEY?.trim();

  if (!key) {
    throw new Error('Missing SARVAM_API_KEY in the Next.js environment.');
  }

  return key;
}

function chooseLanguageCode(languageCode?: string) {
  const requested = languageCode?.trim();
  if (requested && requested !== 'unknown') {
    return requested;
  }

  return process.env.YANTRA_SARVAM_TTS_LANGUAGE?.trim() || 'en-IN';
}

function chooseSpeaker() {
  return process.env.YANTRA_SARVAM_TTS_SPEAKER?.trim() || 'anand';
}

function chooseModel() {
  return process.env.YANTRA_SARVAM_TTS_MODEL?.trim() || 'bulbul:v3';
}

function normalizeBase64Audio(data: unknown) {
  if (typeof data === 'string' && data.trim()) {
    return data.trim();
  }

  if (Array.isArray(data) && typeof data[0] === 'string' && data[0].trim()) {
    return data[0].trim();
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as TtsBody;
    const text = body.text?.trim();

    if (!text) {
      return NextResponse.json({ error: 'Text is required.' }, { status: 400 });
    }

    const response = await fetch(SARVAM_TTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': requireSarvamKey(),
      },
      cache: 'no-store',
      body: JSON.stringify({
        text,
        target_language_code: chooseLanguageCode(body.languageCode),
        speaker: chooseSpeaker(),
        model: chooseModel(),
        pace: Number.parseFloat(process.env.YANTRA_SARVAM_TTS_PACE?.trim() || '0.94'),
        speech_sample_rate: 24000,
        enable_preprocessing: true,
        output_audio_codec: 'wav',
      }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      audio?: string;
      audios?: string[];
      error?: { message?: string };
      detail?: string;
    };

    const base64Audio = normalizeBase64Audio(data.audio) || normalizeBase64Audio(data.audios);

    if (!response.ok || !base64Audio) {
      return NextResponse.json(
        {
          error:
            data.error?.message ||
            data.detail ||
            'Sarvam could not synthesize speech.',
        },
        { status: response.status || 500 },
      );
    }

    const audioBuffer = Buffer.from(base64Audio, 'base64');

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Sarvam TTS route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Sarvam TTS failed.' },
      { status: 500 },
    );
  }
}
