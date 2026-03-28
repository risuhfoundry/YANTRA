import { GoogleGenAI, type Content } from '@google/genai';
import { NextResponse } from 'next/server';
import {
  buildDocsSupportContext,
  DOCS_SUPPORT_MODEL,
  docsSupportSystemPrompt,
  normalizeDocsSupportMessages,
  type DocsSupportMessage,
} from '@/src/features/docs/docs-support';

export const runtime = 'nodejs';

type DocsSupportRequestBody = {
  messages?: DocsSupportMessage[];
  activeSlug?: string | null;
};

function toGeminiContent(message: DocsSupportMessage): Content {
  return {
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.content }],
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DocsSupportRequestBody;
    const messages = normalizeDocsSupportMessages(body.messages);

    if (messages.length === 0) {
      return NextResponse.json({ error: 'A support question is required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing Gemini API key. Set GEMINI_API_KEY in your environment.' },
        { status: 500 },
      );
    }

    const query = messages
      .filter((message) => message.role === 'user')
      .map((message) => message.content)
      .join('\n');
    const { currentArticle, context, sources } = buildDocsSupportContext(query, body.activeSlug);

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: DOCS_SUPPORT_MODEL,
      contents: messages.map(toGeminiContent),
      config: {
        systemInstruction: `${docsSupportSystemPrompt}

Current docs page:
${currentArticle ? `${currentArticle.title} (${currentArticle.slug})` : 'Docs home or no specific article selected'}

Available docs context:
${context}`,
        temperature: 0.35,
        maxOutputTokens: 800,
      },
    });

    const reply = response.text?.trim();

    if (!reply) {
      throw new Error('Support Desk returned an empty response.');
    }

    return NextResponse.json({ reply, sources });
  } catch (error) {
    console.error('Docs support error:', error);

    return NextResponse.json(
      { error: 'Support Desk is unavailable right now. Please try again in a moment.' },
      { status: 500 },
    );
  }
}
