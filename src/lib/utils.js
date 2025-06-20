// Utility functions for the website

/**
 * Formats the price display for artwork based on the price value
 * @param {number|string|undefined} price - The price value from Contentful
 * @returns {string} - The formatted price display text
 */
export function formatPrice(price) {
  if (price === 1) return "Verkocht";
  if (price === 2) return "In opdracht";
  if (price === 0) return "Niet te koop";
  if (price === undefined || price === null) return "Op aanvraag";
  
  // If it's a number, format with euro symbol
  if (typeof price === 'number') {
    return `€${price}`;
  }
  
  // Return as is for any other value (string, etc.)
  return price;
} 