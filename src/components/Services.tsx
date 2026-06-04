import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Coffee, ShieldCheck, MapPin, Truck, CalendarCheck2 } from 'lucide-react';

interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent: string;
}

const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for x/y mouse positions relative to card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out movement using springs
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized coordinate (-0.5 to 0.5)
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative flex flex-col justify-between p-8 rounded-3xl glassmorphism h-96 cursor-pointer group transition-all duration-300 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5"
    >
      {/* 3D Depth Elements */}
      <div 
        style={{ transform: 'translateZ(50px)' }}
        className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-coffee-dark to-gold/25 flex items-center justify-center border border-gold/20 mb-6 group-hover:border-gold/50 transition-colors"
      >
        <span className="text-gold group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </span>
      </div>

      <div style={{ transform: 'translateZ(30px)' }} className="space-y-3">
        <h3 className="text-xl font-playfair font-semibold text-cream group-hover:text-gold transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-cream-dark text-sm leading-relaxed font-inter">
          {service.desc}
        </p>
      </div>

      {/* Decorative Accent Glow */}
      <div 
        style={{ transform: 'translateZ(10px)' }} 
        className="mt-6 flex items-center justify-between text-xs font-mono text-gold group-hover:translate-x-1 transition-transform"
      >
        <span>EXPERIENCE</span>
        <span className="text-[16px]">→</span>
      </div>
      
      {/* Background shadow/highlight on card hover */}
      <div className="absolute inset-0 rounded-3xl bg-radial-gold opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"></div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      title: 'Luxury Dine-In',
      desc: 'Immerse yourself in our premium, low-lit dark leather interior booths. Complete table service, custom background acoustics, and interactive booking.',
      icon: <Coffee className="w-6 h-6" />,
      accent: 'gold'
    },
    {
      title: 'Drive-Through',
      desc: 'Fast, premium, and zero-touch drive-through lanes with smart license-plate ordering queues for your favorite specialty coffees and potlam meals.',
      icon: <MapPin className="w-6 h-6" />,
      accent: 'coffee'
    },
    {
      title: 'Online Ordering',
      desc: 'Browse our complete signature menu, customize espresso brewing profiles, choose spice levels, and track preparation real-time on our website.',
      icon: <CalendarCheck2 className="w-6 h-6" />,
      accent: 'gold'
    },
    {
      title: 'No-Contact Delivery',
      desc: 'Thermal-sealed delivery packaging keeps foods hot and espresso drinks preserved in high-end containers, delivered directly to your doorstep.',
      icon: <Truck className="w-6 h-6" />,
      accent: 'coffee'
    },
    {
      title: 'Smart Reservations',
      desc: 'Pre-book specific lounge tables, pre-order meals, and specify customizable seating requirements online through our advanced grid map.',
      icon: <ShieldCheck className="w-6 h-6" />,
      accent: 'gold'
    }
  ];

  return (
    <section id="services" className="py-24 bg-matte-black text-cream relative overflow-hidden border-b border-gold/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-coffee-medium/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-widest font-mono uppercase">Premium Offerings</span>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-cream mt-2 tracking-wide">
            Our Elite Services
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
          {/* Centering remaining cards in large viewports */}
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-[760px] mx-auto w-full">
            {services.slice(3).map((service, idx) => (
              <ServiceCard key={idx} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
