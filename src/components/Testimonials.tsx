import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sofia Martinez',
      role: 'Gourmet Critic & Food Blogger',
      content: 'The Potlam Biryani is an absolute revelation. Unwrapping the charred leaf releases an explosion of spices that you simply cannot get from standard cooking methods. The coffee is equally world-class!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120'
    },
    {
      id: 2,
      name: 'Dr. Evelyn Carter',
      role: 'Specialty Coffee Connoisseur',
      content: 'Their vanilla latte uses premium organic beans roasted to perfection. There is zero bitterness, just smooth, rich undertones of cocoa and vanilla. The dark interior aesthetics create a perfect luxury work spot.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120'
    },
    {
      id: 3,
      name: 'Marcus Vance',
      role: 'Michelin Star Chef / Consultant',
      content: 'Rumble & Roast achieves what few cafes can: aligning true culinary heritage with modern technical sophistication. The interactive booking and 3D environment layout matches their luxury plating standards.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120'
    }
  ];

  // Auto scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-matte-black text-cream relative overflow-hidden border-b border-gold/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-coffee-dark/25 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Quote Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
            <Quote className="w-6 h-6 fill-current" />
          </div>
        </div>

        {/* Carousel Content */}
        <div className="h-[280px] sm:h-[220px] relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-6"
            >
              {/* Star Rating */}
              <div className="flex justify-center space-x-1 text-gold">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-cream text-lg sm:text-xl font-playfair italic leading-relaxed px-4">
                "{testimonials[activeIndex].content}"
              </p>

              {/* Profile Details */}
              <div className="flex items-center justify-center space-x-3">
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-12 h-12 rounded-full border border-gold/30 object-cover shadow"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-cream text-sm font-inter tracking-wider">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-gold text-xs uppercase tracking-wider">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center space-x-6 mt-8">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-matte-gray border border-gold/10 hover:border-gold hover:text-gold text-cream transition-colors duration-300 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Indicators */}
          <div className="flex space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'bg-gold w-6' : 'bg-matte-light hover:bg-gold/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-matte-gray border border-gold/10 hover:border-gold hover:text-gold text-cream transition-colors duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
