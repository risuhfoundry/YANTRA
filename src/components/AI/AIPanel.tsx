import { Eraser, ScanSearch, Sparkles, WandSparkles, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { streamHint, streamReview } from '@/api/ai';
import { AIChatInterface } from '@/components/AI/AIChatInterface';
import { useEditorStore } from '@/store/useEditorStore';
import type { AIRequestPayload, EditorFile, EditorTheme } from '@/types';

interface AIPanelProps {
  file: EditorFile | null;
  theme: EditorTheme;
}

type PanelStreamMode = 'hint' | 'review';

const PANEL_WIDTH = 340;

export const AIPanel = ({ file, theme }: AIPanelProps) => {
  const aiPanel = useEditorStore((state) => state.aiPanel);
  const setAIPanelOpen = useEditorStore((state) => state.setAIPanelOpen);
  const sendAIMessage = useEditorStore((state) => state.sendAIMessage);
  const appendStreamToken = useEditorStore((state) => state.appendStreamToken);
  const setAIMessageStreaming = useEditorStore((state) => state.setAIMessageStreaming);
  const clearAIChat = useEditorStore((state) => state.clearAIChat);

  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const activeMessageIdRef = useRef<string | null>(null);
  const isDark = theme === 'dark';
  const isStreaming = aiPanel.messages.some((message) => message.isStreaming);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();

    const activeMessageId = activeMessageIdRef.current;

    if (activeMessageId) {
      setAIMessageStreaming(activeMessageId, false);
    }

    activeMessageIdRef.current = null;
    abortRef.current = null;
  }, [setAIMessageStreaming]);

  const streamPanelResponse = useCallback(
    async ({
      mode,
      payload,
      userMessage,
    }: {
      mode: PanelStreamMode;
      payload: AIRequestPayload;
      userMessage?: string;
    }) => {
      if (!file) {
        setError('Open a file before asking Yantra AI for help.');
        setAIPanelOpen(true);
        return;
      }

      stopStreaming();
      setError(null);
      setAIPanelOpen(true);

      if (userMessage) {
        sendAIMessage({
          role: 'user',
          content: userMessage,
        });
      }

      const assistantMessageId = sendAIMessage({
        role: 'assistant',
        content: '',
        isStreaming: true,
      });

      const controller = new AbortController();
      abortRef.current = controller;
      activeMessageIdRef.current = assistantMessageId;

      try {
        if (mode === 'review') {
          await streamReview(payload, {
            signal: controller.signal,
            onToken: (token) => appendStreamToken(assistantMessageId, token),
          });
        } else {
          await streamHint(payload, {
            signal: controller.signal,
            onToken: (token) => appendStreamToken(assistantMessageId, token),
          });
        }
      } catch (streamError) {
        if (!(streamError instanceof DOMException && streamError.name === 'AbortError')) {
          const message =
            streamError instanceof Error ? streamError.message : 'Yantra AI could not complete this request.';

          appendStreamToken(assistantMessageId, message);
          setError(message);
        }
      } finally {
        setAIMessageStreaming(assistantMessageId, false);

        if (abortRef.current === controller) {
          abortRef.current = null;
        }

        if (activeMessageIdRef.current === assistantMessageId) {
          activeMessageIdRef.current = null;
        }
      }
    },
    [appendStreamToken, file, sendAIMessage, setAIMessageStreaming, setAIPanelOpen, stopStreaming],
  );

  const handleQuickAction = (mode: PanelStreamMode) => {
    if (!file) {
      setError('Open a file before asking Yantra AI for help.');
      setAIPanelOpen(true);
      return;
    }

    const actionLabel = mode === 'review' ? 'Review Code' : 'Get Hint';

    void streamPanelResponse({
      mode,
      userMessage: actionLabel,
      payload: {
        code: file.content,
        language: file.language,
        task: mode,
      },
    });
  };

  const handleSend = () => {
    if (!file) {
      setError('Open a file before asking Yantra AI for help.');
      setAIPanelOpen(true);
      return;
    }

    const nextDraft = draft.trim();

    if (!nextDraft) {
      return;
    }

    setDraft('');

    void streamPanelResponse({
      mode: 'hint',
      userMessage: nextDraft,
      payload: {
        code: file.content,
        language: file.language,
        task: nextDraft,
      },
    });
  };

  return (
    <div
      className="relative shrink-0 overflow-hidden border-l transition-[width] duration-300 ease-out"
      style={{
        width: aiPanel.open ? PANEL_WIDTH : 0,
        borderColor: aiPanel.open ? 'var(--yantra-border)' : 'transparent',
      }}
    >
      <aside
        className={`absolute inset-y-0 right-0 flex h-full w-[340px] flex-col transition-all duration-300 ease-out ${
          aiPanel.open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0 pointer-events-none'
        }`}
        style={{
          background: isDark ? 'rgba(10, 10, 16, 0.96)' : 'rgba(245, 243, 255, 0.96)',
        }}
      >
        <div className="border-b px-4 py-4" style={{ borderColor: 'var(--yantra-border)' }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className={`mb-1 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>
                <Sparkles className="h-3.5 w-3.5" />
                Yantra Intelligence
              </div>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-950'}`}>Yantra AI</h2>
            </div>

            <button
              type="button"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
                isDark
                  ? 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                  : 'border-slate-900/10 bg-white text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setAIPanelOpen(false)}
              aria-label="Close AI panel"
              title="Close AI panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-3 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(124,58,237,0.28)] transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-violet-400/60"
              onClick={() => handleQuickAction('hint')}
              disabled={!file || isStreaming}
            >
              <WandSparkles className="h-3.5 w-3.5" />
              Get Hint
            </button>

            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                isDark
                  ? 'border-white/10 bg-white/5 text-slate-100 hover:bg-white/10'
                  : 'border-slate-900/10 bg-white text-slate-700 hover:bg-slate-50'
              } disabled:cursor-not-allowed disabled:opacity-60`}
              onClick={() => handleQuickAction('review')}
              disabled={!file || isStreaming}
            >
              <ScanSearch className="h-3.5 w-3.5" />
              Review Code
            </button>

            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                isDark
                  ? 'border-white/10 bg-white/5 text-slate-100 hover:bg-white/10'
                  : 'border-slate-900/10 bg-white text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => {
                stopStreaming();
                clearAIChat();
                setError(null);
              }}
            >
              <Eraser className="h-3.5 w-3.5" />
              Clear
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1">
          <AIChatInterface
            messages={aiPanel.messages}
            theme={theme}
            draft={draft}
            error={error}
            isStreaming={isStreaming}
            onDraftChange={setDraft}
            onSend={handleSend}
            onStop={stopStreaming}
          />
        </div>
      </aside>
    </div>
  );
};
