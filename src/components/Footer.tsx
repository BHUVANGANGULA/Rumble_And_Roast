import React from 'react';
import { Coffee, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-matte-black/95 text-cream border-t border-gold/10 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Logo & Info column */}
          <div className="space-y-4">
            <a href="#home" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-coffee-dark to-gold flex items-center justify-center border border-gold/20">
                <Coffee className="w-4 h-4 text-cream" />
              </div>
              <span className="font-playfair text-lg font-bold tracking-widest text-cream">
                RUMBLE & ROAST
              </span>
            </a>
            <p className="text-cream-dark text-xs leading-relaxed font-inter">
              An immersive culinary destination serving champion-grade arabica coffee and firewood-prepared Potlam Biryanis wrapped in direct-flamed banana leaves.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-matte-gray border border-gold/10 flex items-center justify-center text-cream-dark hover:text-gold hover:border-gold transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-matte-gray border border-gold/10 flex items-center justify-center text-cream-dark hover:text-gold hover:border-gold transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-matte-gray border border-gold/10 flex items-center justify-center text-cream-dark hover:text-gold hover:border-gold transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="font-playfair text-base font-bold text-gold uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
              <li><a href="#home" className="text-cream-dark hover:text-gold transition-colors">Home</a></li>
              <li><a href="#about" className="text-cream-dark hover:text-gold transition-colors">About Story</a></li>
              <li><a href="#services" className="text-cream-dark hover:text-gold transition-colors">Services</a></li>
              <li><a href="#menu" className="text-cream-dark hover:text-gold transition-colors">Gourmet Menu</a></li>
              <li><a href="#gallery" className="text-cream-dark hover:text-gold transition-colors">Photo Gallery</a></li>
            </ul>
          </div>

          {/* Opening Hours Column */}
          <div className="space-y-4">
            <h4 className="font-playfair text-base font-bold text-gold uppercase tracking-wider">Hours of Operation</h4>
            <div className="space-y-2 text-xs font-mono tracking-wide text-cream-dark">
              <div className="flex justify-between border-b border-gold/5 pb-1">
                <span>MON - THU:</span>
                <span className="text-cream">07:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-1">
                <span>FRI - SAT:</span>
                <span className="text-cream">07:00 AM - 11:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-1">
                <span>SUNDAY:</span>
                <span className="text-cream">08:00 AM - 10:00 PM</span>
              </div>
              <div className="pt-2 text-[10px] text-gold uppercase font-bold">
                * Kitchen closes 45 mins before lock-up
              </div>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="font-playfair text-base font-bold text-gold uppercase tracking-wider">Lounge Location</h4>
            <ul className="space-y-3 text-xs text-cream-dark font-inter">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Adjacent to Royal Oak Rampally, opp. Reliance Trends, TPS Colony, Nagaram, Hyderabad, Secunderabad, Telangana 500083</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+91 6303071422</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>hello@rumbleroastcafe.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-cream-dark/60 font-mono uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Rumble & Roast Cafe. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
