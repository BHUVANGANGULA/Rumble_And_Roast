import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShoppingBag } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-matte-black text-cream px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gold/5"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen pt-24 pb-16">
        {/* Left Content Column */}
        <div className="lg:col-span-7 text-left space-y-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            {/* Minimalist Logo Emblem */}
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/40 shadow-lg">
              <img
                src="/assets/images/cafe_logo.png"
                alt="Rumble & Roast Cafe Logo"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <span className="text-gold uppercase tracking-widest text-xs font-mono font-bold">
              Est. 2022 • Premium Dining
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-cream tracking-tight leading-none"
          >
            Where Every Bite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-light via-gold to-cream-dark">
              Creates a Memory
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-cream-dark text-base sm:text-lg max-w-xl leading-relaxed font-inter"
          >
            Indulge in a sensory journey of champion-roasted specialty coffee and authentic fire-wood Potlam Biryani wrapped in seasoned banana leaves. Discover our dark luxury dining room.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            {/* Order Online CTA */}
            <a
              href="https://www.zomato.com/hyderabad/rumble-roast-cafe-nagaram-secunderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-matte-gray border border-gold/30 hover:border-gold text-cream hover:bg-matte-light/50 px-8 py-4 rounded-full shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Order Online</span>
            </a>

            {/* Explore Menu Link */}
            <a
              href="#menu"
              className="flex items-center justify-center space-x-1 text-cream-dark hover:text-gold uppercase tracking-wider text-xs font-semibold font-inter py-4 px-2 group"
            >
              <span>Explore Menu</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Right Empty Column Spacer for 3D Showcase */}
        <div className="lg:col-span-5 h-72 lg:h-[450px] w-full flex items-center justify-center z-0">
          {/* Subtle responsive label for interaction hint on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 2 }}
            className="hidden lg:block text-xs text-gold/30 uppercase tracking-widest font-mono text-center absolute right-32"
          >
            ← Interactive 3D Canvas →
          </motion.div>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-widest text-cream-dark/60 font-mono mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-2.5 bg-gold rounded-full"
          ></motion.div>
        </div>
      </div>
    </section>
  );
};
