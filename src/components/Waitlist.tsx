import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Waitlist() {
  return (
    <section className="py-32 md:py-40 bg-[#020202] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-[#EAEAEA] leading-[1.1]"
          >
            Experience the future of learning
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#777777] text-base md:text-lg mb-10 font-light"
          >
            Limited early access available. Join the waitlist today.
          </motion.p>
          
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" 
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="flex-1 px-6 py-4 sm:py-3.5 rounded-full bg-[#0A0A0A] border border-white/[0.05] text-[#EAEAEA] text-sm placeholder:text-[#555555] focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
              required
            />
            <button 
              type="submit"
              className="px-8 py-4 sm:py-3.5 bg-white text-black rounded-full font-medium text-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap group"
            >
              Join Waitlist <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
