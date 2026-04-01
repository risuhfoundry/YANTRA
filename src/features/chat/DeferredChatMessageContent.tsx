'use client';

import { Suspense, lazy } from 'react';

type DeferredChatMessageContentProps = {
  content: string;
  variant: 'assistant' | 'user';
};

const LazyChatMessageContent = lazy(() => import('./ChatMessageContent'));

function MessageFallback({ content, variant }: DeferredChatMessageContentProps) {
  return (
    <p className={`whitespace-pre-wrap break-words text-sm leading-relaxed ${variant === 'assistant' ? 'text-white/88' : 'text-black'}`}>
      {content}
    </p>
  );
}

export default function DeferredChatMessageContent(props: DeferredChatMessageContentProps) {
  return (
    <Suspense fallback={<MessageFallback {...props} />}>
      <LazyChatMessageContent {...props} />
    </Suspense>
  );
}
