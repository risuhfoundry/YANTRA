import {
  MAX_PERSISTED_CHAT_MESSAGES,
  normalizeYantraChatMessages,
  type YantraChatMessage,
} from '@/src/features/chat/yantra-chat';
import { getAuthenticatedUser } from './profiles';
import { createClient } from './server';

type ChatHistoryRow = {
  user_id: string;
  messages: unknown;
  created_at?: string | null;
  updated_at?: string | null;
};

export async function getAuthenticatedChatHistory() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from('chat_histories').select('*').eq('user_id', user.id).maybeSingle();

  if (error) {
    throw error;
  }

  const row = (data as ChatHistoryRow | null) ?? null;

  return {
    user,
    messages: normalizeYantraChatMessages(row?.messages, MAX_PERSISTED_CHAT_MESSAGES),
  };
}

export async function upsertAuthenticatedChatHistory(messages: YantraChatMessage[]) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return null;
  }

  const safeMessages = normalizeYantraChatMessages(messages, MAX_PERSISTED_CHAT_MESSAGES);
  const supabase = await createClient();
  const { error } = await supabase
    .from('chat_histories')
    .upsert(
      {
        user_id: user.id,
        messages: safeMessages,
      },
      { onConflict: 'user_id' },
    );

  if (error) {
    throw error;
  }

  return {
    user,
    messages: safeMessages,
  };
}
