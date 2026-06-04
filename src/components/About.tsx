import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Star, ShieldCheck, Heart, Award } from 'lucide-react';

// Counter Component
const Counter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 30, damping: 15 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString();
      }
    });
  }, [springValue]);

  return (
    <span className="font-playfair text-4xl sm:text-5xl font-bold text-gold">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
};

export const About: React.FC = () => {
  const timelineEvents = [
    {
      year: '2022',
      title: 'The Spark',
      desc: 'Rumble & Roast was born from a desire to merge industrial, high-energy vibes (Rumble) with the comforting luxury of artisanal roasting (Roast).',
      icon: <Award className="w-5 h-5" />
    },
    {
      year: '2023',
      title: 'Crafting the Potlam',
      desc: 'Introduced our signature leaf-wrapped Potlam Biryani, combining traditional culinary arts with modern plating techniques.',
      icon: <Heart className="w-5 h-5" />
    },
    {
      year: '2024',
      title: 'Going 3D',
      desc: 'Launched our digital immersive experiences and expanded to smart contact-less table reservations and mobile drive-throughs.',
      icon: <ShieldCheck className="w-5 h-5" />
    }
  ];

  return (
    <section id="about" className="py-24 bg-matte-black text-cream relative overflow-hidden border-b border-gold/5">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-coffee-dark/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-widest font-mono uppercase">Our Legacy</span>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-cream mt-2 tracking-wide">
            Where Craft Meets Comfort
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Narrative & Counters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Narrative text */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-playfair font-semibold text-gold">
              A Symphony of Bold Aromas and Culinary Masterpieces
            </h3>
            <p className="text-cream-dark text-base leading-relaxed font-inter">
              At Rumble & Roast, we believe that coffee and food are more than just fuel—they are experiences that forge memories. From the selection of premium single-origin Arabica beans to our intricate culinary methods, every detail is engineered for perfection.
            </p>
            <p className="text-cream-dark text-base leading-relaxed font-inter">
              Our centerpiece culinary creation, the **Potlam Biryani**, is cooked using authentic fire-wood techniques, wrapped tightly inside direct-flamed banana leaves to lock in moist juices and earthy aromas. It represents our core ethos: honoring centuries-old heritage while delivering it in a luxury, modern wrapper.
            </p>
          </div>

          {/* Counters Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6">
            {/* Counter 1 */}
            <div className="p-6 bg-matte-gray/50 rounded-2xl border border-gold/10 text-center backdrop-blur-md">
              <Counter value={41} suffix="+" />
              <div className="flex items-center justify-center text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs uppercase tracking-widest font-inter text-cream-dark mt-2">Expert Reviews</p>
            </div>

            {/* Counter 2 */}
            <div className="p-6 bg-matte-gray/50 rounded-2xl border border-gold/10 text-center backdrop-blur-md">
              <Counter value={4} suffix=".7" />
              <div className="text-gold font-mono text-sm mt-1">★ Google Rating</div>
              <p className="text-xs uppercase tracking-widest font-inter text-cream-dark mt-2">Overall Rating</p>
            </div>

            {/* Counter 3 */}
            <div className="p-6 bg-matte-gray/50 rounded-2xl border border-gold/10 text-center backdrop-blur-md">
              <Counter value={1000} suffix="+" />
              <div className="text-gold font-mono text-sm mt-1">Happy Guests</div>
              <p className="text-xs uppercase tracking-widest font-inter text-cream-dark mt-2">Monthly Customers</p>
            </div>

            {/* Counter 4 */}
            <div className="p-6 bg-matte-gray/50 rounded-2xl border border-gold/10 text-center backdrop-blur-md">
              <Counter value={5} suffix="+" />
              <div className="text-gold font-mono text-sm mt-1">Premium Services</div>
              <p className="text-xs uppercase tracking-widest font-inter text-cream-dark mt-2">Dining Options</p>
            </div>
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="relative border-l-2 border-gold/20 max-w-3xl mx-auto pl-8 sm:pl-10 py-4 space-y-12">
          {timelineEvents.map((event, idx) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative"
            >
              {/* Connector Dot */}
              <div className="absolute -left-[45px] sm:-left-[49px] top-1.5 w-8 h-8 rounded-full bg-matte-black border-2 border-gold flex items-center justify-center text-gold shadow-md">
                {event.icon}
              </div>

              {/* Year Label */}
              <span className="inline-block text-xs font-mono font-bold tracking-widest text-gold bg-gold/10 border border-gold/30 px-3 py-1 rounded-full uppercase mb-2">
                {event.year}
              </span>

              {/* Event Card */}
              <div className="bg-matte-gray/30 p-6 rounded-2xl border border-gold/5 backdrop-blur-sm hover:border-gold/25 transition-colors duration-300">
                <h4 className="text-xl font-playfair font-semibold text-cream mb-2">{event.title}</h4>
                <p className="text-cream-dark text-sm leading-relaxed font-inter">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
