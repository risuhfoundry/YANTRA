import { SendHorizontal, Square } from 'lucide-react';
import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { AIMessage } from '@/components/AI/AIMessage';
import type { AIMessage as AIChatMessage, EditorTheme } from '@/types';

interface AIChatInterfaceProps {
  messages: AIChatMessage[];
  theme: EditorTheme;
  draft: string;
  error: string | null;
  isStreaming: boolean;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  onStop: () => void;
}

export const AIChatInterface = ({
  messages,
  theme,
  draft,
  error,
  isStreaming,
  onDraftChange,
  onSend,
  onStop,
}: AIChatInterfaceProps) => {
  const endRef = useRef<HTMLDivElement | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isStreaming]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {messages.length > 0 ? (
          <div className="space-y-3">
            {messages.map((message) => (
              <AIMessage key={message.id} message={message} theme={theme} />
            ))}
            <div ref={endRef} />
          </div>
        ) : (
          <div
            className={`flex h-full min-h-[220px] items-center justify-center rounded-[24px] border border-dashed px-6 text-center text-sm leading-6 ${
              isDark ? 'border-white/10 text-slate-400' : 'border-slate-900/10 text-slate-500'
            }`}
          >
            Ask for a hint, request a review, or type your own question about the active file.
          </div>
        )}
      </div>

      <div className="border-t px-4 py-4" style={{ borderColor: 'var(--yantra-border)' }}>
        {error ? (
          <div
            className={`mb-3 rounded-2xl border px-3 py-2 text-xs leading-5 ${
              isDark ? 'border-rose-500/20 bg-rose-500/10 text-rose-200' : 'border-rose-500/20 bg-rose-500/8 text-rose-700'
            }`}
          >
            {error}
          </div>
        ) : null}

        <div
          className={`rounded-[24px] border px-3 py-3 ${
            isDark ? 'bg-white/[0.03]' : 'bg-white/90'
          }`}
          style={{ borderColor: 'var(--yantra-border)' }}
        >
          <textarea
            rows={2}
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI…"
            className={`w-full resize-none bg-transparent text-sm leading-6 outline-none ${
              isDark ? 'text-slate-100 placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'
            }`}
          />

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Enter to send, Shift+Enter for a new line.</p>

            <div className="flex items-center gap-2">
              {isStreaming ? (
                <button
                  type="button"
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${
                    isDark
                      ? 'border-white/10 bg-white/5 text-slate-100 hover:bg-white/10'
                      : 'border-slate-900/10 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                  onClick={onStop}
                >
                  <Square className="h-3.5 w-3.5 fill-current" />
                  Stop
                </button>
              ) : null}

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white shadow-[0_10px_24px_rgba(124,58,237,0.28)] transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-violet-400/60"
                onClick={onSend}
                disabled={draft.trim().length === 0 || isStreaming}
                aria-label="Send AI message"
                title="Send AI message"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
