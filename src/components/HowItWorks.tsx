import { motion } from 'motion/react';

const steps = [
  {
    num: "01",
    title: "Take a quick AI skill assessment",
    desc: "We figure out exactly where you are and what you need to learn."
  },
  {
    num: "02",
    title: "Get your personalized roadmap",
    desc: "A custom curriculum generated instantly to reach your goals."
  },
  {
    num: "03",
    title: "Learn → get certified → get hired",
    desc: "Master the skills, prove your knowledge, and land the job."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16 md:mb-24 text-center text-[#EAEAEA] leading-[1.1]"
        >
          How it works
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row gap-12 md:gap-16 relative"
        >
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
          
          {/* Connecting line for mobile */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.1] to-transparent" />
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex-1 relative flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-0"
            >
              <div className="w-16 h-16 shrink-0 rounded-full bg-[#0A0A0A] border border-white/[0.1] flex items-center justify-center text-xl font-mono text-white md:mb-8 z-10 relative shadow-[0_0_30px_rgba(255,255,255,0.03)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-shadow">
                {step.num}
              </div>
              <div className="pt-3 md:pt-0">
                <h3 className="text-lg font-semibold mb-2 text-left md:text-center text-[#EAEAEA] tracking-tight">{step.title}</h3>
                <p className="text-[#777777] text-sm text-left md:text-center leading-relaxed font-light">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
