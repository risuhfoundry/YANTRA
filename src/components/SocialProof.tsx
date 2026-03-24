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
    <section className="py-12 md:py-16 bg-[#050505] relative z-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24 md:gap-32 lg:gap-48"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center group cursor-default"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-[#EAEAEA] tracking-tight group-hover:scale-110 transition-transform duration-500 ease-out">10K+</div>
            <div className="text-[#555555] font-semibold tracking-[0.2em] uppercase text-[10px] sm:text-xs group-hover:text-[#888888] transition-colors duration-500">Active Learners</div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center group cursor-default"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-[#EAEAEA] tracking-tight group-hover:scale-110 transition-transform duration-500 ease-out">50+</div>
            <div className="text-[#555555] font-semibold tracking-[0.2em] uppercase text-[10px] sm:text-xs group-hover:text-[#888888] transition-colors duration-500">Institutions</div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center group cursor-default"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-[#EAEAEA] tracking-tight group-hover:scale-110 transition-transform duration-500 ease-out">94%</div>
            <div className="text-[#555555] font-semibold tracking-[0.2em] uppercase text-[10px] sm:text-xs group-hover:text-[#888888] transition-colors duration-500">Success Rate</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
