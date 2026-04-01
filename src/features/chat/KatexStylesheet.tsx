'use client';

import { useEffect } from 'react';

const KATEX_STYLESHEET_ID = 'yantra-katex-stylesheet';
const KATEX_STYLESHEET_HREF = 'https://cdn.jsdelivr.net/npm/katex@0.16.43/dist/katex.min.css';

export default function KatexStylesheet() {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    if (document.getElementById(KATEX_STYLESHEET_ID)) {
      return;
    }

    const link = document.createElement('link');
    link.id = KATEX_STYLESHEET_ID;
    link.rel = 'stylesheet';
    link.href = KATEX_STYLESHEET_HREF;
    document.head.appendChild(link);
  }, []);

  return null;
}
