import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 sm:px-8 md:px-12 lg:px-24 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.06] bg-[#050607]/82 py-4 backdrop-blur-xl'
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <a href="#" className="flex items-center gap-3 text-[#EAEAEA]">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
            AI
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.24em]">YANTRA</span>
        </a>
        <div className="hidden items-center gap-10 text-xs font-medium uppercase tracking-[0.18em] text-[#7B8592] md:flex">
          <a href="#features" className="hover:text-[#EAEAEA] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#EAEAEA] transition-colors">How it Works</a>
          <a href="#b2b" className="hover:text-[#EAEAEA] transition-colors">For Schools</a>
        </div>
        <div className="hidden md:block">
          <a
            href="#waitlist"
            className="glass inline-flex rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#EAEAEA] transition-transform duration-300 hover:scale-[1.02] active:scale-95"
          >
            Join Waitlist
          </a>
        </div>
        <button 
          className="md:hidden p-2 text-[#EAEAEA] active:scale-90 transition-transform"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col gap-8 bg-[#040506]/95 px-6 pt-24 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#7B8592]">
              <a href="#features" onClick={() => setIsOpen(false)} className="hover:text-[#EAEAEA] transition-colors">Features</a>
              <a href="#how-it-works" onClick={() => setIsOpen(false)} className="hover:text-[#EAEAEA] transition-colors">How it Works</a>
              <a href="#b2b" onClick={() => setIsOpen(false)} className="hover:text-[#EAEAEA] transition-colors">For Schools</a>
            </div>
            <a
              href="#waitlist"
              onClick={() => setIsOpen(false)}
              className="glass w-full rounded-full px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#EAEAEA] transition-transform duration-300 hover:scale-[1.02] active:scale-95"
            >
              Join Waitlist
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
