import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function InteractiveBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Springs for the fluid blobs - different physics for depth
  const mouseX1 = useSpring(0, { stiffness: 15, damping: 40, mass: 2 });
  const mouseY1 = useSpring(0, { stiffness: 15, damping: 40, mass: 2 });
  
  const mouseX2 = useSpring(0, { stiffness: 8, damping: 50, mass: 3 });
  const mouseY2 = useSpring(0, { stiffness: 8, damping: 50, mass: 3 });

  useEffect(() => {
    setIsMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Start at center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX1.set(centerX); mouseY1.set(centerY);
    mouseX2.set(centerX); mouseY2.set(centerY);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Disable mouse tracking on mobile for performance
      mouseX1.set(e.clientX);
      mouseY1.set(e.clientY);
      mouseX2.set(e.clientX);
      mouseY2.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX1, mouseY1, mouseX2, mouseY2]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#020202] overflow-hidden">
      
      {/* Fluid Container */}
      <div className="absolute inset-0 w-full h-full opacity-60 md:opacity-60 opacity-40">
        
        {/* Ambient Blob 1 - Deep Blue */}
        <motion.div
          animate={{
            x: ['-10%', '10%', '-5%', '-10%'],
            y: ['-5%', '10%', '-10%', '-5%'],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] left-[20%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-[#1e3a8a]/20 blur-[80px] md:blur-[100px] mix-blend-screen will-change-transform"
        />

        {/* Ambient Blob 2 - Deep Emerald */}
        <motion.div
          animate={{
            x: ['10%', '-10%', '5%', '10%'],
            y: ['10%', '-5%', '10%', '10%'],
            scale: [0.9, 1.1, 1, 0.9],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[20%] w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] rounded-full bg-[#064e3b]/20 blur-[90px] md:blur-[120px] mix-blend-screen will-change-transform"
        />

        {/* Ambient Blob 3 - Deep Purple */}
        <motion.div
          animate={{
            x: ['0%', '15%', '-15%', '0%'],
            y: ['15%', '0%', '-15%', '15%'],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[40%] left-[40%] w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] rounded-full bg-[#4c1d95]/15 blur-[80px] md:blur-[100px] mix-blend-screen will-change-transform"
        />

        {/* Interactive Mouse Blobs - Hidden on Mobile */}
        {!isMobile && (
          <>
            {/* Interactive Mouse Blob 1 - Bright/White core */}
            <motion.div
              className="absolute w-[30vw] h-[30vw] rounded-full bg-white/5 blur-[80px] mix-blend-screen will-change-transform"
              style={{
                left: mouseX1,
                top: mouseY1,
                x: '-50%',
                y: '-50%',
              }}
            />

            {/* Interactive Mouse Blob 2 - Trailing colored aura */}
            <motion.div
              className="absolute w-[40vw] h-[40vw] rounded-full bg-[#3b82f6]/10 blur-[100px] mix-blend-screen will-change-transform"
              style={{
                left: mouseX2,
                top: mouseY2,
                x: '-50%',
                y: '-50%',
              }}
            />
          </>
        )}
      </div>

      {/* Dark vignette overlay to keep edges dark and focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_100%)] opacity-80" />

      {/* Noise texture for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
