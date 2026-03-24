import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function CinematicScrollText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animation values based on scroll progress
  // The component is 200vh tall, so the sticky section stays for 100vh of scrolling.
  // We want the animation to happen roughly when the section is fully in view (0.33 to 0.66)
  
  const ourX = useTransform(scrollYProgress, [0.3, 0.6], [0, -250]);
  const ourY = useTransform(scrollYProgress, [0.3, 0.6], [0, -120]);
  const ourScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.8]);
  const ourOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.6]);
  const ourBlur = useTransform(scrollYProgress, [0.3, 0.6], ["blur(0px)", "blur(4px)"]);
  
  const goalX = useTransform(scrollYProgress, [0.3, 0.6], [0, 250]);
  const goalY = useTransform(scrollYProgress, [0.3, 0.6], [0, 120]);
  const goalScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.8]);
  const goalOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.6]);
  const goalBlur = useTransform(scrollYProgress, [0.3, 0.6], ["blur(0px)", "blur(4px)"]);

  const primaryOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const primaryScale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);

  const crosshairOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const crosshairScale = useTransform(scrollYProgress, [0.45, 0.65], [0.5, 1]);
  const crosshairRotate = useTransform(scrollYProgress, [0.45, 0.65], [-45, 0]);

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-[#020202] z-20">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Crosshair Graphic */}
        <motion.div 
          style={{ opacity: crosshairOpacity, scale: crosshairScale, rotate: crosshairRotate }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-red-600/40">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-red-600/40 -translate-x-1/2" />
            {/* Horizontal Line */}
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-red-600/40 -translate-y-1/2" />
            {/* Center Target */}
            <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-red-600 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-600 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </motion.div>

        {/* Text Container */}
        <div className="relative z-10 font-bold text-6xl sm:text-8xl md:text-[120px] lg:text-[160px] leading-none tracking-tighter uppercase text-[#EAEAEA] scale-y-125">
          
          <div className="relative w-full h-full min-h-[300px] md:min-h-[500px]">
            <motion.div 
              style={{ x: ourX, y: ourY, scale: ourScale, opacity: ourOpacity, filter: ourBlur }}
              className="absolute left-1/2 top-1/2 -translate-x-[90%] -translate-y-[80%] md:-translate-x-[110%] md:-translate-y-[90%]"
            >
              OUR
            </motion.div>
            
            <motion.div 
              style={{ opacity: primaryOpacity, scale: primaryScale }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white"
            >
              PRIMARY
            </motion.div>

            <motion.div 
              style={{ x: goalX, y: goalY, scale: goalScale, opacity: goalOpacity, filter: goalBlur }}
              className="absolute left-1/2 top-1/2 translate-x-[10%] translate-y-[10%] md:translate-x-[20%] md:translate-y-[20%]"
            >
              GOAL
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
