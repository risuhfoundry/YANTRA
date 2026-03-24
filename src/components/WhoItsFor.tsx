import { motion } from 'motion/react';

const audiences = [
  {
    title: "Students",
    desc: "Supplement your university education with real-world, practical skills that employers actually want."
  },
  {
    title: "Self-learners",
    desc: "Stop getting lost in endless tutorials. Get a structured, AI-guided path to mastery."
  },
  {
    title: "Career switchers",
    desc: "Transition into tech smoothly with a personalized curriculum tailored to your background."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function WhoItsFor() {
  return (
    <section className="py-24 md:py-32 bg-[#020202] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16 md:mb-20 text-center text-[#EAEAEA] leading-[1.1]"
        >
          Who is Yantra for?
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {audiences.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 group active:scale-[0.98]"
            >
              <h3 className="text-xl font-semibold mb-3 text-[#EAEAEA] tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-[#777777] text-sm md:text-base leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
