import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function InteractiveBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Springs for the fluid blobs - different physics for depth
  const mouseX1 = useSpring(0, { stiffness: 9, damping: 54, mass: 2.8 });
  const mouseY1 = useSpring(0, { stiffness: 9, damping: 54, mass: 2.8 });
  
  const mouseX2 = useSpring(0, { stiffness: 5, damping: 62, mass: 3.8 });
  const mouseY2 = useSpring(0, { stiffness: 5, damping: 62, mass: 3.8 });

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
      <div className="absolute inset-0 w-full h-full opacity-80">
        <motion.div
          animate={{
            y: ['0%', '4%', '0%'],
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.28, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-x-[18%] top-[4%] h-[38rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_32%,rgba(0,0,0,0)_72%)] blur-[110px]"
        />

        <motion.div
          animate={{
            rotate: [0, 18, 0],
            scale: [1, 1.08, 1],
            opacity: [0.22, 0.35, 0.22],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-[10%] h-[52rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,rgba(125,211,252,0.06)_28%,rgba(0,0,0,0)_68%)] blur-[70px]"
        />

        <motion.div
          animate={{
            rotate: [12, -10, 12],
            x: ['-4%', '4%', '-4%'],
            opacity: [0.16, 0.26, 0.16],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[14%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.16)_0%,rgba(148,163,184,0.05)_35%,rgba(0,0,0,0)_70%)] blur-[90px]"
        />

        <motion.div
          animate={{
            rotate: [-10, 8, -10],
            y: ['4%', '-3%', '4%'],
            opacity: [0.14, 0.24, 0.14],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.12)_0%,rgba(251,191,36,0.04)_36%,rgba(0,0,0,0)_70%)] blur-[95px]"
        />
        
        {/* Ambient Blob 1 */}
        <motion.div
          animate={{
            x: ['-10%', '10%', '-5%', '-10%'],
            y: ['-5%', '10%', '-10%', '-5%'],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[4%] left-[8%] h-[74vw] w-[74vw] rounded-full bg-white/[0.1] blur-[90px] md:h-[44vw] md:w-[44vw] md:blur-[120px] mix-blend-screen will-change-transform"
        />

        {/* Ambient Blob 2 */}
        <motion.div
          animate={{
            x: ['10%', '-10%', '5%', '10%'],
            y: ['10%', '-5%', '10%', '10%'],
            scale: [0.9, 1.1, 1, 0.9],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[8%] right-[12%] h-[84vw] w-[84vw] rounded-full bg-slate-400/[0.1] blur-[90px] md:h-[54vw] md:w-[54vw] md:blur-[120px] mix-blend-screen will-change-transform"
        />

        {/* Ambient Blob 3 */}
        <motion.div
          animate={{
            x: ['0%', '15%', '-15%', '0%'],
            y: ['15%', '0%', '-15%', '15%'],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[38%] top-[34%] h-[68vw] w-[68vw] rounded-full bg-amber-400/[0.09] blur-[85px] md:h-[40vw] md:w-[40vw] md:blur-[110px] mix-blend-screen will-change-transform"
        />

        {/* Interactive Mouse Blobs - Hidden on Mobile */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute h-[28vw] w-[28vw] rounded-full bg-white/[0.05] blur-[90px] mix-blend-screen will-change-transform"
              style={{
                left: mouseX1,
                top: mouseY1,
                x: '-50%',
                y: '-50%',
              }}
            />

            <motion.div
              className="absolute h-[36vw] w-[36vw] rounded-full bg-slate-300/[0.08] blur-[120px] mix-blend-screen will-change-transform"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,2,2,0.08)_0%,rgba(2,2,2,0.48)_55%,#020202_100%)] opacity-90" />

      {/* Noise texture for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:100%_4px] mix-blend-soft-light" />
    </div>
  );
}
