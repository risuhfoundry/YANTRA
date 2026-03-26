'use client';

import Lenis from 'lenis';
import { motion, useMotionValue, useSpring } from 'motion/react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type ExperienceContextValue = {
  isOverlayActive: boolean;
  reducedMotion: boolean;
  setOverlayState: (name: string, active: boolean) => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

const smoothEase = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

function SharedCursor({ enabled }: { enabled: boolean }) {
  const innerSize = 14;
  const outerSize = 40;
  const outerOffset = (outerSize - innerSize) / 2;
  const interactiveSelector =
    'a, button, input, textarea, select, label, summary, .hoverable, [role="button"]';
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const innerOpacity = useMotionValue(0);
  const outerOpacity = useMotionValue(0);
  const innerScale = useMotionValue(0.7);
  const outerScale = useMotionValue(1);
  const innerOpacitySpring = useSpring(innerOpacity, { damping: 32, stiffness: 520, mass: 0.2 });
  const outerOpacitySpring = useSpring(outerOpacity, { damping: 28, stiffness: 320, mass: 0.3 });
  const innerScaleSpring = useSpring(innerScale, { damping: 30, stiffness: 460, mass: 0.28 });
  const outerScaleSpring = useSpring(outerScale, { damping: 26, stiffness: 320, mass: 0.42 });

  useEffect(() => {
    const resetCursor = () => {
      cursorX.set(-100);
      cursorY.set(-100);
      innerOpacity.set(0);
      outerOpacity.set(0);
      innerScale.set(0.7);
      outerScale.set(1);
    };

    if (!enabled) {
      resetCursor();
      return;
    }

    let isVisible = false;
    let isHovered = false;

    const syncAppearance = () => {
      innerOpacity.set(isVisible ? 1 : 0);
      outerOpacity.set(isVisible ? (isHovered ? 0.76 : 0.3) : 0);
      innerScale.set(isVisible ? (isHovered ? 2.1 : 1) : 0.7);
      outerScale.set(isHovered ? 1.08 : 1);
    };

    const updatePosition = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') {
        return;
      }

      cursorX.set(event.clientX - innerSize / 2);
      cursorY.set(event.clientY - innerSize / 2);

      const target = event.target;
      const nextHovered = target instanceof Element ? Boolean(target.closest(interactiveSelector)) : false;

      if (!isVisible || nextHovered !== isHovered) {
        isVisible = true;
        isHovered = nextHovered;
        syncAppearance();
      }
    };

    const hideCursor = () => {
      if (!isVisible) {
        return;
      }

      isVisible = false;
      syncAppearance();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hideCursor();
      }
    };

    const cursorBoundary = document.documentElement;

    window.addEventListener('pointermove', updatePosition, { passive: true });
    window.addEventListener('blur', hideCursor);
    cursorBoundary.addEventListener('mouseleave', hideCursor);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pointermove', updatePosition);
      window.removeEventListener('blur', hideCursor);
      cursorBoundary.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resetCursor();
    };
  }, [cursorX, cursorY, enabled, innerOpacity, innerScale, interactiveSelector, outerOpacity, outerScale]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden rounded-full bg-white mix-blend-difference md:block"
        style={{
          x: cursorX,
          y: cursorY,
          width: innerSize,
          height: innerSize,
          opacity: innerOpacitySpring,
          scale: innerScaleSpring,
          willChange: 'transform, opacity',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[119] hidden rounded-full border border-white/18 md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: -outerOffset,
          translateY: -outerOffset,
          width: outerSize,
          height: outerSize,
          opacity: outerOpacitySpring,
          scale: outerScaleSpring,
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [overlayStates, setOverlayStates] = useState<Record<string, boolean>>({});

  const isOverlayActive = Object.values(overlayStates).some(Boolean);

  const setOverlayState = useCallback((name: string, active: boolean) => {
    setOverlayStates((current) => {
      const alreadyActive = Boolean(current[name]);

      if (alreadyActive === active) {
        return current;
      }

      if (!active) {
        const next = { ...current };
        delete next[name];
        return next;
      }

      return {
        ...current,
        [name]: true,
      };
    });
  }, []);

  useEffect(() => {
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverMedia = window.matchMedia('(hover: hover)');
    const finePointerMedia = window.matchMedia('(pointer: fine)');

    const updatePreferences = () => {
      const shouldReduceMotion = reducedMotionMedia.matches;
      const supportsCursor = hoverMedia.matches && finePointerMedia.matches && window.innerWidth >= 768;

      setReducedMotion(shouldReduceMotion);
      setCursorEnabled(!shouldReduceMotion && supportsCursor);
    };

    updatePreferences();
    reducedMotionMedia.addEventListener('change', updatePreferences);
    hoverMedia.addEventListener('change', updatePreferences);
    finePointerMedia.addEventListener('change', updatePreferences);
    window.addEventListener('resize', updatePreferences);

    return () => {
      reducedMotionMedia.removeEventListener('change', updatePreferences);
      hoverMedia.removeEventListener('change', updatePreferences);
      finePointerMedia.removeEventListener('change', updatePreferences);
      window.removeEventListener('resize', updatePreferences);
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.dataset.yantraMotion = reducedMotion ? 'reduced' : 'smooth';

    if (cursorEnabled) {
      body.dataset.yantraCursor = 'custom';
    } else {
      delete body.dataset.yantraCursor;
    }

    return () => {
      delete html.dataset.yantraMotion;
      delete body.dataset.yantraCursor;
    };
  }, [cursorEnabled, reducedMotion]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOverlayActive) {
      html.dataset.yantraOverlay = 'true';
      body.dataset.yantraOverlay = 'true';
    } else {
      delete html.dataset.yantraOverlay;
      delete body.dataset.yantraOverlay;
    }

    return () => {
      delete html.dataset.yantraOverlay;
      delete body.dataset.yantraOverlay;
    };
  }, [isOverlayActive]);

  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
      easing: smoothEase,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.05,
      anchors: true,
      stopInertiaOnNavigate: true,
      prevent: (node) => node instanceof HTMLElement && Boolean(node.closest('[data-lenis-prevent]')),
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!lenisRef.current) {
      return;
    }

    if (isOverlayActive) {
      lenisRef.current.stop();
      return;
    }

    lenisRef.current.start();
  }, [isOverlayActive]);

  const value = useMemo(
    () => ({
      isOverlayActive,
      reducedMotion,
      setOverlayState,
    }),
    [isOverlayActive, reducedMotion, setOverlayState],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
      <SharedCursor enabled={cursorEnabled} />
    </ExperienceContext.Provider>
  );
}

export function useOverlayLock(name: string, active: boolean) {
  const context = useContext(ExperienceContext);

  if (!context) {
    throw new Error('useOverlayLock must be used inside ExperienceProvider.');
  }

  const { setOverlayState } = context;

  useEffect(() => {
    setOverlayState(name, active);

    return () => {
      setOverlayState(name, false);
    };
  }, [active, name, setOverlayState]);

  return context;
}

export function useExperience() {
  const context = useContext(ExperienceContext);

  if (!context) {
    throw new Error('useExperience must be used inside ExperienceProvider.');
  }

  return context;
}
