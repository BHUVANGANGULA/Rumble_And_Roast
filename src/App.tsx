import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Menu } from './components/Menu';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { updateSEO } from './utils/seo';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Inject SEO metadata on mount
  useEffect(() => {
    updateSEO({
      title: "Rumble & Roast Cafe | Immersive 3D Fine Dining & Special Coffee",
      description: "Experience luxury dining at Rumble & Roast Cafe. Discover our artisan roasted single-origin espresso and award-winning firewood Potlam Biryani wrapped in banana leaves.",
      keywords: "rumble roast cafe, potlam biryani, 3d coffee shop, luxury dining lounge, specialty espresso",
      image: "/assets/images/coffee_latte_art.png",
      url: window.location.origin
    });
  }, []);

  // Track scroll position to update active section for R3F camera animation
  useEffect(() => {
    if (isLoading) return;

    const sections = ['home', 'about', 'services', 'menu', 'gallery'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies center area
      threshold: 0.05
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onFinished={() => setIsLoading(false)} />
      ) : (
        <div className="relative text-cream font-inter select-none">
          {/* Main 3D Canvas Background Layer */}
          <ThreeCanvas activeSection={activeSection} />

          {/* Sticky Nav Bar */}
          <Navbar />

          {/* Content Layout Sections */}
          <main className="relative z-10 w-full overflow-hidden">
            <Hero />
            <About />
            <Services />
            <Menu />
            <Testimonials />
            <Gallery />
            <Location />
            <Footer />
          </main>

          {/* Floaters */}
          <FloatingWhatsApp />
        </div>
      )}
    </>
  );
}
