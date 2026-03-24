import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/[0.05] bg-[#020202]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="text-sm font-semibold tracking-[0.2em] uppercase text-[#EAEAEA]">YANTRA</div>
        
        <div className="flex items-center gap-8 text-xs font-medium tracking-wide uppercase text-[#555555]">
          <a href="#" className="hover:text-[#EAEAEA] active:scale-95 transition-all duration-300">About</a>
          <a href="#features" className="hover:text-[#EAEAEA] active:scale-95 transition-all duration-300">Features</a>
          <a href="#" className="hover:text-[#EAEAEA] active:scale-95 transition-all duration-300">Contact</a>
        </div>
        
        <div className="text-xs text-[#555555]">
          © {new Date().getFullYear()} Yantra. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}
