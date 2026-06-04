import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onFinished: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onFinished, 600); // Allow fadeout animation to complete
          }, 800);
          return 100;
        }
        // Random increment to simulate natural assets loading
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-matte-black transition-opacity duration-700 ease-in-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 3D Cafe Ambient glow background */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none"></div>

      {/* Coffee Pouring/Dripping Animation Container */}
      <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
        {/* Coffee Cup Outline */}
        <div className="absolute w-20 h-16 border-4 border-gold rounded-b-3xl border-t-0 flex items-center justify-center">
          {/* Handle */}
          <div className="absolute -right-4 top-3 w-5 h-8 border-4 border-gold rounded-r-xl border-l-0"></div>
          {/* Coffee liquid filling up inside */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-coffee-medium rounded-b-2xl transition-all duration-300 ease-out"
            style={{ height: `${Math.min(progress, 90)}%` }}
          >
            {/* Liquid Surface Ripple */}
            {progress > 0 && progress < 100 && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-coffee-light animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Coffee Drip Stream from Above */}
        {progress < 100 && (
          <div className="absolute top-[-40px] left-[46%] w-1.5 h-14 bg-coffee-light rounded-full animate-bounce"></div>
        )}
      </div>

      {/* Brand Text */}
      <h1 className="text-3xl font-playfair font-bold text-cream tracking-widest mb-2 animate-pulse">
        RUMBLE & ROAST
      </h1>
      <p className="text-gold text-xs uppercase tracking-widest font-inter mb-8">
        Crafting Luxury Memories
      </p>

      {/* Loading Bar */}
      <div className="w-64 h-1 bg-matte-light rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-coffee-light via-gold to-coffee-medium transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Progress Text */}
      <div className="mt-4 text-cream-dark text-sm font-mono tracking-wider">
        {progress > 100 ? 100 : progress}%
      </div>

      {/* Ambient floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gold rounded-full opacity-20 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 6 + 4}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
