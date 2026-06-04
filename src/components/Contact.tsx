import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const whatsappNumber = '+91 63030 71422';
const whatsappUrl = 'https://wa.me/916303071422?text=Hello!%20I%20am%20writing%20from%20the%20website%20contact%20page.';
const vcardUrl = '/assets/rumble_roast_contact.vcf';

export const Contact: React.FC = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (_data: ContactFormValues) => {
    // Simulate API call success
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-matte-black text-cream relative overflow-hidden border-b border-gold/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-widest font-mono uppercase">Connect With Us</span>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-cream mt-2 tracking-wide">
            Location & Contact
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Details & Styled Dark Map (Col-span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Quick CTAs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-playfair font-semibold text-gold">Get In Touch</h3>
              <p className="text-cream-dark text-sm leading-relaxed font-inter">
                Whether you have a question about our menu, private catering packages, or table bookings, our hospitality team is here to assist.
              </p>

              <div className="space-y-4 font-mono text-xs uppercase tracking-wider">
                {/* Phone CTA */}
                <a
                  href="tel:+15557862537"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-matte-gray/30 border border-gold/10 hover:border-gold transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 text-gold" />
                  <div>
                    <div className="text-gold font-bold">Call Us Direct</div>
                    <div className="text-cream text-[10px] mt-0.5">+1 (555) 786-2537</div>
                  </div>
                </a>

                {/* WhatsApp Chat CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-matte-gray/30 border border-gold/10 hover:border-gold transition-colors duration-300"
                >
                  <MessageSquare className="w-5 h-5 text-gold" />
                  <div>
                    <div className="text-gold font-bold">WhatsApp Hotline</div>
                    <div className="text-cream text-[10px] mt-0.5">{whatsappNumber}</div>
                  </div>
                </a>

                <a
                  href={vcardUrl}
                  download
                  className="flex items-center justify-center w-full text-center px-4 py-3 rounded-2xl bg-gold text-matte-black font-semibold uppercase tracking-widest text-[10px] hover:bg-amber-300 transition-colors duration-300"
                >
                  Save Contact
                </a>

                {/* Email Address */}
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-matte-gray/30 border border-gold/10">
                  <Mail className="w-5 h-5 text-gold" />
                  <div>
                    <div className="text-gold font-bold">Email Support</div>
                    <div className="text-cream text-[10px] mt-0.5">hello@rumbleroastcafe.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Vector Dark Map Container */}
            <div className="rounded-3xl border border-gold/15 overflow-hidden bg-matte-black h-56 relative group shadow-2xl">
              {/* Custom SVG stylized layout representing map */}
              <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                {/* Dark Matte Background grid pattern */}
                <rect width="100%" height="100%" fill="#161616" />
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#252525" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Stylized Roads / Lines */}
                <line x1="0" y1="60" x2="400" y2="60" stroke="#2E2E2E" strokeWidth="6" />
                <line x1="120" y1="0" x2="120" y2="200" stroke="#2E2E2E" strokeWidth="6" />
                <line x1="280" y1="0" x2="280" y2="200" stroke="#2E2E2E" strokeWidth="4" />
                
                {/* Secondary pathways */}
                <path d="M 0,140 Q 150,110 400,160" fill="none" stroke="#222" strokeWidth="3" />

                {/* Labels */}
                <text x="135" y="45" fill="#8C593B" fontSize="8" fontFamily="monospace" letterSpacing="1">BEANS BLVD</text>
                <text x="290" y="110" fill="#444" fontSize="6" fontFamily="monospace">ROAST RD</text>
                <text x="10" y="170" fill="#444" fontSize="6" fontFamily="monospace">GOURMET AVE</text>

                {/* Central Landmark Park */}
                <rect x="140" y="80" width="120" height="50" rx="6" fill="#1C2E15" opacity="0.3" stroke="#2F4C23" strokeWidth="1" />
                <text x="165" y="108" fill="#4C6E2F" fontSize="7" fontFamily="sans-serif">Central Green</text>

                {/* Cafe Pin Point Glow */}
                <circle cx="120" cy="120" r="14" fill="#D4AF37" opacity="0.15" className="animate-pulse" />
                <circle cx="120" cy="120" r="6" fill="#D4AF37" />
                <circle cx="120" cy="120" r="2" fill="#121212" />

                {/* Cafe Marker Label */}
                <rect x="62" y="76" width="116" height="18" rx="4" fill="#1E1E1E" stroke="#D4AF37" strokeWidth="1" />
                <text x="68" y="88" fill="#F9F6F0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Rumble & Roast Cafe</text>
              </svg>
              
              {/* Map UI Controls simulation */}
              <div className="absolute bottom-3 left-3 bg-matte-gray/90 border border-gold/10 px-3 py-1 rounded text-[9px] font-mono text-gold tracking-widest shadow">
                41 BEANS BOULEVARD, GOURMET CITY
              </div>
            </div>

          </div>

          {/* Contact Form (Col-span 7) */}
          <div className="lg:col-span-7 bg-matte-gray/30 p-8 rounded-3xl border border-gold/5 backdrop-blur-md relative">
            <h3 className="text-2xl font-playfair font-semibold text-gold mb-6">Send A Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-dark/80 mb-2 font-mono">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    {...register('name')}
                    className="w-full px-4 py-3 bg-matte-black/60 border border-gold/10 rounded-xl focus:border-gold outline-none text-sm transition-colors text-cream"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-dark/80 mb-2 font-mono">Your Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    {...register('email')}
                    className="w-full px-4 py-3 bg-matte-black/60 border border-gold/10 rounded-xl focus:border-gold outline-none text-sm transition-colors text-cream"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-cream-dark/80 mb-2 font-mono">Subject</label>
                <input
                  type="text"
                  placeholder="What is this regarding?"
                  {...register('subject')}
                  className="w-full px-4 py-3 bg-matte-black/60 border border-gold/10 rounded-xl focus:border-gold outline-none text-sm transition-colors text-cream"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-cream-dark/80 mb-2 font-mono">Message Details</label>
                <textarea
                  rows={5}
                  placeholder="How can we assist you?"
                  {...register('message')}
                  className="w-full px-4 py-3 bg-matte-black/60 border border-gold/10 rounded-xl focus:border-gold outline-none text-sm transition-colors text-cream resize-none"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-coffee-light to-gold text-matte-black font-semibold rounded-xl hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-xs shadow-lg cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>

            {/* Success notification banner */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-0 bg-matte-gray/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-8 text-center space-y-4 border border-gold/25"
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                  <h3 className="text-2xl font-playfair font-bold text-cream">Message Sent!</h3>
                  <p className="text-sm text-cream-dark max-w-sm">
                    Thank you. Your inquiry has been dispatched to the front desk. We will response to your email within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
