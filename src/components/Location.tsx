import React from 'react';

const destination = '41 Beans Boulevard, Gourmet City, GC 90210';
const googlePlaceUrl = 'https://www.google.com/maps/place/Rumble+%26+Roast+Cafe/@17.4807233,78.6152339,831m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bcb9d00115eb9c3:0xcbc0365295ad378b!8m2!3d17.4807233!4d78.6178088!16s%2Fg%2F11ltwzg251?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D';
const googleDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Rumble+%26+Roast+Cafe&travelmode=driving';
const googleMapEmbedUrl = 'https://www.google.com/maps?q=17.4807233,78.6178088&z=17&output=embed';

export const Location: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-matte-black text-cream relative overflow-hidden border-b border-gold/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-gold text-sm tracking-widest font-mono uppercase">Find Our Cafe</span>
            <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-cream tracking-wide">
              Visit Rumble & Roast Cafe
            </h2>
            <p className="text-cream-dark text-base leading-relaxed max-w-xl">
              Discover our immersive gourmet destination in the heart of Gourmet City. Use the map to see our exact location and get step-by-step directions straight to the cafe.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <div className="rounded-3xl border border-gold/20 bg-matte-gray/20 p-5">
                <h3 className="text-sm uppercase tracking-widest text-gold font-semibold mb-2">Address</h3>
                <p className="text-cream-dark text-sm leading-relaxed">{destination}</p>
              </div>
              <a
                href={googleDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-coffee-light to-gold hover:from-gold hover:to-coffee-light text-matte-black font-semibold px-6 py-4 rounded-full text-sm uppercase tracking-widest shadow-lg transition-all duration-300"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-gold/10 shadow-2xl shadow-gold/10">
            <iframe
              title="Rumble & Roast Cafe Location"
              src={googleMapEmbedUrl}
              className="w-full h-96 border-0"
              allowFullScreen
              loading="lazy"
            />
            <a
              href={googlePlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
              aria-label="Open Rumble & Roast Cafe on Google Maps"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
