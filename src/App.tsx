import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import WhoItsFor from './components/WhoItsFor';
import B2BSection from './components/B2BSection';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import InteractiveBackground from './components/InteractiveBackground';

export default function App() {
  return (
    <main className="min-h-screen text-white selection:bg-white/20 relative bg-[#020202] font-sans">
      <InteractiveBackground />
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <WhoItsFor />
      <B2BSection />
      <Waitlist />
      <Footer />
    </main>
  );
}
