import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function B2BSection() {
  return (
    <section id="b2b" className="py-24 md:py-32 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl p-8 sm:p-12 md:p-16 bg-[#0A0A0A] border border-white/[0.05] relative overflow-hidden group"
        >
          {/* Subtle hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] font-semibold tracking-[0.2em] uppercase mb-8"
              >
                For Schools & Institutions
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-[#EAEAEA] leading-[1.1]"
              >
                Upgrade Your Computer Science Education
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#777777] text-base md:text-lg mb-10 leading-relaxed font-light"
              >
                Empower your educators and give your students the tools they need to succeed in the modern tech landscape.
              </motion.p>
              
              <ul className="space-y-4 mb-10">
                {['Replace outdated curriculum', 'AI-powered teaching assistant', 'Track student progress in real-time'].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                    className="flex items-center gap-3 text-[#EAEAEA] text-sm md:text-base font-light"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white/30 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="w-full sm:w-auto px-8 py-4 sm:py-3.5 bg-white text-black rounded-full font-medium text-sm hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                Book a Demo
              </motion.button>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[300px] sm:h-[400px] rounded-2xl border border-white/[0.05] bg-[#020202] overflow-hidden flex items-center justify-center group/mockup"
            >
              {/* Abstract representation of dashboard */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="p-6 rounded-xl w-3/4 bg-[#0A0A0A] border border-white/[0.05] shadow-2xl group-hover/mockup:scale-105 transition-transform duration-700 ease-out">
                <div className="flex gap-2 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-white/5 rounded w-1/3" />
                  <div className="h-20 bg-white/[0.02] rounded w-full" />
                  <div className="flex gap-3">
                    <div className="h-24 bg-white/[0.02] rounded w-1/2" />
                    <div className="h-24 bg-white/[0.02] rounded w-1/2" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
