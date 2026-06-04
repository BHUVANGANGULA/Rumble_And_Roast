export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const updateSEO = (meta: SEOMetadata) => {
  // Update Title
  document.title = meta.title;

  // Update Meta Description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute('content', meta.description);

  // Update Meta Keywords
  if (meta.keywords) {
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', meta.keywords);
  }

  // Update OpenGraph Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', meta.title);

  // Update OpenGraph Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', meta.description);

  // Update OpenGraph Image
  if (meta.image) {
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', meta.image);
  }

  // Inject Structured Data (JSON-LD)
  let scriptSchema = document.getElementById('restaurant-structured-data');
  if (!scriptSchema) {
    scriptSchema = document.createElement('script');
    scriptSchema.setAttribute('id', 'restaurant-structured-data');
    scriptSchema.setAttribute('type', 'application/ld+json');
    document.head.appendChild(scriptSchema);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Rumble & Roast Cafe",
    "image": meta.image || "/assets/images/coffee_latte_art.png",
    "url": meta.url || window.location.origin,
    "telephone": "+1-555-786-2537",
    "priceRange": "₹₹",
    "menu": `${meta.url || window.location.origin}/#menu`,
    "servesCuisine": ["Coffee", "Desserts", "Signature Biryani", "Continental"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "41 Beans & Biryani Boulevard",
      "addressLocality": "Gourmet City",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0736,
      "longitude": -118.4004
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "07:00",
        "closes": "23:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/rumbleroastcafe",
      "https://www.instagram.com/rumbleroastcafe"
    ]
  };

  scriptSchema.textContent = JSON.stringify(structuredData, null, 2);
};
