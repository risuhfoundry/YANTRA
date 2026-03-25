import { ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 lg:pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="absolute inset-x-0 top-[16%] mx-auto h-96 max-w-4xl rounded-full bg-white/[0.06] blur-3xl" />
      <div className="absolute left-1/2 top-[34%] h-64 w-[42rem] -translate-x-1/2 rounded-full bg-sky-300/[0.07] blur-[120px]" />

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="container relative z-10 mx-auto max-w-[1080px] px-6 text-center md:px-12 lg:px-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="section-kicker mb-8"
        >
          Intelligent learning OS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-bold leading-[1.02] tracking-[-0.04em] text-[#F2F4F7] sm:text-4xl md:text-5xl lg:text-6xl"
        >
          AI learning,
          <span className="block text-white/55">real job outcomes.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 mt-5 max-w-2xl text-base leading-relaxed text-[#A9B4C5] sm:text-lg md:mb-12"
        >
          Yantra maps your level, personalizes the path, and keeps every lesson tied to job-ready progress.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#waitlist"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-transform duration-300 sm:w-auto"
          >
            Start for Free <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#features"
            className="glass flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-[#D0D5DD] transition-colors duration-300 hover:text-white sm:w-auto"
          >
            <PlayCircle className="w-4 h-4" /> Watch Demo
          </motion.a>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
          {[
            ['01', 'Skill diagnosis', 'Maps your current level before it recommends the next move.'],
            ['02', 'Adaptive roadmap', 'Reorders lessons around your goals, speed, and confidence.'],
            ['03', 'Hiring signal', 'Keeps projects, certifications, and job readiness tied together.'],
          ].map(([num, title, desc]) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: num === '01' ? 0.3 : num === '02' ? 0.38 : 0.46,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass rounded-3xl p-5"
            >
              <div className="mb-3 font-mono text-[11px] font-semibold tracking-[0.24em] text-white/45">{num}</div>
              <h3 className="mb-2 text-base font-semibold tracking-tight text-[#EAEAEA]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#98A2B3]">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
