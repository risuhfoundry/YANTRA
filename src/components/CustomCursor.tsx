import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorX = useSpring(mouseX, { stiffness: 460, damping: 38, mass: 0.38 });
  const cursorY = useSpring(mouseY, { stiffness: 460, damping: 38, mass: 0.38 });

  const ringX = useSpring(mouseX, { stiffness: 220, damping: 30, mass: 0.85 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 30, mass: 0.85 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();
    mediaQuery.addEventListener('change', updateEnabled);

    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      const target = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;
      setInteractive(Boolean(target?.closest('a, button, input, textarea, select, [role="button"]')));
    };

    const handleLeaveWindow = () => {
      mouseX.set(-100);
      mouseY.set(-100);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('blur', handleLeaveWindow);

    return () => {
      mediaQuery.removeEventListener('change', updateEnabled);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('blur', handleLeaveWindow);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] blur-3xl mix-blend-screen"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: interactive ? 1.2 : 0.9,
          opacity: interactive ? 0.3 : 0.12,
        }}
        transition={{ type: 'spring', stiffness: 170, damping: 22 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[121] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/18 bg-black/10 backdrop-blur-[6px]"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: interactive ? 42 : 30,
          height: interactive ? 42 : 30,
          borderColor: interactive ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.18)',
          backgroundColor: interactive ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.18)',
        }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
      >
        <motion.div
          className="absolute inset-[5px] rounded-full border border-white/[0.08]"
          animate={{
            opacity: interactive ? 0.85 : 0.4,
            scale: interactive ? 0.92 : 1,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[122] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.35)]"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: interactive ? 0.75 : 1,
          opacity: interactive ? 0.95 : 0.92,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      />
    </>
  );
}
