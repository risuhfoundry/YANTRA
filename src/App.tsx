import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import WhoItsFor from './components/WhoItsFor';
import B2BSection from './components/B2BSection';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import InteractiveBackground from './components/InteractiveBackground';
import CustomCursor from './components/CustomCursor';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen text-white selection:bg-white/20 relative bg-[#020202] font-sans">
      <InteractiveBackground />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <WhoItsFor />
      <B2BSection />
      <Waitlist />
      <Footer />
    </main>
  );
}
