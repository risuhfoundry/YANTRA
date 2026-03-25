import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Waitlist() {
  return (
    <section id="waitlist" className="py-32 md:py-40 bg-[#020202] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] px-6 py-14 sm:px-10 md:px-14"
        >
          <div className="absolute -left-20 top-10 h-48 w-48 rounded-full bg-white/[0.05] blur-3xl" />
          <div className="absolute bottom-0 right-10 h-40 w-40 rounded-full bg-amber-500/[0.08] blur-3xl" />
          <div className="section-kicker mb-6">Early access</div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-[#EAEAEA] leading-[1.08]"
          >
            Start with a sharper first version of your learning journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-10 max-w-2xl text-base text-[#98A2B3] md:text-lg"
          >
            Limited early access is open for learners and institutions that want structured AI guidance with real job alignment from day one.
          </motion.p>
          
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row" 
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="flex-1 rounded-full border border-white/[0.08] bg-black/30 px-6 py-4 text-sm text-[#EAEAEA] placeholder:text-[#667085] transition-all focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 sm:py-3.5"
              required
            />
            <button 
              type="submit"
              className="group flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:py-3.5"
            >
              Join Waitlist <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
