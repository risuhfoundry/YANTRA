'use client';

import { useEffect } from 'react';

const KATEX_STYLES_ID = 'yantra-katex-styles';
const KATEX_STYLES_HREF = 'https://cdn.jsdelivr.net/npm/katex@0.16.43/dist/katex.min.css';

export default function KatexStyleLoader() {
  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(KATEX_STYLES_ID)) {
      return;
    }

    const link = document.createElement('link');
    link.id = KATEX_STYLES_ID;
    link.rel = 'stylesheet';
    link.href = KATEX_STYLES_HREF;
    document.head.appendChild(link);
  }, []);

  return null;
}
