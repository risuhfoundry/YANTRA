import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 md:px-12 lg:px-24 py-5 md:py-6 border-b border-white/[0.05] bg-[#020202]/80 backdrop-blur-xl"
      >
        <div className="text-sm font-semibold tracking-[0.2em] uppercase text-[#EAEAEA]">YANTRA</div>
        <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-wide uppercase text-[#555555]">
          <a href="#features" className="hover:text-[#EAEAEA] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#EAEAEA] transition-colors">How it Works</a>
          <a href="#b2b" className="hover:text-[#EAEAEA] transition-colors">For Schools</a>
        </div>
        <div className="hidden md:block">
          <button className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase bg-white text-black rounded-full hover:scale-[1.02] active:scale-95 transition-transform duration-300">
            Join Waitlist
          </button>
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
            className="fixed inset-0 z-40 bg-[#020202]/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6 text-sm font-semibold tracking-wide uppercase text-[#555555]">
              <a href="#features" onClick={() => setIsOpen(false)} className="hover:text-[#EAEAEA] transition-colors">Features</a>
              <a href="#how-it-works" onClick={() => setIsOpen(false)} className="hover:text-[#EAEAEA] transition-colors">How it Works</a>
              <a href="#b2b" onClick={() => setIsOpen(false)} className="hover:text-[#EAEAEA] transition-colors">For Schools</a>
            </div>
            <button className="w-full px-5 py-4 text-sm font-semibold tracking-wide uppercase bg-white text-black rounded-full hover:scale-[1.02] active:scale-95 transition-transform duration-300">
              Join Waitlist
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
