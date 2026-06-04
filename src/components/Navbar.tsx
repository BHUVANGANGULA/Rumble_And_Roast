import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Coffee, Sun, Moon } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('theme', 'dark');

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      if (window.scrollY > 20) {
        isScrolled || setIsScrolled(true);
      } else {
        !isScrolled || setIsScrolled(false);
      }

      // Scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Apply theme class to HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#121212';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#F9F6F0';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-matte-black/90 dark:bg-matte-black/95 light:bg-cream/90 backdrop-blur-md shadow-2xl py-3 border-b border-gold/10'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-coffee-light via-gold to-coffee-medium transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-coffee-dark to-gold flex items-center justify-center border border-gold/30 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Coffee className="w-5 h-5 text-cream" />
            </div>
            <span className="font-playfair text-xl font-bold tracking-widest text-cream group-hover:text-gold transition-colors duration-300">
              RUMBLE & ROAST
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wider text-cream-dark hover:text-gold transition-colors duration-300 uppercase font-inter relative py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gold/20 hover:border-gold hover:text-gold text-cream transition-colors duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

          </div>

          {/* Mobile Menu & Theme Toggles */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Theme toggle mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gold/20 text-cream"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-cream hover:text-gold hover:bg-matte-light/50 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div
        className={`md:hidden absolute left-0 right-0 top-[70px] bg-matte-black/95 backdrop-blur-lg border-b border-gold/10 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 space-y-4 flex flex-col items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-cream hover:text-gold transition-colors duration-300 uppercase tracking-widest py-2"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
