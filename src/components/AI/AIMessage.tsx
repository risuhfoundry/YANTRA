import type { AIMessage as AIChatMessage, EditorTheme } from '@/types';

interface AIMessageProps {
  message: AIChatMessage;
  theme: EditorTheme;
}

const formatTimestamp = (timestamp: Date) =>
  new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

export const AIMessage = ({ message, theme }: AIMessageProps) => {
  const isUser = message.role === 'user';
  const isDark = theme === 'dark';

  return (
    <div className={isUser ? 'ml-auto flex w-full max-w-[88%] flex-col items-end' : 'mr-auto flex w-full max-w-[90%] flex-col items-start'}>
      <div
        className={`w-full rounded-[22px] px-4 py-3 text-sm leading-6 shadow-[0_12px_30px_rgba(15,23,42,0.16)] ${
          isUser
            ? 'rounded-br-md bg-violet-600 text-white'
            : `rounded-bl-md ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-50'}`
        }`}
      >
        <span className="whitespace-pre-wrap break-words">
          {message.content}
          {message.isStreaming ? <span className="ml-1 inline-block h-4 w-[2px] animate-pulse align-middle bg-current" /> : null}
        </span>
      </div>

      <span className={`mt-1 px-1 text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        {formatTimestamp(message.timestamp)}
      </span>
    </div>
  );
};
