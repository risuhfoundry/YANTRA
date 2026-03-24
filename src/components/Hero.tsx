import { ArrowRight, PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 lg:pt-40 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center z-10 max-w-[900px]">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70">Yantra 1.0 • Live</span>
        </div>

        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6 text-[#EAEAEA]"
        >
          The Future of Skill <br className="hidden md:block" />
          Learning is <span className="text-white/50">AI-Powered.</span>
        </h1>

        <p 
          className="text-base sm:text-lg md:text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-light"
        >
          A native cognitive platform that <strong className="text-white font-medium">analyzes</strong> your skills, <strong className="text-white font-medium">personalizes</strong> your path, and <strong className="text-white font-medium">connects</strong> you to real jobs.
        </p>

        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
            Start for Free <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-sm text-[#9CA3AF] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
            <PlayCircle className="w-4 h-4" /> Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
