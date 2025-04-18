'use client';

import { useState, useEffect } from 'react';

export default function Slideshow({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Debug logging
  console.log("Slideshow received images:", images);
  
  useEffect(() => {
    // Change image every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  // If no images, show nothing
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-white text-center bg-black/50 p-6 rounded">
          <p>No images available from Contentful</p>
          <p className="text-sm mt-2">Please check your Contentful space for media assets</p>
        </div>
      </div>
    );
  }
  
  // Debug the current image
  const currentImage = images[currentImageIndex];
  console.log("Current image:", currentImage);
  
  return (
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <div 
          key={image.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={`https:${image.url}`}
            alt={image.title || 'Slideshow image'}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
} 