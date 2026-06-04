import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'Food' | 'Drinks' | 'Ambience';
  image: string;
}

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Artisanal Latte Art',
      category: 'Drinks',
      image: '/assets/images/coffee_latte_art.png'
    },
    {
      id: 2,
      title: 'Royal Potlam Biryani Pouch',
      category: 'Food',
      image: '/assets/images/potlam_biryani.png'
    },
    {
      id: 3,
      title: 'Dark Luxury Lounge Seating',
      category: 'Ambience',
      image: '/assets/images/cafe_interior.png'
    },
    {
      id: 4,
      title: 'Gold Leaf Truffle Pastry',
      category: 'Food',
      image: '/assets/images/chocolate_truffle.png'
    },
    {
      id: 5,
      title: 'Vintage Roasting Station',
      category: 'Ambience',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 6,
      title: 'Barista Pour-Over Station',
      category: 'Drinks',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  return (
    <section id="gallery" className="py-24 bg-matte-black text-cream relative overflow-hidden border-b border-gold/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-gold text-sm tracking-widest font-mono uppercase">Visual Journey</span>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-cream mt-2 tracking-wide">
            Our Brand Gallery
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-3 mb-12">
          {['All', 'Food', 'Drinks', 'Ambience'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold border transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-gold border-gold text-matte-black'
                  : 'bg-matte-gray/30 border-gold/10 text-cream hover:border-gold/30 hover:text-gold'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="relative overflow-hidden rounded-3xl h-80 group cursor-pointer border border-gold/5"
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-matte-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gold text-[10px] uppercase font-mono tracking-widest">{item.category}</span>
                      <h4 className="font-playfair text-lg font-bold text-cream mt-1">{item.title}</h4>
                    </div>
                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-matte-black shadow">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-matte-black/98 backdrop-blur-md flex items-center justify-center px-4"
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-matte-gray text-cream hover:text-gold border border-gold/10 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-6 p-3 rounded-full bg-matte-gray text-cream hover:text-gold border border-gold/10 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Zoomable Image Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-4xl max-h-[80vh] w-full flex flex-col items-center"
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[70vh] rounded-2xl object-contain border border-gold/20 shadow-2xl"
              />
              
              <div className="mt-4 text-center">
                <span className="text-gold text-xs uppercase font-mono tracking-widest">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h3 className="text-xl font-playfair font-bold text-cream mt-1">
                  {filteredItems[lightboxIndex].title}
                </h3>
              </div>
            </motion.div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-6 p-3 rounded-full bg-matte-gray text-cream hover:text-gold border border-gold/10 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
