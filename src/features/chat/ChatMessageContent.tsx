'use client';

import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import KatexStyleLoader from './KatexStyleLoader';

type ChatMessageContentProps = {
  content: string;
  variant: 'assistant' | 'user';
};

export default function ChatMessageContent({ content, variant }: ChatMessageContentProps) {
  const isAssistant = variant === 'assistant';
  const proseTextClass = isAssistant ? 'text-white/88' : 'text-black';
  const mutedTextClass = isAssistant ? 'text-white/72' : 'text-black/80';
  const borderClass = isAssistant ? 'border-white/10 bg-black/30' : 'border-black/10 bg-black/5';
  const inlineCodeClass = isAssistant ? 'bg-white/10 text-white' : 'bg-black/10 text-black';
  const linkClass = isAssistant ? 'text-white underline decoration-white/30 underline-offset-4' : 'text-black underline decoration-black/30 underline-offset-4';

  return (
    <div className={`yantra-markdown space-y-4 text-sm leading-relaxed ${proseTextClass}`}>
      <KatexStyleLoader />
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => <p className={`whitespace-pre-wrap break-words ${proseTextClass}`}>{children}</p>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => <ul className={`list-disc space-y-2 pl-5 ${proseTextClass}`}>{children}</ul>,
          ol: ({ children }) => <ol className={`list-decimal space-y-2 pl-5 ${proseTextClass}`}>{children}</ol>,
          li: ({ children }) => <li className="break-words">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className={`border-l-2 pl-4 italic ${isAssistant ? 'border-white/25 text-white/76' : 'border-black/20 text-black/80'}`}>
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              {children}
            </a>
          ),
          code: ({ children, className }) => {
            const languageMatch = className?.match(/language-(\w+)/);
            const isBlock = Boolean(languageMatch);

            if (isBlock) {
              return (
                <code className={`block overflow-x-auto rounded-2xl border px-4 py-3 font-mono text-[13px] leading-6 ${borderClass}`}>
                  {children}
                </code>
              );
            }

            return (
              <code className={`rounded-md px-1.5 py-0.5 font-mono text-[13px] ${inlineCodeClass}`}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="overflow-x-auto">{children}</pre>,
          hr: () => <hr className={`border-t ${isAssistant ? 'border-white/12' : 'border-black/10'}`} />,
          h1: ({ children }) => <h1 className="text-lg font-semibold">{children}</h1>,
          h2: ({ children }) => <h2 className="text-base font-semibold">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">{children}</h3>,
          table: ({ children }) => <table className={`w-full border-collapse text-left ${mutedTextClass}`}>{children}</table>,
          thead: ({ children }) => <thead className={isAssistant ? 'border-b border-white/12' : 'border-b border-black/10'}>{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className={isAssistant ? 'border-b border-white/8' : 'border-b border-black/8'}>{children}</tr>,
          th: ({ children }) => <th className="px-2 py-2 font-medium">{children}</th>,
          td: ({ children }) => <td className="px-2 py-2 align-top">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
