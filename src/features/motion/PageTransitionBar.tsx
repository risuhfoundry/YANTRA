'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type PageTransitionBarProps = {
  reducedMotion: boolean;
  startKey: number;
  onIntent: () => void;
};

export default function PageTransitionBar({ reducedMotion, startKey, onIntent }: PageTransitionBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const isActiveRef = useRef(false);
  const hasMountedRef = useRef(false);
  const holdTimerRef = useRef<number | null>(null);
  const stepTimerRef = useRef<number | null>(null);
  const finishTimerRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    if (stepTimerRef.current) {
      window.clearInterval(stepTimerRef.current);
      stepTimerRef.current = null;
    }

    if (finishTimerRef.current) {
      window.clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a[href]');

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (anchor.target && anchor.target !== '_self') {
        return;
      }

      if (anchor.hasAttribute('download') || anchor.dataset.noTransition === 'true') {
        return;
      }

      const currentUrl = new URL(window.location.href);
      const nextUrl = new URL(anchor.href, currentUrl.href);

      if (nextUrl.origin !== currentUrl.origin) {
        return;
      }

      if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search) {
        return;
      }

      onIntent();
    };

    const handlePopState = () => {
      onIntent();
    };

    document.addEventListener('click', handleDocumentClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onIntent]);

  useEffect(() => {
    if (startKey === 0) {
      return;
    }

    clearTimers();
    isActiveRef.current = true;
    setVisible(true);
    setProgress(reducedMotion ? 28 : 10);

    holdTimerRef.current = window.setTimeout(() => {
      setProgress(reducedMotion ? 72 : 24);
    }, 70);

    stepTimerRef.current = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 88) {
          return current;
        }

        const delta = current < 36 ? 9 : current < 64 ? 4 : 1.5;
        return Math.min(88, current + delta);
      });
    }, reducedMotion ? 150 : 110);

    return clearTimers;
  }, [reducedMotion, startKey]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (!isActiveRef.current) {
      return;
    }

    clearTimers();
    setProgress(100);

    finishTimerRef.current = window.setTimeout(() => {
      isActiveRef.current = false;
      setVisible(false);
      setProgress(0);
    }, reducedMotion ? 140 : 420);

    return clearTimers;
  }, [reducedMotion, routeKey]);

  useEffect(() => clearTimers, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="yantra-page-transition-bar"
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-[140] h-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-white/8" />

          <motion.div
            className="absolute left-0 top-0 h-[3px] rounded-r-full bg-[linear-gradient(90deg,rgba(255,255,255,0.96),rgba(255,255,255,0.82),rgba(255,255,255,0.18))] shadow-[0_0_36px_rgba(255,255,255,0.72)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: reducedMotion ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="animate-yantra-loader-sheen absolute inset-0 opacity-75" />
          </motion.div>

          <motion.div
            className="absolute top-[3px] h-6 w-28 rounded-full bg-white/40 blur-[16px]"
            animate={{ left: `calc(${progress}% - 3.5rem)` }}
            transition={{ duration: reducedMotion ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="absolute top-0 h-px w-40 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-65 blur-[1px]"
            animate={{ left: `calc(${progress}% - 5rem)` }}
            transition={{ duration: reducedMotion ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
