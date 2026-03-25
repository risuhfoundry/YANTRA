import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function SocialProof() {
  return (
    <section className="relative z-10 py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="glass soft-grid flex flex-col items-center justify-center gap-10 rounded-[2rem] px-6 py-10 sm:flex-row sm:gap-16 md:gap-24 md:px-10"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center group cursor-default"
          >
            <div className="mb-2 text-4xl font-bold tracking-tight text-[#EAEAEA] transition-transform duration-500 ease-out group-hover:scale-110 sm:text-5xl md:text-6xl">10K+</div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7B8592] transition-colors duration-500 group-hover:text-[#A5B0BE] sm:text-xs">Active Learners</div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center group cursor-default"
          >
            <div className="mb-2 text-4xl font-bold tracking-tight text-[#EAEAEA] transition-transform duration-500 ease-out group-hover:scale-110 sm:text-5xl md:text-6xl">50+</div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7B8592] transition-colors duration-500 group-hover:text-[#A5B0BE] sm:text-xs">Institutions</div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center group cursor-default"
          >
            <div className="mb-2 text-4xl font-bold tracking-tight text-[#EAEAEA] transition-transform duration-500 ease-out group-hover:scale-110 sm:text-5xl md:text-6xl">94%</div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7B8592] transition-colors duration-500 group-hover:text-[#A5B0BE] sm:text-xs">Success Rate</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
