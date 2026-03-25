import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { Bot, Map, Award, Briefcase } from 'lucide-react';
import React, { MouseEvent } from 'react';

const features = [
  {
    icon: <Bot className="w-5 h-5 text-[#EAEAEA]" />,
    title: "AI Tutor",
    description: "Learns with you, teaches you, quizzes you in real time."
  },
  {
    icon: <Map className="w-5 h-5 text-[#EAEAEA]" />,
    title: "Personalized Roadmaps",
    description: "AI analyzes your level and builds a custom path."
  },
  {
    icon: <Award className="w-5 h-5 text-[#EAEAEA]" />,
    title: "Certifications",
    description: "Earn proof of skills that matter in real jobs."
  },
  {
    icon: <Briefcase className="w-5 h-5 text-[#EAEAEA]" />,
    title: "Job Matching",
    description: "Connect directly with opportunities based on your skills."
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number, key?: React.Key }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="glass relative overflow-hidden rounded-[1.75rem] p-8 transition-colors duration-500 group hover:border-white/[0.12]"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        <div className="mb-4 font-mono text-[11px] font-semibold tracking-[0.24em] text-white/35">
          0{index + 1}
        </div>
        <div className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          {feature.icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-[#EAEAEA] tracking-tight">{feature.title}</h3>
        <p className="text-[#98A2B3] leading-relaxed text-sm md:text-base">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-[#020202]">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <div className="section-kicker mb-6">Platform stack</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-[#EAEAEA] leading-[1.1]">Everything you need to move from learning to placement</h2>
          <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed">A focused learning system that keeps assessment, guidance, proof of skill, and job momentum in one flow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
